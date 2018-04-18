# withHerPoker
Twitter-based implementation of five card draw Poker.

## Installing Prerequisites
1. [NodeJs v7.8.0](https://nodejs.org/en/) 
2. [MongoDb](https://www.mongodb.com/)
3. [Visual Studio Code](https://code.visualstudio.com/)

## Building

### Go to bash or cmd

Clone the repository

```
git clone https://github.com/FrancisLawlor/withHerPoker.git
```

Install all the dependencies

```
cd withHerPoker
cd poker
npm install
```

Install cli for development

```
npm install -g typescript@2.1.6
npm install -g gulp-cli
```

Compiling the code from TS to JS

```
npm run build
```
After installing mongodb

```
db.createUser(
   {
     user: "withHer",
     pwd: "1234",
     roles: [ "readWrite", "dbAdmin" ]
   }
)
```
Make sure to create the above user
Run mongo server in the background
```
mongod
```
Then in new shell
Running the test
```
npm test
```
Running the code, starts a server
```
npm run build
node ./build/main.js
```
