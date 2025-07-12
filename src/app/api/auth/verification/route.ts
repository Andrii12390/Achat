import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Resend } from 'resend';

import { getUser } from '@/actions';
import VerificationEmail from '@/features/auth/components/email/verification-template';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt,
      },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
      from: process.env.EMAIL_DOMAIN ?? 'onboarding@resend.dev',
      to: user.email,
      subject: 'AChat | Verification',
      react: VerificationEmail({ code }),
    });

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    const { code } = await req.json();

    if (!code) {
      return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        userId: user.id,
        code: parseInt(code),
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verificationCode) {
      return apiError('Invalid code', StatusCodes.BAD_REQUEST);
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
