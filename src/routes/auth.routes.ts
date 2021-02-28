import express = require('express');
import * as auth from '../controllers/auth.controller';

const router = express.Router();

router.post('/signup', auth.signUp);
router.post('/signin', auth.signIn);

export default router;