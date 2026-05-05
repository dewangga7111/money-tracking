import RoleForm from '@/components/pages/role/role-form';
import { getRoleByIdAction, updateRoleAction } from '@/actions/role-action';
import { APP_NAME } from '@/lib/app-config';

export default async function EditRolePage({ id }: { id: string }) {
  const data = await getData(id);

  if (!data.role) {
    return (
      <div>
        <title>{`Role Not Found | ${APP_NAME}`}</title>
        <div>Role not found</div>
      </div>
    );
  }

  return (
    <div>
      <title>{`${data.title} | ${APP_NAME}`}</title>
      <RoleForm initialData={data.role} isEdit updateAction={updateRoleAction} />
    </div>
  );
}

const getData = async (id: string) => {
  const result = await getRoleByIdAction(id);

  return {
    title: 'Edit Role',
    role: result.success ? result.data : null,
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
