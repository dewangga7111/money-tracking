'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { TextField, Label, Input, FieldError } from '@heroui/react';
import type { TextFieldRootProps } from '@heroui/react';
import type { ReactNode } from 'react';

interface AppTextInputPasswordProps extends Omit<TextFieldRootProps, 'children'> {
  label?: string;
  placeholder?: string;
  errorMessage?: ReactNode;
}

export default function AppTextInputPassword({
  label,
  placeholder,
  errorMessage,
  className,
  ...props
}: AppTextInputPasswordProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField variant='secondary' className={`flex flex-col gap-1 w-full ${className ?? ''}`} {...props}>
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Input
          type={isVisible ? 'text' : 'password'}
          {...(placeholder !== undefined ? { placeholder } : {})}
          className="pr-10"
        />
        <button
          type="button"
          aria-label="toggle password visibility"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
          onClick={() => setIsVisible((v) => !v)}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <FieldError>{errorMessage}</FieldError>
    </TextField>
  );
}
