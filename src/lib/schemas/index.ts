import { z } from 'zod';

export const groupChatSchema = z.object({
  title: z.string().trim().min(1, 'Group name is required'),
  userIds: z.array(z.string()).min(2, 'Select at least 2 members to create a group'),
});

export type GroupChatInput = z.infer<typeof groupChatSchema>;
