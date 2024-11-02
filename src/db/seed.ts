import { drizzle } from 'drizzle-orm/libsql';
import { members } from './schema/members';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import type { InferInsertModel } from 'drizzle-orm';
import { transactions } from './schema/transactions';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const db = drizzle({
	connection: {
		url: DATABASE_URL
	}
});

async function main() {
	console.log('Seeding database...');
	await db.delete(members);
	await db.delete(transactions);
	console.log('Cleaned up database...');

	console.log('Creating members...');
	const fakeMembers = [createMember(), createMember(), createMember()];
	const insertedMembers = await db
		.insert(members)
		.values(fakeMembers)
		.returning({ insertedId: members.id });
	console.log('Created members...');

	console.log('Creating transactions...');
	for (let i = 0; i < 50; i++) {
		const memberId = faker.number.int({ min: -1, max: 2 });
		await db.insert(transactions).values(createTransaction(insertedMembers[memberId]?.insertedId));
	}
	console.log('Created transactions...');
}

main();

function createMember() {
	return {
		name: faker.person.firstName()
	};
}

function createTransaction(memberId?: number): InferInsertModel<typeof transactions> {
	return {
		label: faker.commerce.productName(),
		amount: faker.number.int({ min: 1, max: 100 }),
		date: faker.date.past().valueOf(),
		memberId: memberId || null
	};
}
