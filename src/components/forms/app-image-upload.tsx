'use client';

import { useRef, useState } from 'react';
import { Spinner } from '@heroui/react';
import { ImagePlus, X } from 'lucide-react';

type AppImageUploadProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  onValueChange?: (value: File | string | null) => void;
};

export default function AppImageUpload({ name, label, defaultValue, onValueChange }: AppImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultValue ?? '');
  const [hasNewFile, setHasNewFile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string>('');

  const applyFile = (file: File) => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreviewUrl(url);
    setHasNewFile(true);
    onValueChange?.(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      applyFile(file);
      // sync to real input
      const dt = new DataTransfer();
      dt.items.add(file);
      if (inputRef.current) inputRef.current.files = dt.files;
    }
  };

  const clear = () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = '';
    setPreviewUrl('');
    setHasNewFile(false);
    if (inputRef.current) inputRef.current.value = '';
    onValueChange?.(null);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}

      {/* Keeps existing path when no new file selected */}
      {!hasNewFile && <input type="hidden" name={name} value={defaultValue ?? ''} />}

      <div
        className="relative rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden transition-colors hover:border-primary cursor-pointer"
        style={{ minHeight: '160px' }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="preview" className="w-full h-full object-cover absolute inset-0" style={{ minHeight: '160px' }} />
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-bold uppercase tracking-wider">Ganti Foto</span>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); clear(); }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
            >
              <X size={12} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-8 h-full" style={{ minHeight: '160px' }}>
            <ImagePlus size={28} className="text-gray-400" />
            <p className="text-xs text-gray-400 text-center">
              Klik atau drag & drop<br />JPG, PNG, WebP, AVIF — maks 5MB
            </p>
          </div>
        )}
      </div>

      {/* Real file input — included in FormData on submit */}
      <input
        ref={inputRef}
        type="file"
        name={hasNewFile ? name : undefined}
        accept=".jpg,.jpeg,.png,.webp,.avif"
        className="hidden"
        onChange={handleChange}
      />

      {previewUrl && hasNewFile && (
        <p className="text-[10px] text-primary">File baru dipilih — akan diupload saat Save</p>
      )}
    </div>
  );
}
