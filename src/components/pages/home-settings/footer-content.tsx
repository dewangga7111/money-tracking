'use client';

import { useState } from 'react';
import { Button, Card, Spinner } from '@heroui/react';
import { Save, Plus, Trash2 } from 'lucide-react';
import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { actionButtons, button, form } from '@/utils/primitives';
import type { FooterData, FooterSocial, FooterProductLink } from '@/types/sections/footer-section';
import type { ActionResponse } from '@/types/response';

type Props = {
  initialData: FooterData | null;
  saveAction: (data: FooterData) => Promise<ActionResponse>;
};

export function FooterContent({ initialData, saveAction }: Props) {
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState({
    headline: initialData?.contact.headline ?? '',
    subheadline: initialData?.contact.subheadline ?? '',
  });

  const [brand, setBrand] = useState({
    name: initialData?.brand.name ?? '',
    sub: initialData?.brand.sub ?? '',
  });

  const [info, setInfo] = useState({
    address: initialData?.address ?? '',
    phone: initialData?.phone ?? '',
    email: initialData?.email ?? '',
    copyright: initialData?.copyright ?? '',
    youtubeHandle: initialData?.youtubeHandle ?? '',
    instagramHandle: initialData?.instagramHandle ?? '',
  });

  const [socials, setSocials] = useState<FooterSocial[]>(initialData?.socials ?? []);
  const [products, setProducts] = useState<FooterProductLink[]>(initialData?.products ?? []);

  const handleSave = () => {
    confirm({
      message: 'Simpan perubahan Footer section?',
      onConfirm: doSave,
    });
  };

  const doSave = async () => {
    setLoading(true);
    try {
      const data: FooterData = { contact, brand, ...info, socials, products };
      const result = await saveAction(data);
      if (result.success) {
        showSuccessToast(result.message || 'Footer section saved');
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
      {/* Contact Band */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Contact Band</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <AppTextInput
              name="contact_headline"
              label="Headline"
              value={contact.headline}
              onChange={(val) => setContact((p) => ({ ...p, headline: val }))}
            />
            <AppTextInput
              name="contact_subheadline"
              label="Subheadline"
              value={contact.subheadline}
              onChange={(val) => setContact((p) => ({ ...p, subheadline: val }))}
            />
          </div>
        </Card.Content>
      </Card>

      {/* Brand */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Brand</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <AppTextInput
              name="brand_name"
              label="Nama Brand"
              value={brand.name}
              onChange={(val) => setBrand((p) => ({ ...p, name: val }))}
            />
            <AppTextInput
              name="brand_sub"
              label="Sub Brand"
              value={brand.sub}
              onChange={(val) => setBrand((p) => ({ ...p, sub: val }))}
            />
          </div>
        </Card.Content>
      </Card>

      {/* Info */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Kontak & Info</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <AppTextarea
              name="address"
              label="Alamat"
              value={info.address}
              onChange={(val) => setInfo((p) => ({ ...p, address: val }))}
              className="lg:col-span-2"
            />
            <AppTextInput
              name="phone"
              label="No. Telepon"
              value={info.phone}
              onChange={(val) => setInfo((p) => ({ ...p, phone: val }))}
            />
            <AppTextInput
              name="email"
              label="Email"
              value={info.email}
              onChange={(val) => setInfo((p) => ({ ...p, email: val }))}
            />
          </div>
        </Card.Content>
      </Card>

      {/* Social Links */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Social Media</h3>
          <div className="flex flex-col gap-3">
            {socials.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <AppTextInput
                  name={`social_${i}_label`}
                  label="Label"
                  value={s.label}
                  onChange={(val) => setSocials((prev) => prev.map((x, idx) => idx === i ? { ...x, label: val } : x))}
                  className="w-24 shrink-0"
                />
                <AppTextInput
                  name={`social_${i}_href`}
                  label="URL"
                  value={s.href}
                  onChange={(val) => setSocials((prev) => prev.map((x, idx) => idx === i ? { ...x, href: val } : x))}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => setSocials((prev) => prev.filter((_, idx) => idx !== i))}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors mt-5 shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSocials((prev) => [...prev, { label: '', href: '' }])}
              className="flex items-center gap-2 text-sm text-primary hover:underline w-fit"
            >
              <Plus size={15} /> Tambah social
            </button>
          </div>
        </Card.Content>
      </Card>

      {/* Product Links */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Link Produk</h3>
          <div className="flex flex-col gap-3">
            {products.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <AppTextInput
                  name={`product_${i}_label`}
                  label="Label"
                  value={p.label}
                  onChange={(val) => setProducts((prev) => prev.map((x, idx) => idx === i ? { ...x, label: val } : x))}
                  className="flex-1"
                />
                <AppTextInput
                  name={`product_${i}_href`}
                  label="URL"
                  value={p.href}
                  onChange={(val) => setProducts((prev) => prev.map((x, idx) => idx === i ? { ...x, href: val } : x))}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => setProducts((prev) => prev.filter((_, idx) => idx !== i))}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors mt-5 shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setProducts((prev) => [...prev, { label: '', href: '' }])}
              className="flex items-center gap-2 text-sm text-primary hover:underline w-fit"
            >
              <Plus size={15} /> Tambah produk
            </button>
          </div>
        </Card.Content>
      </Card>

      {/* Bottom Bar */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Bottom Bar</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <AppTextInput
              name="copyright"
              label="Copyright"
              value={info.copyright}
              onChange={(val) => setInfo((p) => ({ ...p, copyright: val }))}
              className="lg:col-span-2"
            />
            <AppTextInput
              name="youtubeHandle"
              label="YouTube Handle"
              value={info.youtubeHandle}
              onChange={(val) => setInfo((p) => ({ ...p, youtubeHandle: val }))}
            />
            <AppTextInput
              name="instagramHandle"
              label="Instagram Handle"
              value={info.instagramHandle}
              onChange={(val) => setInfo((p) => ({ ...p, instagramHandle: val }))}
            />
          </div>
        </Card.Content>
      </Card>

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
