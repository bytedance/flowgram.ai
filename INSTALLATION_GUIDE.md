## Installation Guide

This guide provides steps to set up the development environment for the FlowGram.AI project.

### Prerequisites

1.  **Node.js:** Install Node.js version 18 or higher. You can use a version manager like nvm:
    ```bash
    nvm install lts/hydrogen
    nvm alias default lts/hydrogen
    nvm use lts/hydrogen
    ```

2.  **Global Dependencies:** Install pnpm and Rush globally:
    ```bash
    npm i -g pnpm@9.12.0 @microsoft/rush@5.140.0
    ```

### Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone git@github.com:bytedance/flowgram.ai.git
    cd flowgram.ai
    ```

2.  **Install Project Dependencies:**
    Use Rush to install all dependencies specified in the monorepo:
    ```bash
    rush update
    ```

3.  **Build the Project:**
    Build all packages in the repository:
    ```bash
    rush build
    ```

### Running Examples or Documentation

After successful installation and build, you can run the demo applications or the documentation website:

*   **Run Documentation:**
    ```bash
    rush dev:docs
    ```
*   **Run Fixed Layout Demo:**
    ```bash
    rush dev:demo-fixed-layout
    ```
*   **Run Free Layout Demo:**
    ```bash
    rush dev:demo-free-layout
    ```

Refer to the main `README.md` for more details on available demos and other development commands.
