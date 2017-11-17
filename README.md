# Chess Demo by Robert Lombardo

1. Make sure you have the following installed:
    * [Git](https://git-scm.com/downloads)
    * [NodeJs and Npm](https://nodejs.org/en/download/current/)

2. Run:

    ```sh
    npm install
    npm start
    ```

3. Then open your [http://localhost:8080/](http://localhost:8080/) to see the included demo page.

   If you don't want to use localhost on port 8080, you can change it in `package.json` and `webpack.config.js`.

# Embed in a Web Page:

1. Run `npm run build-dev` or `npm run build-prod`.

2. ```html
    <!DOCTYPE html>
    <head>
      <link rel="stylesheet" href="path/to/main.css">
    </head>
    <body>
        <div id="chessModuleParent"></div>
        <script src="path/to/chess_bundle.js"></script>
    </body>
    </html>
    ```