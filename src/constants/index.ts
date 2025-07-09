export const PUBLIC_ROUTES = {
  LOGIN: '/',
  REGISTRATION: '/register',
  VERIFICATION: '/verification',
} as const;

export const PRIVATE_ROUTES = {
  CHATS: '/chats',
  USERS: '/users',
  PROFILE: '/profile',
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

export const MESSAGE_IMAGES_BUCKET_FOLDER = process.env.MESSAGE_IMAGES_FOLDER ?? 'messages-images';
export const USER_AVATARS_BUCKET_FOLDER = process.env.USER_AVATARS_FOLDER ?? 'user-avatars';

export const DEFAULT_GROUP_IMAGE = '/default-group.png';
