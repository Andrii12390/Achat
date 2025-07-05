export const PUBLIC_ROUTES = {
  LOGIN: '/',
  REGISTRATION: '/register',
} as const;

export const PRIVATE_ROUTES = {
  CHATS: '/chats',
  USERS: '/users',
  PROFILE: '/profile',
} as const;

export const MESSAGE_IMAGES_BUCKET_FOLDER = process.env.MESSAGE_IMAGES_FOLDER ?? 'messages-images';
export const USER_AVATARS_BUCKET_FOLDER = process.env.USER_AVATARS_FOLDER ?? 'user-avatars';

export const DEFAULT_GROUP_IMAGE = '/default-group.png';
