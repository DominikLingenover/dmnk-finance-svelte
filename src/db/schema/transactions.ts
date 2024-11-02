import * as t from 'drizzle-orm/sqlite-core';
import { members } from './members';
import { relations } from 'drizzle-orm';
import { transactionsToTags } from './transactions-to-tags';

export const transactions = t.sqliteTable('transactions', {
	id: t.integer().primaryKey({ autoIncrement: true }),
	label: t.text().notNull(),
	amount: t.integer().notNull(),
	date: t.integer().notNull(),
	memberId: t
		.integer('member_id')
		.references(() => members.id, { onDelete: 'cascade', onUpdate: 'cascade' })
});

export const transactionsRelations = relations(transactions, ({ many }) => ({
	transactionsToTags: many(transactionsToTags)
}));
