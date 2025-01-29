# VEXON - Voice Assistant Project

## Overview
VEXON is an AI-powered voice assistant designed to provide answers to a variety of questions using speech recognition and text-to-speech functionality. By integrating the Web Speech API for voice interaction, it allows users to ask general knowledge questions and receive spoken responses. The assistant fetches answers from Wikipedia, providing users with quick and reliable information.

## Features
- **Speech Recognition**: Converts speech to text in real-time, allowing the user to interact with the assistant using natural language.
- **Text-to-Speech**: Uses the Web Speech API to convert text-based responses into speech for a seamless, hands-free experience.
- **Wikipedia Integration**: Fetches answers from Wikipedia to provide information on various topics.
- **User Interactivity**: Users can interact with the assistant by asking questions like "What is the capital of France?" or "Tell me about the Eiffel Tower."
- **Customizable Assistant Name**: The assistant introduces itself with a customizable name, enhancing personalization.
- **Error Handling**: Includes basic error handling to notify users when the assistant is unable to fetch or process information.

## Technologies Used
- **HTML**: The webpage structure for the assistant interface.
- **CSS**: Provides the layout and styling of the page, ensuring a clean and responsive design.
- **JavaScript**: The backbone of the assistant's functionality, handling speech recognition, fetching data from APIs, and text-to-speech responses.
  - **Web Speech API**: Used for both speech recognition (`SpeechRecognition`) and text-to-speech (`SpeechSynthesis`).
- **Wikipedia API**: Fetches data from Wikipedia to answer questions about general knowledge topics.
- **GitHub Pages**: The project can be deployed easily using GitHub Pages for quick access and demonstration.

## Installation
To run the VEXON project locally, follow these steps:

### Step 1: Clone the repository
Clone the repository to your local machine using the following command:
```bash
git clone https://github.com/yourusername/vexon-assistant.git
