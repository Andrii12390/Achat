import { S3Client } from '@aws-sdk/client-s3';

const s3ClientSingleton = () =>
  new S3Client({
    region: process.env.AWS_S3_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
    },
  });

declare const globalThis: {
  s3Global: ReturnType<typeof s3ClientSingleton>;
} & typeof global;

export const s3Client = globalThis.s3Global ?? s3ClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.s3Global = s3Client;
