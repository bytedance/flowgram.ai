use std::{
    io,
    process::{Child, Command, ExitStatus},
};

/// Own the backend for the lifetime of this desktop instance, including startup errors.
pub struct OwnedProcess {
    child: Child,
    #[cfg(windows)]
    _job: windows_job::Job,
}

impl OwnedProcess {
    pub fn spawn(command: &mut Command) -> io::Result<Self> {
        #[cfg(windows)]
        {
            use std::os::windows::process::CommandExt;
            use windows_sys::Win32::System::Threading::CREATE_NO_WINDOW;
            command.creation_flags(CREATE_NO_WINDOW);
        }
        let child = command.spawn()?;
        #[cfg(windows)]
        {
            // Keep ownership even if attaching the job fails.
            let mut child = child;
            match windows_job::Job::attach(&child) {
                Ok(job) => Ok(Self { child, _job: job }),
                Err(error) => {
                    let _ = child.kill();
                    let _ = child.wait();
                    Err(error)
                }
            }
        }
        #[cfg(not(windows))]
        Ok(Self { child })
    }

    pub fn try_wait(&mut self) -> io::Result<Option<ExitStatus>> {
        self.child.try_wait()
    }
}

impl Drop for OwnedProcess {
    fn drop(&mut self) {
        let _ = self.child.kill();
        let _ = self.child.wait();
    }
}

#[cfg(windows)]
mod windows_job {
    use std::{
        io,
        mem::{size_of, zeroed},
        os::windows::io::{AsRawHandle, FromRawHandle, OwnedHandle},
        process::Child,
        ptr::null,
    };
    use windows_sys::Win32::System::JobObjects::{
        AssignProcessToJobObject, CreateJobObjectW, JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE,
        JOBOBJECT_EXTENDED_LIMIT_INFORMATION, JobObjectExtendedLimitInformation,
        SetInformationJobObject,
    };

    pub struct Job {
        _handle: OwnedHandle,
    }

    impl Job {
        pub fn attach(child: &Child) -> io::Result<Self> {
            // The handle is unnamed and non-inheritable. Windows closes it on an app crash too.
            let raw = unsafe { CreateJobObjectW(null(), null()) };
            if raw.is_null() {
                return Err(io::Error::last_os_error());
            }
            let handle = unsafe { OwnedHandle::from_raw_handle(raw) };
            let mut limits: JOBOBJECT_EXTENDED_LIMIT_INFORMATION = unsafe { zeroed() };
            limits.BasicLimitInformation.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE;
            if unsafe {
                SetInformationJobObject(
                    raw,
                    JobObjectExtendedLimitInformation,
                    (&limits as *const JOBOBJECT_EXTENDED_LIMIT_INFORMATION).cast(),
                    size_of::<JOBOBJECT_EXTENDED_LIMIT_INFORMATION>() as u32,
                )
            } == 0
            {
                return Err(io::Error::last_os_error());
            }
            if unsafe { AssignProcessToJobObject(raw, child.as_raw_handle()) } == 0 {
                return Err(io::Error::last_os_error());
            }
            Ok(Self { _handle: handle })
        }
    }
}
