import * as t from 'drizzle-orm/sqlite-core';

export const members = t.sqliteTable('members', {
	id: t.integer().primaryKey({ autoIncrement: true }),
	name: t.text().notNull()
});
