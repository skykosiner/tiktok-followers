import puppeteer from "puppeteer";
import { Login } from "src/followAccount/followAccount";
import { names } from "../names";

export interface Account {
    email: string;
    username: string;
    password: string;
    error?: boolean;
    errorMessage?: string;
}

export class NewAccount {
    private username: string = "";
    private email: string = `${this.username}@mailsac.com`;
    private password: string = "BelIsASlag69420!";
    private emailWebsite: string = `https://mailsac.com/inbox/${this.username}@mailsac.com`;

    constructor() {
        names.forEach((name: string) => {
            let account: Account = {
                username: "",
                email: "",
                password: "",
            };

            this.CreateAccount(name).then((info: Account) => {
                if (info.error) {
                    throw new Error(info.errorMessage);
                }

                account = info;

                return info
            });

            Login({
                username: account.username,
                email: account.email,
                password: account.password
            });
        });
    };

    private async StartAccountCreation(): Promise<void> {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto("https://www.tiktok.com/signup/phone-or-email/email");

        // Enter email
        await page.type(".tiktok-11to27l-InputContainer", `${this.email}`);

        // Enter password
        await page.type(".tiktok-wv3bkt-InputContainer", `${this.password}`);

        const xPaths = ['//*[@id="loginContainer"]/div[1]/form/div[3]/div[1]/div[1]', '//*[@id="loginContainer"]/div[1]/form/div[3]/div[1]/div[2]/div[1]', '//*[@id="loginContainer"]/div[1]/form/div[3]/div[2]/div[1]', '//*[@id="loginContainer"]/div[1]/form/div[3]/div[2]/div[2]/div[17]', '//*[@id="loginContainer"]/div[1]/form/div[3]/div[3]/div[1]', '//*[@id="loginContainer"]/div[1]/form/div[3]/div[3]/div[2]/div[23]'];

        for (let i = 0; i < xPaths.length; i++) {
            const button = await page.$x(xPaths[i]);
            //@ts-ignore
            await button[0].click();
        };

        // Send login code
        const loginCode = await page.$x('//*[@id="loginContainer"]/div[1]/form/div[8]/div/button');
        //@ts-ignore
        await loginCode[0].click();

        await page.screenshot({ path: './tiktok.png' });

        setTimeout(async () => await browser.close(), 10000)
    }

    private async ConfirmEmail(): Promise<boolean> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(this.emailWebsite);
        await page.screenshot({ path: './output.png' });


        await browser.close();

        return true;
    };

    private async CreateAccount(username: string): Promise<Account> {
        this.username = username;
        // Start sign up process
        if (this.email === "") {
            return {
                username: `${this.username}`,
                email: `${this.email}`,
                password: `${this.password}`,
                error: true,
                errorMessage: "No email",
            };
        };

        this.StartAccountCreation();

        if (!await this.ConfirmEmail()) {
            return {
                username: `${this.username}`,
                email: `${this.email}`,
                password: `${this.password}`,
                error: true,
                errorMessage: "There was en error email from TikTok can't be confirmed",
            };
        };

        return {
            username: `${this.username}`,
            email: `${this.email}`,
            password: `${this.password}`,
        };
    };
};
