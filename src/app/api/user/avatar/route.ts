import { getUser } from '@/actions';
import { USER_AVATARS_BUCKET_FOLDER } from '@/constants';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { s3Service } from '@/lib/s3/s3-service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function POST(req: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    const formData = await req.formData();

    const file = formData.get('file');

    if (!(file instanceof File)) {
      return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
    }

    const fileUrl = await s3Service.uploadFile(
      Buffer.from(await file.arrayBuffer()),
      file.name,
      USER_AVATARS_BUCKET_FOLDER,
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        imageUrl: fileUrl,
      },
    });

    return apiSuccess(fileUrl, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function DELETE() {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    if (!user.imageUrl) {
      return apiError(ReasonPhrases.CONFLICT, StatusCodes.CONFLICT);
    }

    await s3Service.deleteFile(user.imageUrl);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        imageUrl: null,
      },
    });

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
