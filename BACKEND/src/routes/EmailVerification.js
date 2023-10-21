// import express from 'express';

// import { Emailverify } from '../controllers/VerifiyEmail.js';
const express = require('express');
const { Emailverify } = require('../controllers/VerifiyEmail.js');



const Router = express.Router();

// Verify The Email Through The Link
Router.get('/verify', Emailverify);


// export default Router;

module.exports = Router;