import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

import { getUser } from '@/actions';
import { apiError } from '@/lib/api';
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    const body = await req.text();

    const params = new URLSearchParams(body);

    const socket_id = params.get('socket_id') || '';
    const channel_name = params.get('channel_name') || '';

    const { id, email, username, avatarColor, imageUrl, isVerified } = user;

    const presenceData = {
      user_id: id,
      user_info: {
        email,
        username,
        avatarColor,
        imageUrl,
        isVerified,
      },
    };

    const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, presenceData);

    return NextResponse.json(authResponse, { status: 200 });
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
