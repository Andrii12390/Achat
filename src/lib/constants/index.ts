export const PUBLIC_ROUTES = {
  LOGIN: '/',
  REGISTRATION: '/register',
} as const;

export const PRIVATE_ROUTES = {
  CHATS: '/chats',
  USERS: '/users',
  PROFILE: '/profile',
} as const;

export const DEFAULT_GROUP_IMAGE = '/default-group.png';
