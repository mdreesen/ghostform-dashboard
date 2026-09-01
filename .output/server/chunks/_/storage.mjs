import { u as useRuntimeConfig, b as createError } from '../nitro/nitro.mjs';
import { DeleteObjectCommand, PutObjectCommand, S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

let client = null;
function hasR2() {
  const r2 = useRuntimeConfig().r2;
  return Boolean((r2 == null ? void 0 : r2.accountId) && (r2 == null ? void 0 : r2.accessKeyId) && (r2 == null ? void 0 : r2.secretAccessKey) && (r2 == null ? void 0 : r2.bucket));
}
function s3() {
  if (client) return client;
  const cfg = useRuntimeConfig();
  const { accountId, accessKeyId, secretAccessKey } = cfg.r2;
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw createError({
      statusCode: 500,
      message: "Object storage is not configured. Set R2_* in .env, or leave them unset to use local storage in development."
    });
  }
  client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey }
  });
  return client;
}
function bucket() {
  var _a;
  const b = (_a = useRuntimeConfig().r2) == null ? void 0 : _a.bucket;
  if (!b) throw createError({ statusCode: 500, message: "R2_BUCKET is not set." });
  return b;
}
function buildKey(userId, projectId, filename) {
  const ext = (filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const rand = Math.random().toString(36).slice(2, 10);
  return `u/${userId}/p/${projectId}/${Date.now()}-${rand}.${ext}`;
}
async function presignUpload(key, contentType) {
  if (!hasR2()) return `/api/uploads/local/${key}`;
  return getSignedUrl(
    s3(),
    new PutObjectCommand({ Bucket: bucket(), Key: key, ContentType: contentType }),
    { expiresIn: 600 }
  );
}
async function readUrl(key) {
  if (!hasR2()) return `/api/uploads/local/${key}`;
  const base = useRuntimeConfig().public.assetBase;
  if (base) return `${String(base).replace(/\/$/, "")}/${key}`;
  return getSignedUrl(s3(), new GetObjectCommand({ Bucket: bucket(), Key: key }), { expiresIn: 3600 });
}
async function deleteObject(key) {
  if (!hasR2()) {
    const { unlink } = await import('node:fs/promises');
    const { join } = await import('node:path');
    await unlink(join(process.cwd(), ".data", "uploads", key)).catch(() => {
    });
    return;
  }
  await s3().send(new DeleteObjectCommand({ Bucket: bucket(), Key: key }));
}
const MIME_BY_EXT = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
  ".heif": "image/heif"
};
async function fetchAsBase64(key) {
  try {
    if (!hasR2()) {
      const { readFile } = await import('node:fs/promises');
      const { join, normalize, extname } = await import('node:path');
      const root = join(process.cwd(), ".data", "uploads");
      const target = normalize(join(root, key));
      if (!target.startsWith(root)) {
        console.error("[storage] refused a key that escapes the upload dir:", key);
        return null;
      }
      const buf2 = await readFile(target);
      return {
        data: buf2.toString("base64"),
        // MIME from the extension — buildKey preserves it for exactly this.
        mime: MIME_BY_EXT[extname(target).toLowerCase()] || "application/octet-stream"
      };
    }
    const url = await readUrl(key);
    const res = await fetch(url);
    if (!res.ok) {
      console.error("[storage] read returned", res.status, "for", key);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    return {
      data: buf.toString("base64"),
      mime: res.headers.get("content-type") || "application/octet-stream"
    };
  } catch (err) {
    console.error("[storage] read failed for", key, (err == null ? void 0 : err.message) || err);
    return null;
  }
}

export { buildKey as b, deleteObject as d, fetchAsBase64 as f, hasR2 as h, presignUpload as p };
//# sourceMappingURL=storage.mjs.map
