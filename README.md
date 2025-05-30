# ABOUT

HoneyOS is a simulation of an OS built with React and Electron. It simulates scheduling policies, memory management, and provides an interactive desktop environment with voice recognition capabilities.

# PROJECT STRUCTURE

## Backend (`src/backend/`)
Contains all backend processes and simulation logic:
- **job.js**: Responsible for initiating the creation of jobs
- **algorithm.js**: Contains the code for various scheduling policies
- **memory.js**: Implements memory management using segmentation with best-fit allocation
- **simulation.js**: Integrates the processes and simulates the OS processes and memory management
- **replacement/**: Contains additional algorithms for page replacement
  - **algorithms.js**: Implementation of page replacement algorithms
  - **simulation.js**: Page replacement simulation logic

## Frontend (`src/frontend/`)
Contains all code for the UI/UX:
- **assets/**: Contains fonts, images, and sounds organized in subdirectories
- **components/**: Includes necessary sections for visuals
  - **ui/**: Reusable UI components
  - **pcb/**: Process Control Block components
  - **readyQTable/**: Ready queue table components
  - **jobPoolTable/**: Job pool table components
  - **memory/**: Memory visualization components
  - **notepad/**: Notepad application components
  - **camera/**: Camera functionality components
  - **voiceRecog/**: Voice recognition components
  - **replacementAlgo/**: Page replacement algorithm visualization
- **pages/**: Manages separate routes and main application screens
  - **boot/**: Boot screen implementation
  - **login/**: Login screen
  - **desktop/**: Main desktop environment
  - **shutdown/**: Shutdown screen
  - **pcb/**: PCB-related pages
  - **replacement/**: Page replacement visualization pages

## Core Application Files (`src/`)
- **App.js**: Main React application entry point
- **CustomCursor.js**: Custom cursor implementation
- **lib/utils.js**: Utility functions

## Public Directory (`public/`)
- **electron.js**: Main Electron process
- **preload.js**: Electron preload script
- **voice_recog.py**: Python script for voice recognition functionality
- **index.html**: Main HTML template

## Dependencies/Requirements

### Node.js Dependencies
- **ElectronJS**: Desktop application framework
- **React**: Frontend framework
- **Material-UI (@mui/material)**: UI component library
- **Radix UI**: Headless UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Router DOM**: Routing for React applications
- **Express**: Backend server framework
- **Express WebSocket**: WebSocket support
- **Lucide React**: Icon library

### Python Dependencies (for voice recognition)
- **PyAudio**: Audio I/O library
- **Vosk**: Speech recognition toolkit
- **WebSockets**: WebSocket client library

### Development Tools
- **Electron Builder**: Application packaging
- **Concurrently**: Run multiple commands concurrently
- **Cross-env**: Cross-platform environment variables

## Installation

1. Clone or pull the repository and navigate to the project directory
2. Install Node.js dependencies: `npm install`
3. Install Python dependencies (for voice recognition): `pip install -r requirements.txt`
4. Ensure `npm install electron-builder` is installed

## Local Setup

1. **Initial setup**: Run this command before starting your project for the first time:
   ```bash
   npm run rebuild-app
   ```
   > If you encounter any errors related to the database file not being read, run this command and restart the server.
   > Run this command after installing any new dependencies.

2. **Development mode**: Run the app in development mode inside an Electron window:
   ```bash
   npm run start-electron-app
   ```
   > The page will reload when you make changes. Lint errors will appear in the console.

## Build Commands

- **Windows**: `npm run package-windows`
- **macOS**: `npm run package-mac`
- **Linux**: `npm run package-linux`

## Features

- **OS Simulation**: Complete operating system simulation with scheduling and memory management
- **Interactive Desktop**: Fully functional desktop environment
- **Voice Recognition**: Voice command capabilities using Python integration
- **Process Control**: Real-time process and memory visualization
- **Multiple Algorithms**: Support for various scheduling and page replacement algorithms

# OUTPUT

![image](https://github.com/lkpnchl/HoneyOS/assets/69750024/4cc08c3f-8925-49cd-af7f-1569ee13af31)
