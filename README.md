# PageDigest
PageDigest is a Google Chrome extension designed to provide concise summaries of web pages. This tool helps users quickly grasp the main points of any article or webpage, saving time and enhancing productivity.

## Table of Contents

- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Screenshot](#screenshot)

## Setup

### Prerequisites

List the prerequisites for setting up the project.

- Node.js
- npm or yarn

### Installation

Steps to install the project.

1. Clone the repository:
   ```sh
   git clone https://github.com/GxTeo/PageDigest
   ```
2. Navigate to project directory and install dependencies
    ```sh
    npm install
    ```

### Configuration
1. Open the ```backend/background.js``` file and set your API Key:
    ```sh
    const apiKey = "YOUR_OPENAI_API_KEY";  // Replace with your actual OpenAI API key
    ```

2. Load the extension in Google Chrome:

    - Open Chrome and navigate to chrome://extensions/.
    - Enable "Developer mode" by toggling the switch in the top right corner.
    - Click on the "Load unpacked" button and select the directory where you cloned the repository.

### Usage
Instructions on how to use the project.

Click on the PageDigest extension icon in the Chrome toolbar.
Click the "Summarize Page" button to generate a summary of the current webpage.

Screenshots
Here is a screenshot of the PageDigest extension in action:

![Screenshot](/assets/screenshot.jpg)