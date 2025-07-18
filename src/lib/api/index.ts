import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { type NextRequest } from 'next/server';

import { getUser } from '@/actions';
import { ApiResponse } from '@/types';
import { type User } from '@/types';

type AuthenticatedApiHandler<T = unknown> = (
  req: NextRequest,
  context: { params: Promise<T> },
  user: User,
) => Promise<Response> | Response;

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
  return createApiResponse(false, undefined, message, status);
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.response.use(
      response => response,
      error => {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        const errorResponse: ApiResponse<never> = {
          success: false,
          message: errorMessage,
          status: error.response?.status || StatusCodes.INTERNAL_SERVER_ERROR,
        };
        return Promise.resolve({ data: errorResponse });
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

export const api = new ApiClient();

export const withAuth = <T>(handler: AuthenticatedApiHandler<T>) => {
  return async (req: NextRequest, context: { params: Promise<T> }) => {
    try {
      const user = await getUser();

      if (!user) {
        return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
      }

      return handler(req, context, user);
    } catch {
      return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
};
