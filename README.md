# ABOUT

HoneyOS is a simulation of an OS. Mainly to simulate scheduling policies and memory management.

# IMPORTANT DIRECTORY:

src\backend - Contains all backend processes:
> job.js: Responsible for initiating the creation of jobs.
> algorithm.js: Contains the code for various scheduling policies.
> memory.js: Implements memory management using segmentation with best-fit allocation (added starvation late).
> simulation.js: Integrates the processes and simulates the OS processes and memory management.

src\frontend - Contains all code for the UI/UX:
> assets: Contains fonts, images, and sounds.
> components: Includes necessary sections for visuals.
> pages: Manages separate routes.


## Dependencies/Requirements

- ElectronJS
- React
- SQLite
- Node.JS

## Installation

1. Once the repository is cloned or pulled. Navigate to the project directory and edit with VS Code. 
2. Install the dependencies: `npm install`
3. Ensure `npm install electron-builder` is installed

## Local Set Up

1. In the project directory, run this initially before starting your project: `npm run rebuild-app`
> If you face any error related to the DB file not being read, please run this command and then start the server again.
> 
> Run this every after installation of a dependency.

2. Run the app in the development mode inside Electron Window: `npm run start-electron-app`
> The page will reload when you make changes. You may also see any lint errors in the console.

# OUTPUT

![image](https://github.com/lkpnchl/HoneyOS/assets/69750024/4cc08c3f-8925-49cd-af7f-1569ee13af31)