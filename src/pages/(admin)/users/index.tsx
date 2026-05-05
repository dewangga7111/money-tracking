import { UsersContent } from '@/components/pages/users/users-content';
import { getAllUser, deleteUserAction } from '@/actions/user-action';
import { APP_NAME } from '@/lib/app-config';

export default async function UsersPage() {
  const data = await getData();

  return (
    <div>
      <title>{`${data.title} | ${APP_NAME}`}</title>
      <UsersContent
        initialData={data.data}
        initialPagination={data.pagination}
        deleteAction={deleteUserAction}
        getAllAction={getAllUser}
      />
    </div>
  );
}

const getData = async () => {
  const result = await getAllUser(1, 10);

  return {
    title: 'Users',
    data: result.success ? result.data : [],
    pagination: result.pagination,
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
