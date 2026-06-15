'use client';

import { TextField, Label, Input, FieldError } from '@heroui/react';
import type { TextFieldRootProps } from '@heroui/react';
import { type ReactNode, useState, useEffect } from 'react';

interface AppTextInputProps extends Omit<TextFieldRootProps, 'children'> {
  label?: string;
  placeholder?: string;
  type?: string;
  errorMessage?: ReactNode;
}

export default function AppTextInput({
  label,
  placeholder,
  type = 'text',
  errorMessage,
  className,
  onChange,
  value,
  defaultValue,
  name,
  ...props
}: AppTextInputProps) {
  const isNumber = type === 'number';

  const formatNumber = (val: string | number) => {
    if (val === undefined || val === null) return '';
    const digits = val.toString().replace(/\D/g, '');
    return digits ? Number(digits).toLocaleString('id-ID') : '';
  };

  const [internalVal, setInternalVal] = useState(() => {
    const init = value !== undefined ? value : defaultValue;
    if (init !== undefined && init !== null) {
      return isNumber ? formatNumber(init as string) : init.toString();
    }
    return '';
  });

  useEffect(() => {
    if (value !== undefined) {
      setInternalVal(isNumber ? formatNumber(value as string) : value.toString());
    }
  }, [value, isNumber]);

  const handleChange = (v: string) => {
    if (isNumber) {
      const formatted = formatNumber(v);
      setInternalVal(formatted);
      if (onChange) onChange(formatted);
    } else {
      setInternalVal(v);
      if (onChange) onChange(v);
    }
  };

  return (
    <TextField 
      variant='secondary' 
      className={`flex flex-col gap-1 w-full ${className ?? ''}`} 
      value={internalVal}
      onChange={handleChange}
      name={isNumber ? undefined : name}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <Input type={isNumber ? 'text' : type} inputMode={isNumber ? 'numeric' : undefined} {...(placeholder !== undefined ? { placeholder } : {})} />
      {isNumber && name && (
        <input type="hidden" name={name} value={internalVal.replace(/\D/g, '')} />
      )}
      <FieldError>{errorMessage}</FieldError>
    </TextField>
  );
}
