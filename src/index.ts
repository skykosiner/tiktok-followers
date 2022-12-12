import { Account, NewAccount } from "./createAccount/newAccount";
import { names } from "./names";

names.map((name: string) => {
    const accountClass = new NewAccount(name);

    async function account(): Promise<Account> {
        return await accountClass.CreateAccount();
    };

    account().then((info) => {
        info.error && console.error(info.errorMessage);
    });
});
