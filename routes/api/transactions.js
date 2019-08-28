const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const {
    check,
    validationResult
} = require('express-validator');
//iex
const request = require('request');
const config = require('config');