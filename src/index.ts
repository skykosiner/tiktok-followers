import { Account, NewAccount } from "./createAccount/newAccount";
import { names } from "./names";

names.forEach((name: string) => {
    const accountClass = new NewAccount(name);

    async function account(): Promise<Account> {
        return await accountClass.CreateAccount();
    };

    account().then((info) => {
        if (info.error) console.error(info.errorMessage);
    });
});
