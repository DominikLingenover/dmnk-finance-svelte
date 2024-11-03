import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/libsql';
import * as transactions from '../db/schema/transactions';
import * as members from '../db/schema/members';
import * as transactionsToTags from '../db/schema/transactions-to-tags';
import * as tags from '../db/schema/tags';

if (!DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

export const db = drizzle({
	schema: { ...members, ...transactions, ...tags, ...transactionsToTags },
	connection: { url: DATABASE_URL }
});
