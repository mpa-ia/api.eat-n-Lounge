import User from '../models/user.model';
import { ServerRequest, SignInPayload, SignUpPayload } from '../types';
import { errorCodes, successCodes } from '../settings/codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signIn: ServerRequest = async (req, res) => {
	const { email, password } = req.body as SignInPayload;
	try {
		const users = await User.find({ email });
		if (!users.length) res.status(404).json({ error: true, errorCode: errorCodes.AUTH_NO_USER });
		else {
			const user = users[0];
			const validPass = await bcrypt.compare(password, user.password);
			if (!validPass) res.status(400).json({ error: true, errorCode: errorCodes.AUTH_WRONG_PASSWORD });
			else {
				const userData = { id: user._id, role: user.role, name: user.name, surname: user.surname, email: user.email };
				const token = jwt.sign(userData, `${process.env.TOKEN_SECRET}`, { expiresIn: '1800s' });
				res.status(200).json({
					status: 'success',
					code: successCodes.SIGNIN_SUCCESS,
					data: {
						user: userData,
						token
					}
				});
			}
		}
	} catch (err) {
		res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
	}
};

export const signUp: ServerRequest = async (req, res) => {
	const { name, surname, email, password, confirmPassword } = req.body as SignUpPayload;
	try {
		const users = await User.find({ email });
		if (users.length) res.status(404).json({ error: true, errorCode: errorCodes.AUTH_USER_EXISTS });
		else if (password !== confirmPassword) res.status(404).json({ error: true, errorCode: errorCodes.AUTH_PASSWORDS_DONT_MATCH });
		else {
			const salt = await bcrypt.genSalt(10);
			const hasPassword = await bcrypt.hash(password, salt);
			const newUser = new User({
				name, surname, email, password: hasPassword, role: 1,
			});
			await newUser.save();
			res.status(200).json({ status: 'success', code: successCodes.SIGNUP_SUCCESS });
		}
	} catch (err) {
		res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
	}
};