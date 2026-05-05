import UserForm from '@/components/pages/users/user-form';
import { getUserByIdAction, updateUserAction } from '@/actions/user-action';
import { getAllRole } from '@/actions/role-action';
import { APP_NAME } from '@/lib/app-config';

export default async function EditUserPage({ id }: { id: string }) {
  const data = await getData(id);

  if (!data.user) {
    return (
      <div>
        <title>{`User Not Found | ${APP_NAME}`}</title>
        <div>User not found</div>
      </div>
    );
  }

  return (
    <div>
      <title>{`${data.title} | ${APP_NAME}`}</title>
      <UserForm
        initialData={data.user}
        isEdit
        updateAction={updateUserAction}
        availableRoles={data.roles}
      />
    </div>
  );
}

const getData = async (id: string) => {
  const [userResult, rolesResult] = await Promise.all([
    getUserByIdAction(id),
    getAllRole(1, 1000),
  ]);

  return {
    title: 'Edit User',
    user: userResult.success ? userResult.data : null,
    roles: rolesResult.success ? rolesResult.data : [],
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
