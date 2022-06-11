# Evaluate a News with Natural with Language Processing (NLP) Project

## Project Description

This project features following development tools:
- Webpack Loaders and Plugins
- Sass styles
- Service workers
- External API for NLP

NLPs leverage machine learning and deep learning create a program that can interpret natural human speech. Systems like Alexa, Google Assistant, and many voice interaction programs are well known to us, but understanding human speech is an incredibly difficult task and requires a lot of resources to achieve. Full disclosure, this is the Wikipedia definition, but I found it to be a clear one:

> Natural language processing (NLP) is a subfield of computer science, information engineering, and artificial intelligence
concerned with the interactions between computers and human (natural) languages, in particular how to program computers to
process and analyze large amounts of natural language data.

a fairly new API called MeaningCloud has put a public facing API in front of their NLP system. It is used in this project to determine various attributes of an article or blog post.

## Usage

### Web app
1. Configure environment variable
  - Create new .env file in the root of the project repo
  - Fill the .env file with your API key for meaningCloud API
    ```bash
    API_KEY=**************************
    ```

2. Configure build environment
  - Using docker
    1. build image with dockerfile in the root of the project repo
      ```bash
      docker build . -t evaluate-news-nlp
      ```
    2. run docker image
      ```bash
      docker run -it -p 8080:8080 evaluate-news-nlp
      ```
    
  - Not using docker
    1. remove entry of node-sass package from package.json in the root of the project repo
    2. install dependencies
      ```bash
      # Initialize npm
      npm install --force
      ```
    3. install node-sass package
      ```bash
      npm install node-sass --legacy-peer-deps
      ```
    4. install cors package
      ```bash
      npm install cors --force
      ```
    5. install mocha package
      ```bash
      npm install mocha --force
      ```

    - For reference, proposed set of packages with their versions are package.json file as well as in *Dependencies* section

3. Build web app with webpack
  - Build in production mode
    ```bash
    # Build web app in production mode
    npm run build-prod
    ```

4. Run server and connect in browser
    ```bash
    # Run server with node.js
    npm run start

    # Open Google Chrome
    open -a 'Google Chrome'

    # connect to http://HostURL:8080
    ```

* Unit testing using Mocha framework
    ```bash
    npm run test
    ```

* Run Webpack dev server (only for not using docker)
    ```bash
    # run dev server in development mode
    npm run dev-server
    ```

## Dependencies

| Type | Description |
| ----------- | ----------- |
| Software | The project is tested on Google Chrome 100.0.4896.75(official build) (arm64) with javascript version 1.7. The project is tested on node.js version 16.14.2. The project is tested with packages dependencies with their versions (below the table)|
| Firmware | No known dependency |
| Hardware | the project is tested on MacBook Air (M1, 2020) |

```javascript
"dependencies": {
  "dotenv": "^8.2.0",
  "express": "^4.17.1",
  "jest-fetch-mock": "^3.0.3",
  "jsdom": "^19.0.0",
  "node-fetch": "^3.2.5",
  "node-sass": "^7.0.1",
  "sass-loader": "^13.0.0",
  "webpack": "^5.72.1",
  "webpack-cli": "^4.9.2"
},
"devDependencies": {
  "@babel/core": "^7.5.4",
  "@babel/preset-env": "^7.5.4",
  "babel-loader": "^8.0.6",
  "chai": "^4.3.6",
  "clean-webpack-plugin": "^4.0.0",
  "cross-fetch": "^3.1.5",
  "css-loader": "^6.7.1",
  "html-webpack-plugin": "^5.5.0",
  "mini-css-extract-plugin": "^2.6.0",
  "optimize-css-assets-webpack-plugin": "^6.0.1",
  "style-loader": "^3.3.1",
  "terser-webpack-plugin": "^5.3.3",
  "webpack-dev-server": "^4.9.1",
  "workbox-webpack-plugin": "^6.5.3"
},
```

## List of files
- src
	- client
    - js
      - formHandler.js
      - postRequester.js
      - urlChecker.js
    - styles
      - base.scss
      - footer.scss
      - form.scss
      - header.scss
      - resets.scss
    - views
      - index.html
    - index.js
	- server
    - ignore.js
    - index.js
    - mockAPI.js
    - utils.index.js
- test
  - mockAPI.test.js
  - utils.index.test.js
  - utils.js
- .babelrc
- .gitignore
- README.md
- REQUIREMENTS.md
- webpack.dev.js
- webpack.prod.js

## References

- Starter code and instructions : https://github.com/udacity/fend/tree/refresh-2019/projects/evaluate-news-nlp
- meaningCloud API Sentiment Anlaysis API version 2.1 : https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/response
- How to write Unit Test with NodeJS : https://medium.com/serverlessguru/how-to-unit-test-with-nodejs-76967019ba56
- How to check if a number is float or integer : https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
- Udacity logo image: https://seeklogo.com/vector-logo/335154/udacity
- MeaningCloud logo image: https://www.meaningcloud.com/

## TODO-list for enhancement

## MEMO
- terser-webpack-plugin is not installed due to conflict with webpack version. 