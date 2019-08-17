# TTP-FS

TTP FullStack Assessment

-user is able to create new account with name, email, and password
-default user balance to \$5000
-authenticate via email and password
-buy shares of stock at its current price by ticker symbol and number of shares
-number of shares only as whole numbers
-only available to buy with enough money in account and ticker symbol is valid
-list all transactions made to date
-view list of all stocks with current value
-font color change depending on stock prices

//dependencies
installation command: npm i express express-validator bcryptjs config jsonwebtoken mongoose request
-express, framework for backend
-express-validator for data validation
-bcryptjs for password encryption
-config for global variables
-jsonwebtoken for jwt to pass token for validation
-mongoose for interacting with database
-request for making http requests to api

//Dev dependencies
installation command: npm i -D nodemon concurrently
-nodemon for constant server watching
-concurrently for backend and frontend dev server simoutaneously
