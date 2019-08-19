# TTP-FS

TTP FullStack Assessment

# [checkbox:checked]-user is able to create new account with name, email, and password<br />

# [checkbox:checked]-default user balance to \$5000<br />

# [checkbox:checked]-authenticate via email and password<br />

# [checkbox:unchecked]-buy shares of stock at its current price by ticker symbol and number of shares<br />

# [checkbox:unchecked]-number of shares only as whole numbers<br />

# [checkbox:unchecked]-only available to buy with enough money in account and ticker symbol is valid<br />

# [checkbox:unchecked]-list all transactions made to date<br />

# [checkbox:unchecked]-view list of all stocks with current value<br />

# [checkbox:unchecked]-font color change depending on stock prices<br />

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
