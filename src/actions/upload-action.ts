'use server';

import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { unstable_getContext } from 'waku/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';
import type { ActionResponse } from '@/types/response';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const MAX_SIZE_MB = 5;

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const ALLOWED_MAGIC: Record<string, string[]> = {
  '.jpg':  ['ffd8ff'],
  '.jpeg': ['ffd8ff'],
  '.png':  ['89504e47'],
  '.webp': ['52494646'],
  '.avif': ['0000'],
};

type UploadResponse = ActionResponse & { path?: string };

function getSession() {
  const { req } = unstable_getContext();
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  const token = match?.[1];
  return token ? verifySessionToken(token) : null;
}

function checkMagicBytes(buffer: Buffer, ext: string): boolean {
  const hex = buffer.subarray(0, 8).toString('hex');
  const prefixes = ALLOWED_MAGIC[ext];
  if (!prefixes) return false;
  // WebP: bytes 0-3 are "RIFF", bytes 8-11 are "WEBP" — check first 4
  if (ext === '.webp') return hex.startsWith('52494646');
  return prefixes.some((p) => hex.startsWith(p));
}

export async function uploadImageAction(formData: FormData): Promise<UploadResponse> {
  if (!getSession()) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      return { success: false, error: 'No file provided' };
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return { success: false, error: `File exceeds ${MAX_SIZE_MB}MB limit` };
    }

    const ext = extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return { success: false, error: 'Only JPG, PNG, WebP, AVIF allowed' };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (!checkMagicBytes(buffer, ext)) {
      return { success: false, error: 'File content does not match its extension' };
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    await writeFile(join(UPLOAD_DIR, filename), buffer);

    return { success: true, path: `/uploads/${filename}` };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: 'Upload failed' };
  }
}
