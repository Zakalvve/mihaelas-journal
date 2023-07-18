# Mihaelas Journal

**Active Development Finished**

This project is an online interactive journal created by the halfling Mihaela Thorngage. In real life it was written by Michael, a player in my ongoing Dungeons and Dragons campaign.

The journal entries are converted to a giant markdown file by Michael. I created a script that parses this file and splits the entries into seperate files. It also creates a consistent directory structure.

This SPA app is powered by React but I use [React Showdown](https://www.npmjs.com/package/react-showdown) to convert markdown files to react components.

## Version 1.0

The first finished release build of this journal app. This app can be viewed live at [Mihaelas Journal](https://mihaelas-journal.netlify.app/). Enjoy reading about her explots in the world of Katya.

### Features

The main talking points I enjoyed working on during this project.

- [Audio Manager](https://github.com/Zakalvve/mihaelas-journal/blob/master/src/modules/Audio.js): This is a class that controls the soundscape for the app. It allows the developer to create a soundscape by layering a combination of looping background sounds and periodically played sound effects. These effects can have their activation paramenters tweaked to make the result seem natural. In the app this class is used to set the scene of a night in the woods. However, it could be used for any soundscape.
- [Custom Tree](https://github.com/Zakalvve/mihaelas-journal/blob/master/src/modules/Tree.js) used to link journal entries and the parser I created to break down the source document created by Michael. One of the problems to solve with this app was taking a rather wordy souce file and splitting it into sections and then displaying them in the app. There is a natural tree structure that forms when you consider the year, month, day, entry hierarchy. I parse the markdown when this app is built and it creates a json structure which is then used to create a tree within the app itself. The tree is a custom implemntation to help build my understaning of various data-structures and recursive search algorithms.
- Re-theming bootstrap. I have used bootstrap before and by default it creates sites that all feel the same. I wanted to learn more about the popular CSS framework by remaping some of its variables and learning more about how it works using Sass.

## Running Locally

If you would like to run this project locally you can fork this repo and clone it to your PC. 

In the terminal type `npm install` to install dependencies.

You can then run the app using `npm start` or build it with `npm run build`.
