<div align="center">
<h1>RevLearn: Frontend</h1>
Team 1's Frontend Repo for Project 2: Rev Learn, a capstone project for <a href="(https://revature.com/">Revature</a>'s Full-Stack Java/React SWE Training Program.
</div>

---
<details>
<summary><strong>Table of Contents</strong></summary>
  <ul>
    <li><a href="#project-description">Project Description</a></li>
    <li>
      <a href="#development-build">Development Build</a>
    <ul>
      <li><a href="#cloning-the-repository">Cloning the Repository</a></li>
      <li><a href="#nodejs--node-package-manager-installation">Node.js & Node Package Manager Installation</a></li>
      <li><a href="#environment-variables">Environment Variables</a></li>
      <li><a href="#installing-project-dependencies">Installing Project Dependencies</a></li>
      <li><a href="#running-the-project-in-development-mode">Running the Project in Development Mode</a></li>
    </ul>
  </ul>
</details>


---

# Project Description

The RevLearn project aims to provide a platform for students and educators to engage in learning and teaching. The platform's core functional scope includes features such as student and educator accounts, courses and programs, discussion forums, progress tracking, and a payment gateway. The project also includes institutional accounts, which allow institutions to create and manage courses and programs, monitor student progress, and receive payments. The project's completion will be demonstrated through a cloud-hosted working version, technical presentation, and associated diagrams.

# Development Build

## Cloning the Repository

To clone this repository to your local machine, follow these steps:

1. **Ensure you have Git installed** on your machine. If not, download and install it from [here](https://git-scm.com/).

2. **Open a terminal/command prompt** in the directory where you want to clone the project.

3. **Run the following command:**

    ```bash
    git clone https://github.com/Will-Java-FS/revlearn-frontend-team1.git
    ```

4. **Navigate into the project directory:**

    ```bash
    cd revlearn-frontend-team1
    ```

## Node.js & Node Package Manager Installation

Before downloading Node.js, you should first check if it is already installed on your system.

### Check if Node.js is Installed

1. **Open a terminal/command prompt**.
   
2. **Run the following command:**

    ```bash
    node -v
    ```

    This will display the currently installed version of Node.js. If Node.js is installed, you'll see something like:

    ```
    v20.x.x
    ```

    If you see a version number, you're all set and can skip the installation.

3. **If Node.js is not installed**, you'll see an error message like `command not found`. In this case, follow the steps below to install Node.js.

### Download and Install Node.js

1. **Go to the official Node.js website**: [https://nodejs.org](https://nodejs.org)

2. **Download the LTS (Long-Term Support) version**, which is recommended for most users. This version is more stable for development and production environments.

3. **Run the installer** for your operating system (Windows, macOS, or Linux). Follow the prompts to complete the installation.

4. **Verify the installation** by opening a terminal/command prompt again and running:

    ```bash
    node -v
    ```

    You should see the installed Node.js version.

5. **Install npm (Node Package Manager)**:

    npm is usually installed with Node.js by default. You can check if npm is installed by running:

    ```bash
    npm -v
    ```

    This will show the npm version. If it's missing, you can install it by downloading Node.js again from the website or following specific instructions for your OS.

Now you're ready to use Node.js and npm in your project!

## Environment Variables

1. Create an .env file in your frontend root directory with this information:

```
VITE_API_URL=http://localhost:8080/api/v1
```

## Installing Project Dependencies

To install the necessary project dependencies, follow these steps:

1. **Navigate to the project's root directory** (the folder where `package.json` is located) by opening a terminal/command prompt and running:

    ```bash
    cd path-to-your-project
    ```

2. **Run the following command** to install all the dependencies listed in `package.json`:

    ```bash
    npm i
    ```

This will download and install all required packages for the project.

## Running the Project in Development Mode

To run the project in development mode, follow these steps:

1. **Ensure that all dependencies are installed** by running the `npm i` command as described above.

2. **Run the project** by executing the following command in the terminal/command prompt from the project's root directory:

    ```bash
    npm run dev
    ```

3. **Wait for the development server to start**. Once the server is up and running, you'll see an output similar to this:

    ```
    Local:   http://localhost:5173
    ```

4. **Click on the `localhost` link** or open a web browser and go to the displayed URL (typically `http://localhost:3000`) to view the project.

The page should now load in your browser, and any changes you make to the code will automatically refresh the page.