import { Account, NewAccount } from "./createAccount/newAccount";
import { Login } from "./followAccount/followAccount";
import { names } from "./names";
import { isEmpty } from "./utils";

names.map((name: string) => {
    let accountInfo: Account;

    new NewAccount(name).CreateAccount().then((info: Account) => {
        if (info.error) {
            throw new Error(info.errorMessage);
        };

        accountInfo = info;
    });

    // Wait till account is created to login and follow
    setTimeout(() => {
        if (isEmpty(accountInfo)) {
            throw new Error("Account info is blank");
        };

        console.log("Acocunt info", accountInfo);

        Login({
            username: accountInfo.username,
            email: accountInfo.email,
            password: accountInfo.password
        });
    }, 10000);
});
