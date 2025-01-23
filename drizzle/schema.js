import { pgTable, serial, text, timestamp, uuid, integer, boolean, date } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  sessionNumber: integer('session_number').notNull(),
  completedAt: timestamp('completed_at').defaultNow(),
  notes: text('notes'),
});

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  sessionNumber: integer('session_number').notNull(),
  description: text('description').notNull(),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const actions = pgTable('actions', {
  id: serial('id').primaryKey(),
  goalId: integer('goal_id').references(() => goals.id),
  description: text('description').notNull(),
  dueDate: date('due_date'),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});