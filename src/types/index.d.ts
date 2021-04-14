import { Document } from 'mongoose';
import { Response, Request, NextFunction } from 'express/index';

interface DBBooking extends Document {
	date: string;
	hours: number[];
	people: number;
	phone: string;
	starters: string[];
	surname: string;
	table: string;
	userId?: string;
}
interface DBUser extends Document {
	email: string;
	password: string;
	name: string;
	surname: string;
	role: number;
}

interface SignInPayload {
	email: string;
	password: string;
}
interface SignUpPayload extends SignInPayload {
	name: string;
	surname: string;
	confirmPassword: string;
	acceptPolicy: boolean;
}


type ServerRequest = (req: Request, res: Response) => Promise<void>;
type ValidateRequestParams = (req: Request, res: Response, next: NextFunction) => void;
