This generator was created with https://yeoman.io/learning/index.html

- `npm install -g yo`

### to install my generator

- `npm i -g generator-digitalcrafts`

### to create a new project, run my generator

- `yo digitalcrafts`

- enter the name of your project when prompted, then wait until all installation has been completed, this may take a while

- when the installation is complete ( you'll know because create react app will say it is done ) cd into the folder name that you provided the prompt and you're ready to go

- make sure none of your terminals are running node on port 5000 or 3000

- `npm run dev` at the root of the project will start both your api and the react dev server

- the api will be running on 5000 and the frontend will be available on port 3000

- ( make sure the terminal has said that the dev server has been compiled ) navigate to port 3000 in your browser to view the app if it hasn't already opened the browser for you in a new tab. It should say that the api is working at the top of the page. If you don't see that, something has gone wrong ( ie an error ) or its just that create react app's dev server is still compiling. If no errors have been reported and you do not see the "api is working" message on the page at localhost:3000, then there should be a message on the page saying that the api is not working instead, otherwise create react app is being slow to compile

### when ready to deploy to heroku

( to use the following heroku commands, you must install the heroku-cli if you haven't already. To check, open your terminal and run the command `heroku` it will say that the command does not exist if you haven't installed the cli yet, if you haven't: https://devcenter.heroku.com/articles/heroku-cli )

- cd into the client folder and run `npm run build` create-react-app will bundle your app into a folder called `build`. Wait until that process is complete

- `cd ..` back into the project's root folder. add and commit so that the newly created/updated `client/build` folder will be included in git history, therefore making it available to heroku

- push to heroku

- `heroku logs --tail` to see what's happening on the heroku instance. Diagnose any errors that may occur. You'll know that the app is live only when it says "state changed from starting to up"

- `heroku open` will open your browser and navigate to the app

* note that when your site is live, heroku will sometimes take a moment to load up if no-one has visited the site in a while. This is if you are using heroku's free tier. It's good to have a spinner and a message for the user explaining the wait if you can

* also note that anytime a change(s) is made to the client app or to the server `index.js`, in order to see that change(s) on the live heroku site, you must repeat the `cd client/build` and `npm run build` process, cd back into the root, git add, git commit, push to heroku and make sure it makes it live again
