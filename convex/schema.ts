import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),
  users: defineTable({
    name: v.string(),
    photo: v.string(),
    email: v.string(),
    phone: v.string(),
    role: v.union(v.literal('admin'), v.literal('user'), v.literal('tenant')),
    status: v.union(
      v.literal('active'),
      v.literal('inactive'),
      v.literal('pending'),
      v.literal('verified'),
      v.literal('suspended'),
      v.literal('on_hold'),
      v.literal('invited'),
      v.literal('trial'),
      v.literal('expired'),
      v.literal('locked'),
      v.literal('restricted'),
      v.literal('guest')
    ),
    modifiedBy: v.string(),
    modifiedAt: v.number(),
    modifierName: v.string(),
    deletedAt: v.union(v.null(), v.number()),
  }),
  competitions: defineTable({
    name: v.string(),
    description: v.string(),
    media: v.object({
      type: v.string(),
      url: v.string(),
      order: v.number(),
    }),
    status: v.union(
      v.literal('upcoming'),
      v.literal('registration_open'),
      v.literal('registration_closed'),
      v.literal('ongoing'),
      v.literal('paused'),
      v.literal('completed'),
      v.literal('canceled'),
      v.literal('postponed'),
      v.literal('finalized'),
      v.literal('archived')
    ),
    modifiedBy: v.string(),
    modifiedAt: v.number(),
    modifierName: v.string(),
    deletedAt: v.union(v.null(), v.number()),
  }),
  drivers: defineTable({
    name: v.string(),
    photo: v.string(),
    birthdate: v.optional(v.number()),
    about: v.optional(v.string()),
    socialMedia: v.optional(
      v.object({
        facebook: v.optional(v.string()),
        twitter: v.optional(v.string()),
        instagram: v.optional(v.string()),
        linkedin: v.optional(v.string()),
        tiktok: v.optional(v.string()),
      })
    ),
    modifiedBy: v.string(),
    modifiedAt: v.number(),
    modifierName: v.string(),
    deletedAt: v.union(v.null(), v.number()),
  }),
});
