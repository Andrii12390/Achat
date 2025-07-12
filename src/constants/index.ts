export const PUBLIC_ROUTES = {
  LOGIN: '/',
  REGISTRATION: '/register',
} as const;

export const PRIVATE_ROUTES = {
  CHATS: '/chats',
  USERS: '/users',
  PROFILE: '/profile',
  VERIFICATION: '/verification',
} as const;

export const PUSHER_EVENTS = {
  NEW_MESSAGE: 'new-message',
  DELETE_MESSAGE: 'delete-message',
  NEW_CHAT: 'new-chat',
  DELETE_CHAT: 'delete-chat',
  UPDATE_CHAT: 'update-chat',

  PRESENCE_SUBSCRIBE: 'pusher:subscription_succeeded',
  PRESENCE_ADD_MEMBER: 'pusher:member_added',
  PRESENCE_REMOVE_MEMBER: 'pusher:member_removed',
} as const;

export const ICON_SIZES = {
  XS: 9,
  SM: 16,
  MD: 20,
  LG: 24,
  XL: 34,
  '2XL': 48,
  '3XL': 56,
  '4XL': 72,
  '5XL': 96,
} as const;

export const ICON_STROKE_WIDTH = 1.7;

export const MESSAGE_IMAGES_BUCKET_FOLDER = process.env.MESSAGE_IMAGES_FOLDER ?? 'messages-images';
export const USER_AVATARS_BUCKET_FOLDER = process.env.USER_AVATARS_FOLDER ?? 'user-avatars';

export const DEFAULT_GROUP_IMAGE = '/default-group.png';
