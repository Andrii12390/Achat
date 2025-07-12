import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

import { s3Client } from '.';

const bucketName = process.env.AWS_S3_BUCKET_NAME;

export const s3Service = {
  async uploadFile(fileBuffer: Buffer, fileName: string, folder?: string): Promise<string> {
    const key = folder ? `${folder}/${fileName}` : fileName;

    const uniqueKey = `${key}-${crypto.randomUUID()}`;

    const params = {
      Bucket: bucketName,
      Key: uniqueKey,
      Body: fileBuffer,
      ContentType: this._getContentType(fileName),
    };

    await s3Client.send(new PutObjectCommand(params));

    return `https://${bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${uniqueKey}`;
  },

  async deleteFile(url: string): Promise<void> {
    const params = {
      Bucket: bucketName,
      Key: this.getFileKeyFromUrl(url),
    };

    await s3Client.send(new DeleteObjectCommand(params));
  },

  getFileKeyFromUrl(url: string): string {
    return url.split('/').slice(3).join('/');
  },

  _getContentType(fileName: string): string {
    const extension = fileName.toLowerCase().split('.').pop();

    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      ico: 'image/x-icon',
    };

    return mimeTypes[extension || ''] || 'application/octet-stream';
  },
};
