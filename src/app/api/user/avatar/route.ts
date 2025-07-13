import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { USER_AVATARS_BUCKET_FOLDER } from '@/constants';
import { apiError, apiSuccess, withAuth } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { s3Service } from '@/lib/s3/s3-service';

export const POST = withAuth<object>(async (req, _, user) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
    }

    if (user.imageUrl) {
      await s3Service.deleteFile(user.imageUrl);
    }

    const fileUrl = await s3Service.uploadFile(
      Buffer.from(await file.arrayBuffer()),
      file.name,
      USER_AVATARS_BUCKET_FOLDER,
    );

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { imageUrl: fileUrl },
    });

    return apiSuccess(updatedUser.imageUrl, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export const DELETE = withAuth<object>(async (req, _, user) => {
  try {
    if (!user.imageUrl) {
      return apiError('User does not have an avatar to delete', StatusCodes.CONFLICT);
    }

    await s3Service.deleteFile(user.imageUrl);

    await prisma.user.update({
      where: { id: user.id },
      data: { imageUrl: null },
    });

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});
