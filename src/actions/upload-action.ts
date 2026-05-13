'use server';

import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import type { ActionResponse } from '@/types/response';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const MAX_SIZE_MB = 5;

type UploadResponse = ActionResponse & { path?: string };

export async function uploadImageAction(formData: FormData): Promise<UploadResponse> {
  try {
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      return { success: false, error: 'No file provided' };
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return { success: false, error: `File exceeds ${MAX_SIZE_MB}MB limit` };
    }

    const ext = extname(file.name).toLowerCase();
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
    if (!allowed.includes(ext)) {
      return { success: false, error: 'Only JPG, PNG, WebP, AVIF allowed' };
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(join(UPLOAD_DIR, filename), buffer);

    return { success: true, path: `/uploads/${filename}` };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: 'Upload failed' };
  }
}
