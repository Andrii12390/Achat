import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

import { apiError, withAuth } from '@/lib/api';
import { pusherServer } from '@/lib/pusher';

export const POST = withAuth<object>(async (req: NextRequest, _, user) => {
  try {
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
});
