import { ApiResponse } from '@/types';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

export function createApiResponse<T>(
  success: boolean,
  data?: T,
  message = success ? 'Success' : 'Error',
  status = success ? StatusCodes.OK : StatusCodes.BAD_REQUEST,
): Response {
  const response: ApiResponse<T> = {
    success,
    data,
    message,
    status,
  };

  return Response.json(response, { status });
}

export function apiSuccess<T>(data?: T, message = 'Success', status = StatusCodes.OK) {
  return createApiResponse(true, data, message, status);
}

export function apiError(message = 'Error', status = StatusCodes.BAD_REQUEST) {
  createApiResponse(false, undefined, message, status);
}

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
