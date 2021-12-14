# Orthodox Calendar

## Installation

First get this up and running (see its readme):
https://github.com/dimaip/calendar-backend

Then:

```
#ON WINDOWS RUN IN MINGW Bash (GIT for Windows) [https://gitforwindows.org/]
#-------------------------------------------------------------------------------------
touch ~/.bashrc && touch ~/.bash_profile #creates these files if they don't exist 

#Download and install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
. ~/.bashrc    #load bashrc immediately
command -v nvm #output must be "nvm"
nvm current    #output must be "none" if no node installed

#Install Node.js v12
nvm install 12
nvm use default 12
nvm current #output must be similar to "v12.22.7"
npm install --global yarn #Yarn is a package manager (alternative to NPM)

#Clone GIT repository of calendar application
git clone https://github.com/dimaip/calendar.git
#!!! If you want to create a pull requests, first create a fork on GitHub.
#!!! Then clone from your forked repository:
#git clone https://github.com/<YOUR_LOGIN_ON_GitHub>/calendar.git

#Build and run
cd calendar
yarn
yarn start #run application
```

Use `yarn build` for production build.
