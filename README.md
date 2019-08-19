# TTP-FS

TTP FullStack Assessment

-user is able to create new account with name, email, and password<br />
-default user balance to \$5000<br />
-authenticate via email and password<br />
-buy shares of stock at its current price by ticker symbol and number of shares<br />
-number of shares only as whole numbers<br />
-only available to buy with enough money in account and ticker symbol is valid<br />
-list all transactions made to date<br />
-view list of all stocks with current value<br />
-font color change depending on stock prices<br />

//dependencies<br />
installation command: npm i express express-validator bcryptjs config jsonwebtoken mongoose request<br />
-express, framework for backend<br />
-express-validator for data validation<br />
-bcryptjs for password encryption<br />
-config for global variables<br />
-jsonwebtoken for jwt to pass token for validation<br />
-mongoose for interacting with database<br />
-request for making http requests to api<br />

//Dev dependencies<br />
installation command: npm i -D nodemon concurrently<br />
-nodemon for constant server watching<br />
-concurrently for backend and frontend dev server simoutaneously<br />
