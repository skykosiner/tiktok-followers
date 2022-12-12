import { Account, NewAccount } from "./createAccount/newAccount";

const accountClass = new NewAccount("belisaslag")

async function account(): Promise<Account> {
    return await accountClass.CreateAccount();
}

account().then((info) => {
    if (info.error) {
        console.error(info.errorMessage)
    };
});
