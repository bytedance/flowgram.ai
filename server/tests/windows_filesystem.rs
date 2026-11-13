#![cfg(windows)]

use flowgram_desktop_backend::project::rename_directory;
use std::{fs::OpenOptions, os::windows::fs::OpenOptionsExt, time::Duration};

#[tokio::test]
async fn directory_move_waits_for_a_transient_windows_file_handle() {
    let root = tempfile::tempdir().unwrap();
    let source = root.path().join("中文 source");
    let destination = root.path().join("中文 destination");
    std::fs::create_dir(&source).unwrap();
    std::fs::write(source.join("state.sqlite"), b"preserved").unwrap();
    // Permit readers/writers but temporarily prevent moving/deleting this file.
    let file = OpenOptions::new()
        .read(true)
        .share_mode(3)
        .open(source.join("state.sqlite"))
        .unwrap();
    let release = tokio::spawn(async move {
        tokio::time::sleep(Duration::from_millis(50)).await;
        drop(file);
    });
    rename_directory(&source, &destination).await.unwrap();
    release.await.unwrap();
    assert!(!source.exists());
    assert_eq!(
        std::fs::read(destination.join("state.sqlite")).unwrap(),
        b"preserved"
    );
}

#[tokio::test]
async fn directory_move_never_removes_the_source_when_a_handle_stays_locked() {
    let root = tempfile::tempdir().unwrap();
    let source = root.path().join("source");
    let destination = root.path().join("destination");
    std::fs::create_dir(&source).unwrap();
    std::fs::write(source.join("state.sqlite"), b"preserved").unwrap();
    let file = OpenOptions::new()
        .read(true)
        .share_mode(3)
        .open(source.join("state.sqlite"))
        .unwrap();
    assert!(rename_directory(&source, &destination).await.is_err());
    assert!(source.exists());
    assert!(!destination.exists());
    assert_eq!(
        std::fs::read(source.join("state.sqlite")).unwrap(),
        b"preserved"
    );
    drop(file);
}
