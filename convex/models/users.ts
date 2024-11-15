import { v } from 'convex/values';

import { Doc } from '../_generated/dataModel';
import { mutation, query } from '../_generated/server';

export const list = query(async (ctx) => {
  return await ctx.db.query('users').collect();
});

export const send = mutation(async (ctx, user: Doc<'users'>) => {
  await ctx.db.insert('users', user);
});

export const getByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), email))
      .first();

    return user;
  },
});
