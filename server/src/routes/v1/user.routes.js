const express = require('express');
const { signUp, signIn, update } = require('../../controllers/user.controller');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/update/:userId', update);

export const userRouter = router;
