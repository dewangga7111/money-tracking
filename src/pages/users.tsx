import { UsersContent } from "@/components/pages/users/users-content";

export default async function UsersPage() {
  const data = await getData();

  return (
    <div>
      <title>{data.title}</title>
      <UsersContent />
    </div>
  );
}

const getData = async () => {
  const data = {
    title: 'Users',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
