import puppeteer from "puppeteer";
import { ClickElementByXPath } from "./utils";

export interface Account {
    email: string;
    username: string;
    password: string;
    error?: boolean;
    errorMessage?: string;
}

export class NewAccount {
    public email: string;
    public password: string = "ThisIsAGreatPassword69420!";
    public emailWebsite: string = `https://mailsac.com/inbox/${this.username}@mailsac.com`;

    constructor(public username: string) {
    }

    private async StartAccountCreation(): Promise<void> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto("https://www.tiktok.com/signup/phone-or-email/email");

        // Enter email
        await page.type(".tiktok-11to27l-InputContainer", `${this.email}`);

        // Enter password
        await page.type(".tiktok-wv3bkt-InputContainer", `${this.password}`);

        ClickElementByXPath(page, ['//*[@id="loginContainer"]/div[1]/form/div[3]/div[1]/div[1]', '//*[@id="loginContainer"]/div[1]/form/div[3]/div[1]/div[2]/div[1]', '//*[@id="loginContainer"]/div[1]/form/div[3]/div[2]/div[1]', '//*[@id="loginContainer"]/div[1]/form/div[3]/div[2]/div[2]/div[17]', '//*[@id="loginContainer"]/div[1]/form/div[3]/div[3]/div[1]', '//*[@id="loginContainer"]/div[1]/form/div[3]/div[3]/div[2]/div[23]'])

        await page.screenshot({ path: './tiktok.png' });
        await browser.close();
    }

    private async FakeEmail(): Promise<void> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(this.emailWebsite);
        await page.screenshot({ path: './output.png' });

        await browser.close();
    };

    private async ConfirmEmail(): Promise<boolean> {
        return true;
    };

    public async CreateAccount(): Promise<Account> {
        // Start sign up process

        // Genrate new e-mail
        this.FakeEmail();

        if (this.email === "") {
            return {
                username: `${this.username}`,
                email: `${this.email}`,
                password: `${this.password}`,
                error: true,
                errorMessage: "The new email generated is blank",
            };
        };

        if (!await this.ConfirmEmail()) {
            return {
                username: `${this.username}`,
                email: `${this.email}`,
                password: `${this.password}`,
                error: true,
                errorMessage: "There was en error email from TikTok can't be confirmed",
            };
        };

        this.StartAccountCreation();

        return {
            username: `${this.username}`,
            email: `${this.email}`,
            password: `${this.password}`,
        };
    };
};
