'use client';

import { useState } from 'react';
import { Button, Card, Spinner } from '@heroui/react';
import { Save, Plus, Trash2 } from 'lucide-react';
import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import AppImageUpload from '@/components/forms/app-image-upload';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { uploadImageAction } from '@/actions/upload-action';
import { actionButtons, button, form } from '@/utils/primitives';
import type { ProductsData, Product, KandunganItem } from '@/types/sections/products-section';
import type { ActionResponse } from '@/types/response';

type ProductState = Product & { file?: File | null };

type Props = {
  initialData: ProductsData | null;
  saveAction: (data: ProductsData) => Promise<ActionResponse>;
};

async function resolveImage(current: string, file?: File | null): Promise<string> {
  if (file) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadImageAction(fd);
    if (!res.success) throw new Error(res.error || 'Upload failed');
    return res.path!;
  }
  return current;
}

export function ProductsContent({ initialData, saveAction }: Props) {
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const [header, setHeader] = useState({
    badge: initialData?.badge ?? '',
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
  });

  const [products, setProducts] = useState<ProductState[]>(
    initialData?.products.map((p) => ({ ...p, file: null })) ?? []
  );

  const updateProduct = (i: number, patch: Partial<ProductState>) =>
    setProducts((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));

  const updateKandungan = (pi: number, ki: number, patch: Partial<KandunganItem>) =>
    setProducts((prev) =>
      prev.map((p, idx) =>
        idx === pi
          ? { ...p, kandungan: p.kandungan.map((k, kidx) => (kidx === ki ? { ...k, ...patch } : k)) }
          : p
      )
    );

  const addProduct = () =>
    setProducts((prev) => [
      ...prev,
      { image: '', name: '', subtitle: '', badge: { label: '', cls: '' }, desc: '', kandungan: [], valueCls: 'text-primary', reg: '', file: null },
    ]);

  const removeProduct = (i: number) => setProducts((prev) => prev.filter((_, idx) => idx !== i));

  const handleSave = () => {
    confirm({
      message: 'Simpan perubahan Products section?',
      onConfirm: doSave,
    });
  };

  const doSave = async () => {
    setLoading(true);
    try {
      const resolvedProducts = await Promise.all(
        products.map(async (p) => {
          const { file, ...rest } = p;
          return { ...rest, image: await resolveImage(p.image, file) };
        })
      );

      const data: ProductsData = { ...header, products: resolvedProducts };
      const result = await saveAction(data);
      if (result.success) {
        showSuccessToast(result.message || 'Products section saved');
      } else {
        showErrorToast(result.error || 'Failed to save');
      }
    } catch (e: any) {
      showErrorToast(e?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={form()}>
      {/* Header */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Header Section</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <AppTextInput
              name="badge"
              label="Badge"
              value={header.badge}
              onChange={(val) => setHeader((p) => ({ ...p, badge: val }))}
            />
            <AppTextInput
              name="title"
              label="Title"
              value={header.title}
              onChange={(val) => setHeader((p) => ({ ...p, title: val }))}
            />
            <AppTextarea
              name="description"
              label="Description"
              value={header.description}
              onChange={(val) => setHeader((p) => ({ ...p, description: val }))}
              minRows={3}
              className="lg:col-span-2"
            />
          </div>
        </Card.Content>
      </Card>

      {/* Products */}
      {products.map((product, i) => (
        <Card key={i}>
          <Card.Content>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-gray-700">Produk {i + 1}</h3>
              <button
                type="button"
                onClick={() => removeProduct(i)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              <AppImageUpload
                name={`product_${i}_image`}
                label="Foto Produk"
                defaultValue={product.image}
                onValueChange={(val) =>
                  updateProduct(i, { file: val instanceof File ? val : null, image: val === null ? '' : product.image })
                }
                className="lg:col-span-2"
              />
              <AppTextInput
                name={`product_${i}_name`}
                label="Nama Produk"
                value={product.name}
                onChange={(val) => updateProduct(i, { name: val })}
              />
              <AppTextInput
                name={`product_${i}_subtitle`}
                label="Subtitle"
                value={product.subtitle}
                onChange={(val) => updateProduct(i, { subtitle: val })}
              />
              <AppTextInput
                name={`product_${i}_badge_label`}
                label="Badge Label"
                value={product.badge.label}
                onChange={(val) => updateProduct(i, { badge: { ...product.badge, label: val } })}
              />
              <AppTextInput
                name={`product_${i}_badge_cls`}
                label="Badge Class (Tailwind)"
                value={product.badge.cls}
                onChange={(val) => updateProduct(i, { badge: { ...product.badge, cls: val } })}
              />
              <AppTextarea
                name={`product_${i}_desc`}
                label="Deskripsi"
                value={product.desc}
                onChange={(val) => updateProduct(i, { desc: val })}
                minRows={3}
                className="lg:col-span-2"
              />
              <AppTextInput
                name={`product_${i}_valueCls`}
                label="Value Color Class (Tailwind)"
                value={product.valueCls}
                onChange={(val) => updateProduct(i, { valueCls: val })}
              />
              <AppTextInput
                name={`product_${i}_reg`}
                label="No. Registrasi"
                value={product.reg}
                onChange={(val) => updateProduct(i, { reg: val })}
              />
            </div>

            <h4 className="font-semibold text-sm text-gray-700 mt-5 mb-3">Kandungan</h4>
            <div className="flex flex-col gap-2">
              {product.kandungan.map((k, ki) => (
                <div key={ki} className="flex gap-2 items-end">
                  <AppTextInput
                    name={`product_${i}_k_${ki}_key`}
                    label="Nama"
                    value={k.key}
                    onChange={(val) => updateKandungan(i, ki, { key: val })}
                    className="flex-1"
                  />
                  <AppTextInput
                    name={`product_${i}_k_${ki}_value`}
                    label="Nilai"
                    value={k.value}
                    onChange={(val) => updateKandungan(i, ki, { value: val })}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setProducts((prev) =>
                        prev.map((p, idx) =>
                          idx === i ? { ...p, kandungan: p.kandungan.filter((_, kidx) => kidx !== ki) } : p
                        )
                      )
                    }
                    className="mb-1 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setProducts((prev) =>
                    prev.map((p, idx) =>
                      idx === i ? { ...p, kandungan: [...p.kandungan, { key: '', value: '' }] } : p
                    )
                  )
                }
                className="flex items-center gap-1 text-xs text-primary hover:underline mt-1 w-fit"
              >
                <Plus size={13} /> Tambah kandungan
              </button>
            </div>
          </Card.Content>
        </Card>
      ))}

      <button
        type="button"
        onClick={addProduct}
        className="flex items-center gap-2 text-sm text-primary hover:underline w-fit"
      >
        <Plus size={15} /> Tambah produk
      </button>

      <div className={actionButtons()}>
        <Button
          type="button"
          variant="primary"
          className={button()}
          isDisabled={loading}
          onClick={handleSave}
        >
          <span className="flex items-center gap-2">
            {loading ? <Spinner size="sm" /> : <Save size={15} />}Save
          </span>
        </Button>
      </div>
    </div>
  );
}
