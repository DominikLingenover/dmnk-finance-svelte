import { db } from '$lib/drizzle';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const transactions = await db.query.transactions.findMany({ limit: 10 });

	return { transactions };
};
