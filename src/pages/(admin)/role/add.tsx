import RoleForm from '@/components/pages/role/role-form';
import { createRoleAction } from '@/actions/role-action';
import { APP_NAME } from '@/lib/app-config';

export default async function AddRolePage() {
  return (
    <div>
      <title>{`Add Role | ${APP_NAME}`}</title>
      <RoleForm createAction={createRoleAction} />
    </div>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
