DROP DATABASE IF EXISTS stockfolio;

CREATE DATABASE stockfolio;

USE stockfolio;

-- ************************************** `users`

CREATE TABLE `users`
(
 `user_id`  int NOT NULL ,
 `username` varchar(45) NOT NULL ,
 `password` varchar(100) NOT NULL ,
 `email`    varchar(254) NOT NULL ,
 `cash`     decimal NOT NULL ,
 `status`   tinyint NOT NULL ,

PRIMARY KEY (`user_id`)
);


-- ************************************** `transactions`

CREATE TABLE `transactions`
(
 `transaction_id` int NOT NULL ,
 `user_id_ref`    int NOT NULL ,
 `shares`         int NOT NULL ,
 `ticker_symbol`  varchar(20) NOT NULL ,
 `sale_price`     decimal NOT NULL ,
 `date_time`      datetime NOT NULL ,

PRIMARY KEY (`transaction_id`),
KEY `fkIdx_15` (`user_id_ref`),
CONSTRAINT `FK_15` FOREIGN KEY `fkIdx_15` (`user_id_ref`) REFERENCES `users` (`user_id`)
);
