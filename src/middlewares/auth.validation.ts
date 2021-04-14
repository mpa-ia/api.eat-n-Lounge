
import { DBUser, ValidateRequestParams } from '../types';
import { errorCodes } from '../settings/codes';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const authorizeUser: ValidateRequestParams = async (req, res, next) => {
	try {
		if (req.headers.authorization) {
			const [, token] = req.headers.authorization.split(' ');
			let decodedUser: DBUser | undefined;
			jwt.verify(token, `${process.env.TOKEN_SECRET}`, (err, decoded) => {
				if (err) res.status(400).json({ error: true, errorCode: errorCodes.AUTH_USER_NOT_AUTHENTICATED });
				if (decoded) {
					decodedUser = decoded as DBUser;
				}
			});
			if (decodedUser) {
				const users = await User.find({ _id: decodedUser.id });
				if (users.length === 1) {
					next();
				} else {
					res.status(400).json({ error: true, errorCode: errorCodes.AUTH_NO_USER });
				}
			} else {
				res.status(400).json({ error: true, errorCode: errorCodes.AUTH_USER_NOT_AUTHENTICATED });
			}
		} else {
			res.status(400).json({ error: true, errorCode: errorCodes.AUTH_USER_NOT_AUTHENTICATED });
		}
	} catch (err) {
		res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
	}
}