import { bankApi } from "@api";
import { MainLayout } from "@components/layouts";
import { useFetch } from "@hooks";

const AccountsPage = () => {
  const { data, isLoading } = useFetch(bankApi.getAccounts);

  return (
    <MainLayout>
      <div>
        <h1>Accounts Page</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </MainLayout>
  );
};

export default AccountsPage;
