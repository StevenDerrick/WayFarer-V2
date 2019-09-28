import express from "express";
import checkUser from '../middleware/checkUser';
import signupValidator from '../middleware/signupValidator';
import signinValidator from '../middleware/signInValidator';
import { usersSignUp, usersSignIn } from '../controllers/UsersControllers';

const router = express.Router();

router.post('/auth/signup', [checkUser, signupValidator], usersSignUp);
router.post('/auth/signIn', signinValidator, usersSignIn);

export default router;
