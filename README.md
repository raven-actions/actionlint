# ✅ actionlint Action

[![GitHub - marketplace](https://img.shields.io/badge/marketplace-actionlint-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/actionlint)
[![GitHub - release](https://img.shields.io/github/v/release/raven-actions/actionlint?style=flat-square)](https://github.com/raven-actions/actionlint/releases/latest)
[![GitHub - ci](https://img.shields.io/github/actions/workflow/status/raven-actions/actionlint/ci.yml?logo=github&label=CI&style=flat-square&branch=main&event=push)](https://github.com/raven-actions/actionlint/actions/workflows/ci.yml?query=branch%3Amain+event%3Apush)
[![GitHub - license](https://img.shields.io/github/license/raven-actions/actionlint?style=flat-square)](https://github.com/raven-actions/actionlint/blob/main/LICENSE)

This [GitHub Action](https://github.com/features/actions) allows you to quickly and easily run [actionlint](https://github.com/rhysd/actionlint) in your GitHub workflow using native Runner OS without 3rd party dependencies. It is based on an official action lint usage proposal from [Use actionlint on GitHub Actions](https://github.com/rhysd/actionlint/blob/main/docs/usage.md#use-actionlint-on-github-actions) together with [Problem Matchers](https://github.com/rhysd/actionlint/blob/main/docs/usage.md#problem-matchers).

- Action is platform-independent and tested on all the latest GitHub-hosted runners (`ubuntu-latest`, `macos-latest`, `windows-latest`).
- Uses [GitHub cache](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows) for caching `actionlint` binaries for faster and more efficient workflow run.
  - 3rd party `actionlint` dependencies like `shellcheck` or `pyflakes` are not cached, but action installs them if not present on the Runner.

![demo-error](https://raw.githubusercontent.com/raven-actions/actionlint/main/assets/images/demo-error.png)

![demo-ok](https://raw.githubusercontent.com/raven-actions/actionlint/main/assets/images/demo-ok.png)

## Table of Contents <!-- omit in toc -->

- [🤔 Usage](#-usage)
  - [Quick Start](#quick-start)
  - [Customization](#customization)
- [📥 Inputs](#-inputs)
- [📤 Outputs](#-outputs)
- [👥 Contributing](#-contributing)
- [📄 License](#-license)

## 🤔 Usage

### Quick Start

Just place in your GitHub workflow steps:

```yaml
- name: actionlint
  uses: raven-actions/actionlint@v1
```

### Customization

You can modify the default configuration with optional inputs. All optional inputs are listed in the [📥 Inputs](#-inputs) section.

Action returns some basic information. For more details, follow [📤 Outputs](#-outputs) section.

```yaml
- name: actionlint
  id: actionlint  #optional, id required only when outputs are used in the workflow steps later
  uses: raven-actions/actionlint@v1
  with:
    matcher: false  # optional
    cache: false  # optional
    fail-on-error: false  # optional
    files: "tests/*.yml, tests/*.yaml"  # optional, example on how to grab all .yml and .yaml files from the test directory
    flags: "-ignore SC2086"  # optional

- name: actionlint Summary
  if: ${{ steps.actionlint.outputs.exit-code != 0 }}  # example usage, do echo only when actionlint action failed
  run: |
    echo "Used actionlint version ${{ steps.actionlint.outputs.version-semver }}"
    echo "Used actionlint release ${{ steps.actionlint.outputs.version-tag }}"
    echo "actionlint ended with ${{ steps.actionlint.outputs.exit-code }} exit code"
    echo "actionlint ended because '${{ steps.actionlint.outputs.exit-message }}'"
    echo "actionlint found ${{ steps.actionlint.outputs.total-errors }} errors"
    echo "actionlint checked ${{ steps.actionlint.outputs.total-files }} files"
    echo "actionlint cache used: ${{ steps.actionlint.outputs.cache-hit }}"
    exit ${{ steps.actionlint.outputs.exit-code }}
```

## 📥 Inputs

| Name            | Required | Type     | Default value | Description                                                                                                                                                 |
|-----------------|----------|----------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `version`       | false    | `string` | `latest`      | SemVer version of `actionlint`, recommended to keep default: latest                                                                                         |
| `matcher`       | false    | `bool`   | `true`        | Use matcher for GitHub annotations                                                                                                                          |
| `files`         | false    | `string` | *not set*     | To lint different workflow files (default searching directory is `.github/workflows`), use comma-separated glob patterns, e.g., `tests/*.yml, tests/*.yaml` |
| `flags`         | false    | `string` | *not set*     | Extra flags to use with `actionlint`                                                                                                                        |
| `fail-on-error` | false    | `bool`   | `true`        | Fail action on `actionlint` errors                                                                                                                          |
| `shellcheck`    | false    | `bool`   | `true`        | Use `shellcheck` with `actionlint` (and install if it does not exist)                                                                                       |
| `pyflakes`      | false    | `bool`   | `true`        | Use `pyflakes` with `actionlint` (and install if it does not exist)                                                                                         |
| `cache`         | false    | `bool`   | `true`        | Use GitHub cache for caching binaries for the next runs                                                                                                     |

## 📤 Outputs

| Name             | Type     | Description                                                                                                                    |
|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------|
| `version-semver` | `string` | SemVer version of `actionlint`, recommended to keep default: latest                                                            |
| `version-tag`    | `string` | Use matcher for GitHub annotations                                                                                             |
| `exit-code`      | `int`    | Exit status code based on [actionlint exit status](https://github.com/rhysd/actionlint/blob/main/docs/usage.md#exit-status)    |
| `exit-message`   | `string` | Exit status message based on [actionlint exit status](https://github.com/rhysd/actionlint/blob/main/docs/usage.md#exit-status) |
| `total-errors`   | `int`    | Total number of errors found during the linting                                                                                |
| `total-files`    | `int`    | Total number of checked files                                                                                                  |
| `cache-hit`      | `bool`   | GitHub cache has been used?                                                                                                    |

## 👥 Contributing

Contributions to the project are welcome! Please follow [Contributing Guide](https://github.com/raven-actions/actionlint/blob/main/.github/CONTRIBUTING.md).

## 📄 License

This project is distributed under the terms of the [MIT](https://github.com/raven-actions/actionlint/blob/main/LICENSE) license.
