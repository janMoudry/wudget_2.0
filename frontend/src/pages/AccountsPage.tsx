import { bankApi } from "@api";
import { useFetch } from "@hooks";

const AccountsPage = () => {
	const { data, isLoading } = useFetch(bankApi.getAccounts);

	return (
		<>
			<div>
				<h1>Accounts Page</h1>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<pre>{JSON.stringify(data, null, 2)}</pre>
				)}
			</div>
		</>
	);
};

export default AccountsPage;
