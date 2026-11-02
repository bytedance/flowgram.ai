#!/bin/sh
# Install the latest FlowGram Desktop preview on macOS.
# Source: https://github.com/bytedance/flowgram.ai/tree/main/apps/docs/src/public/desktop

main() {
  set -eu

  fail() { printf 'FlowGram: %s\n' "$*" >&2; exit 1; }
  [ "$(uname -s)" = Darwin ] || fail 'This installer requires macOS.'
  case "$(uname -m)" in
    arm64|aarch64) target=aarch64-apple-darwin ;;
    x86_64)
      if [ "$(sysctl -in sysctl.proc_translated 2>/dev/null || true)" = 1 ]; then
        target=aarch64-apple-darwin
      else
        target=x86_64-apple-darwin
      fi
      ;;
    *) fail 'Unsupported Mac architecture.' ;;
  esac

  for tool in curl shasum hdiutil ditto xattr pgrep; do
    command -v "$tool" >/dev/null 2>&1 || fail "Required command not found: $tool"
  done
  if pgrep -x flowgram-desktop >/dev/null 2>&1; then
    fail 'Quit FlowGram Desktop before installing or updating, then run this command again.'
  fi

  install_dir=${FLOWGRAM_INSTALL_DIR:-}
  if [ -z "$install_dir" ]; then
    if [ -w /Applications ]; then install_dir=/Applications
    else install_dir="$HOME/Applications"
    fi
  fi
  case "$install_dir" in /*) ;; *) fail 'FLOWGRAM_INSTALL_DIR must be an absolute path.' ;; esac
  mkdir -p "$install_dir"
  install_dir=$(cd "$install_dir" && pwd -P)
  destination="$install_dir/FlowGram.app"
  [ ! -L "$destination" ] || fail "Refusing to replace a symbolic link: $destination"
  if [ -e "$destination" ]; then
    existing_id=$(/usr/libexec/PlistBuddy -c 'Print :CFBundleIdentifier' "$destination/Contents/Info.plist" 2>/dev/null || true)
    [ "$existing_id" = ai.flowgram.desktop ] || fail "Another application already exists at $destination"
  fi

  work_dir=''
  stage_dir=''
  lock_dir="$install_dir/.flowgram-install.lock"
  mkdir "$lock_dir" 2>/dev/null || fail "Another installation is in progress. If it was interrupted, remove $lock_dir and retry."
  mounted=0
  cleanup() {
    if [ "$mounted" = 1 ]; then hdiutil detach "$work_dir/mount" -quiet >/dev/null 2>&1 || true; fi
    # Restore the previous app if replacing it did not complete.
    if [ -n "$stage_dir" ] && [ -d "$stage_dir/previous.app" ] && [ ! -e "$destination" ]; then
      mv "$stage_dir/previous.app" "$destination" || {
        printf 'FlowGram: Restore the previous app from %s\n' "$stage_dir/previous.app" >&2
        stage_dir=''
      }
    fi
    if [ -n "$stage_dir" ]; then rm -rf "$stage_dir"; fi
    if [ -n "$work_dir" ]; then rm -rf "$work_dir"; fi
    rmdir "$lock_dir" 2>/dev/null || true
  }
  trap cleanup EXIT
  trap 'exit 1' HUP INT TERM
  work_dir=$(mktemp -d "${TMPDIR:-/tmp}/flowgram-install.XXXXXX")
  stage_dir=$(mktemp -d "$install_dir/.flowgram-install.XXXXXX")
  base_url=https://github.com/bytedance/flowgram.ai/releases/download/desktop-preview
  installer="FlowGram_${target}.dmg"
  printf 'Downloading the latest FlowGram Desktop preview (%s)…\n' "$target"
  curl --fail --silent --show-error --location --proto '=https' --proto-redir '=https' --retry 3 \
    "$base_url/$installer" -o "$work_dir/$installer"
  curl --fail --silent --show-error --location --proto '=https' --proto-redir '=https' --retry 3 \
    "$base_url/SHA256SUMS.txt" -o "$work_dir/SHA256SUMS.txt"
  expected=$(awk -v name="$installer" '$2 == name { print $1; count++ } END { if (count != 1) exit 1 }' "$work_dir/SHA256SUMS.txt") \
    || fail 'The release does not contain a unique checksum for this installer. Please retry later.'
  [ "${#expected}" = 64 ] || fail 'Invalid release checksum.'
  actual=$(shasum -a 256 "$work_dir/$installer")
  actual=${actual%% *}
  [ "$actual" = "$expected" ] || fail 'Checksum verification failed. No application was replaced; please retry later.'

  mkdir "$work_dir/mount"
  hdiutil attach "$work_dir/$installer" -mountpoint "$work_dir/mount" -readonly -nobrowse -quiet
  mounted=1
  source_app="$work_dir/mount/FlowGram.app"
  bundle_id=$(/usr/libexec/PlistBuddy -c 'Print :CFBundleIdentifier' "$source_app/Contents/Info.plist")
  [ "$bundle_id" = ai.flowgram.desktop ] || fail 'The installer does not contain FlowGram Desktop.'
  ditto "$source_app" "$stage_dir/FlowGram.app"
  # Preview builds are unsigned. Remove quarantine only from this verified app.
  xattr -dr com.apple.quarantine "$stage_dir/FlowGram.app"
  hdiutil detach "$work_dir/mount" -quiet
  mounted=0

  # Recheck after the download in case the application was opened meanwhile.
  if pgrep -x flowgram-desktop >/dev/null 2>&1; then fail 'Quit FlowGram Desktop and run this command again.'; fi
  if [ -e "$destination" ]; then mv "$destination" "$stage_dir/previous.app"; fi
  mv "$stage_dir/FlowGram.app" "$destination"
  printf 'FlowGram Desktop installed at %s\n' "$destination"
  if [ "${FLOWGRAM_NO_LAUNCH:-0}" != 1 ]; then
    open "$destination" || printf 'Open FlowGram from %s to get started.\n' "$install_dir"
  fi
}

# Start only after the complete script has been received by the shell.
main "$@"
