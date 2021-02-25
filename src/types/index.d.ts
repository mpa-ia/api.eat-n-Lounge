import { Document } from 'mongoose';
import { Response, Request, NextFunction } from 'express/index';

interface DBBooking extends Document {
	date: string;
	hours: number;
	duration: number;
	people: number;
	phone: string;
	starters: string[];
	surname: string;
	table: string;
}

type ServerRequest = (req: Request, res: Response) => Promise<void>;
type ValidateRequestParams = (req: Request, res: Response, next: NextFunction) => void;
