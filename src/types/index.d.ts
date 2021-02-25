import { Document } from 'mongoose';

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
