# Asteroid Dodge Game with PixiJS

This is a simple **Asteroid Dodge Game** built with **PixiJS**, where the player controls a spaceship and dodges incoming asteroids. The game features music controlled via **dat.GUI** for the background music.

### Features:
- **PixiJS**: Handles rendering of the game scene and animations.
- **dat.GUI**:  Manages the background music.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Game Controls](#game-controls)
- [How to Play](#how-to-play)
- [Game Features](#game-features)
- [Acknowledgments](#acknowledgments)

## Installation

### Prerequisites
Before starting the installation, make sure you have **Node.js** installed on your system. You can download and install it from [Node.js official website](https://nodejs.org/).

### 1. Clone the repository:
git clone [Asteroid Dodge](https://github.com/gsimi143/Asteroid_Dodge)

### 2. Navigate to the project directory:
cd asteroid-dodge-game

### 3. Install dependencies:
npm install
This will install the necessary dependencies including **PixiJS**, and **dat.GUI**.

## Usage
After installing the dependencies, you can run the game locally using the following command:
npm start
This will start a local development server and open the game in your default browser.

## Game Controls
- **Left Arrow**: Move the spaceship to the left.
- **Right Arrow**: Move the spaceship to the right.
- **R Key**: To Restart the game.

## How to Play
1. **Start the Game**: Once the game loads, you can start dodging asteroids. The spaceship will automatically be placed at the bottom of the screen. 
2. **Avoid Asteroids**: Move the spaceship left or right by using keyboard's left and right arrow keys to dodge incoming asteroids. If you collide with an asteroid, the game ends.
3. **Scoring**: The score increases as you survive longer in the game.
4. **Game Over**: When the spaceship collides with an asteroid, the game ends, and your final score is displayed.

## Game Features
- **Spaceship**: The player controls a spaceship that moves left and right on the screen to avoid asteroids.
- **Asteroids**: The asteroids fall from the top of the screen and must be avoided by the player. If a collision occurs, the game ends.
- **Collision Detection**: The game uses a simple collision detection system to check if the player's spaceship collides with asteroids.
- **Background Music**: A looping background music is played using **dat.GUI**
- **Scoring**: The score increases based on how long the player survives
  
## Acknowledgments
- **PixiJS**: For providing a powerful 2D rendering engine.
- **dat.GUI**: For easy audio management and playback and for providing an intuitive and customizable interface for user interaction.
