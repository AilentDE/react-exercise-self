import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.R2_REGION!,
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
});
