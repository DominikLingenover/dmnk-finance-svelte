import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { transactionsToTags } from './transactions-to-tags';

export const tags = t.sqliteTable('tags', {
	id: t.integer().primaryKey({ autoIncrement: true }),
	name: t.text().notNull()
});

export const tagsRelations = relations(tags, ({ many }) => ({
	transactionsToTags: many(transactionsToTags)
}));
