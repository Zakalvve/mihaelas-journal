# Mihaelas Journal

**Active Development Finished**

This project is an online interactive journal created by the halfling Mihaela Thorngage. In real life it was written by Michael, a player in my ongoing Dungeons and Dragons campaign.

The journal entries are converted to a giant markdown file by Michael. I created a script that parses this file and splits the entries into seperate files. It also creates a consistent directory structure.

This SPA app is powered by React but I use [React Showdown](https://www.npmjs.com/package/react-showdown) to convert markdown files to react components.

## Version 1.0

The first finished release build of this journal app. This app can be viewed live at [Mihaelas Journal](https://mihaelas-journal.netlify.app/). Enjoy reading about her explots in the world of Katya.

### Features

The main talking points I enjoyed working on during this project.

- Audio Manager: This is a class that controls the soundscape for the app. It allows the developer to create a soundscape by layering a combination of looping background sounds and periodically played sound effects. These effects can have their activation paramenters tweaked to make the result seem natural. In the app this class is used to set the scene of a night in the woods. However, it could be used for any soundscape.
- The tree structure used to link journal entries and the parser I created to break down the source document created by Michael. One of the problems to solve with this app was taking a rather wordy souce file and splitting it into sections and then displaying them in the app. There is a natural tree structure that forms when you consider the year, month, day, entry hierarchy. I parse the markdown when this app is built and it creates a json structure which is then used to create a tree within the app itself. The tree is a custom implemntation to help build my understaning of various data-structures and recursive search algorithms.
- Re-theming bootstrap. I have used bootstrap before and by default it creates sites that all feel the same. I wanted to learn more about the popular CSS framework by remaping some of its variables and learning more about how it works using Sass.

# Running this project locally

You are welcome to fork this project and run it locally.

### `npm install`

Will install the required dependencies. 

See *Getting Started with Create React App* below for methods to compile and run the program.

If you wish to fork this repo and run this project
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
