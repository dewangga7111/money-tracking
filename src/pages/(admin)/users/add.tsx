import UserForm from '@/components/pages/users/user-form';
import { createUserAction } from '@/actions/user-action';
import { getAllRole } from '@/actions/role-action';
import { APP_NAME } from '@/lib/app-config';

export default async function AddUserPage() {
  const data = await getData();

  return (
    <div>
      <title>{`Add User | ${APP_NAME}`}</title>
      <UserForm createAction={createUserAction} availableRoles={data.roles} />
    </div>
  );
}

const getData = async () => {
  const rolesResult = await getAllRole(1, 1000);

  return {
    roles: rolesResult.success ? rolesResult.data : [],
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
