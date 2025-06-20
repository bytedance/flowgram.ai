# Contributing to flowgram.ai

## Quick Start

### Prerequisites

- Node.js 18+ (LTS/Hydrogen recommended)
- pnpm 9.12.0
- Rush 5.14.0

### Installation

1. **Install Node.js 18+**

``` bash
nvm install lts/hydrogen
nvm alias default lts/hydrogen # set default node version
nvm use lts/hydrogen
```

2. **Clone the repository**

``` bash
git clone git@github.com:bytedance/flowgram.ai.git
```

3. **Install required global dependencies**

``` bash
npm i -g pnpm@9.12.0 @microsoft/rush@5.140.1
```

4. **Install project dependencies**

``` bash
rush install
```

5. **Build the project**

``` bash
rush build
```

6. **Run docs or demo**

``` bash
rush dev:docs # docs
rush dev:demo-fixed-layout
rush dev:demo-free-layout
```

After that, you can start to develop projects inside this repository.


## Submitting Changes

1. Create a new branch from `main` using the format:
    - `feat/description` for features
    - `fix/description` for bug fixes
    - `docs/description` for documentation
    - `chore/description` for maintenance

2. Write code and tests
    - Follow our coding standards
    - Add/update tests for changes
    - Update documentation if needed

3. Ensure quality
    - Run `cd path/to/packageName && npm test` for all tests
    - Run `rush lint` for code style
    - Run `rush build` to verify build

4. Create Pull Request
    - Use the PR template
    - Link related issues
    - Provide clear description of changes

5. Review Process
    - Maintainers will review your PR
    - Address review feedback if any
    - Changes must pass CI checks

6. Commit Message Format
   ```
   type(scope): subject
   body
   ```
   Types: feat, fix, docs, style, refactor, test, chore

## Reporting Bugs

Report bugs via [GitHub Issues](https://github.com/bytedance/flowgram.ai/issues/new/choose). Please include:

- Issue description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Code examples (if applicable)

## Documentation

- Update API documentation for interface changes
- Update README.md if usage is affected

## License

This project is under the [MIT License](http://choosealicense.com/licenses/mit/). By submitting code, you agree to these terms.
