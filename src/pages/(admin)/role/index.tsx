import { RoleContent } from '@/components/pages/role/role-content';
import { getAllRole, deleteRoleAction } from '@/actions/role-action';
import { APP_NAME } from '@/lib/app-config';

export default async function RolePage() {
  const data = await getData();

  return (
    <>
      <title>{`${data.title} | ${APP_NAME}`}</title>
      <RoleContent
        initialData={data.data}
        initialPagination={data.pagination}
        deleteAction={deleteRoleAction}
        getAllAction={getAllRole}
      />
    </>
  );
}

const getData = async () => {
  const result = await getAllRole(1, 10);

  return {
    title: 'Roles',
    data: result.success ? result.data : [],
    pagination: result.pagination,
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
