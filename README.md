# React_FinalProject
Final project for UW Quarter 2 Javascript class

## Elevator Pitch
I'm hoping to take the idea from my final project from last quarter, re-write it in React, and build upon it to add additional functionality.  The idea is to create a Flashcard game to allow me (and others) to keep a list of Spanish words, phrases or expressions, and to allow for practice through the use of a game.  The game will use Firebase authentication using the Google and perhaps Facebook providers.  Once logged in, a user can choose to manage a personal list of expressions on a screen with basic CRUD operations using a Firebase database.  The user can then choose to play the game.  Each round will last 30 seconds, with time remaining displayed in a timer component.  Three entries from the list will be presented at random, with one entry matching to the answer card.  The user then chooses which card is the match, and is either awarded a point for guessing correctly or the correct answer is shown and no point is awarded.  At the end of 30 seconds, a Game Over page will be displayed along with the final score.  The program will also keep track of score history for each player.  Scores and lists will be private to each user, so there will be no sharing.
Just for fun, I’m including a weather information section for various major cities in Spain.  This will use the OpenWeather API to display current weather and an image representing the current weather.

If I run short on time, the plan is to at least create the list management page where an authenticated user can manage a list of expressions and translations, as well as the integration with the OpenWeather API.

## Wireframes
The following are basic wireframes of the game that show the basic components on each page. Not intended to show exactly styles, but rather to identify the elements that will be present on each page.

## Dependencies
The following dependencies will be used in this project:
*	React (dom, router, proptypes, etc)
*	Firebase database
*	Firebase authentication
*	OpenWeather API
*	Boostrap

## Tasks
*	Identify components
*	Setup create*react*app scaffold
*	Store environment variables in .env file
*	Create Sign In page components
*	Create weather component and call OpenWeather API (no authentication required)
*	Use authentication to direct user to the main menu page once authenticated, and back to the login page when logged out
*	Create Main Menu page
*	Design schema for storing lists of English and Spanish (or any language) expressions by user
*	Design schema for keeping track of previous scores
*	Build List Management page for all CRUD operations
*	Create Game page
*	Create Scores component and display previous scores for user
*	Create Gave Over page
*	Create timer component that redirects to Game Over page when time is up

## Plan
**Week 1** – identify all components and create the database schema to support the project.  Create the header component that calls the OpenWeather API to display the weather.  Create integration with Google Authentication (saving Facebook for later, if time allows).
Create a basic shell for each page/component and set up the react routing to allow navigation to each page as appropriate, requiring a user to be authenticated for all pages expect for the Sign In page.

**Week 2** – create the CRUD page for managing the list of expressions and translations.  Create the basic game board and display three random cards from the list of expressions in the Firebase database.  Create the timer component that will redirect to the Game Over page after 30 seconds.

**Week 3** - Create the main portion of the game.  Keep track of score and display next round of questions after a user clicks on a card.  Polish the styling of the game and work out any remaining bugs.

