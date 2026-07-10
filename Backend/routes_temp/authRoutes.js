import express from 'express';
import {Router} from 'express';
import { signup, login, logout , getUserData} from '../controllers/authController.js';
import checkAuth from '../middlewares/checkAuth.js';

const authRoute=express(Router());

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.get('/getUserData', checkAuth, getUserData);

export default authRoute;