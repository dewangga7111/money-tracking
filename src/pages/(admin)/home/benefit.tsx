import { BenefitContent } from '@/components/pages/home-settings/benefit-content';
import { getBenefitAction, upsertBenefitAction } from '@/actions/benefit-section-action';
import { APP_NAME } from '@/lib/app-config';

export default async function HomeBenefitPage() {
  const result = await getBenefitAction();
  const initialData = result.success ? result.data : null;

  return (
    <>
      <title>{`Benefit Section | ${APP_NAME}`}</title>
      <BenefitContent initialData={initialData} saveAction={upsertBenefitAction} />
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
