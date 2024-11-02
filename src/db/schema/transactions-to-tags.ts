import * as t from 'drizzle-orm/sqlite-core';
import { transactions } from './transactions';
import { tags } from './tags';
import { relations } from 'drizzle-orm';

export const transactionsToTags = t.sqliteTable(
	'transactions_to_tags',
	{
		transactionId: t
			.integer('transaction_id')
			.notNull()
			.references(() => transactions.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		tagId: t
			.integer('tag_id')
			.notNull()
			.references(() => tags.id, { onDelete: 'cascade', onUpdate: 'cascade' })
	},
	(table) => ({
		pk: t.primaryKey({ columns: [table.transactionId, table.tagId] })
	})
);

export const transactionsToTagsRelations = relations(transactionsToTags, ({ one }) => ({
	transaction: one(transactions, {
		fields: [transactionsToTags.transactionId],
		references: [transactions.id]
	}),
	tag: one(tags, { fields: [transactionsToTags.tagId], references: [tags.id] })
}));
