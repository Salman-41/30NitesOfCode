# GPT - GitHub Models

## Overview

GPT - GitHub Models is a web application that allows users to switch between GPT-4o and GPT-4o Mini models using a GitHub token for authentication. The app provides access to AI models hosted on GitHub and enables querying these models for various use cases.

## Features

- Switch between GPT-4o and GPT-4o Mini models.
- Use a GitHub token to access models via the GitHub API.

## Prerequisites

- Python
- Flask
- GitHub Token (for model access)

## Limited Public Beta Access to GitHub Models

Access to GitHub-hosted models is currently limited to a public beta program. If you're part of the beta, you can use your GitHub token to interact with these models. If you're not yet a participant, you can request access via GitHub's beta program page.

## How to Get a GitHub Token

To access the GPT models, you'll need a GitHub token with the necessary scopes:

1. Go to GitHub Developer Settings.
2. Click on Generate new token.
3. Provide a note (e.g., "GPT Model Access").
4. Select the following scopes:
   - read:org
   - repo
   - workflow
   - read:packages
   - write:packages
5. Click Generate Token.
6. Copy the generated token.

## Project Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Salman-41/30NitesOfCode/tree/main/GPT%20-%20Github%20Models
cd GPT\ -\ Github\ Models/
```

### Step 2: Set up the .env File

Create a .env file in the project root and add your GitHub token to it:

```bash
GITHUB_TOKEN=your-github-token
```

### Step 3: Install Dependencies

Make sure you have pip installed, then run the following command:

```bash
pip install -r requirements.txt
```

### Step 4: Running the Application

Start the Flask application:

```bash
python app.py
```

Open your browser and navigate to <http://127.0.0.1:5000/>.

### Step 5: Interact with the Application

1. Select the model (GPT-4o or GPT-4o Mini) from the dropdown.
2. Type a message and interact with the model.

## Key Configuration

- **GitHub Token**: Required to access GitHub-hosted models. Store it securely in the .env file as GITHUB_TOKEN.
- **Environment Variables**: The app uses environment variables for sensitive information like tokens. Ensure your .env file is not committed to version control.

Example .env File:

```bash
GITHUB_TOKEN=your-github-token-here
```
