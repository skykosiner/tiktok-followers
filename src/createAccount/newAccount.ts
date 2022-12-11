import puppeteer from "puppeteer";

export class NewAccount {
    public email: string;
    public password: string = "ThisIsAGreatPassword69420!";

    constructor(public username: string) {
    }

    private async FakeEmail(): Promise<string> {
        const website = `https://mailsac.com/inbox/${this.username}@mailsac.com`;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(website);
        await page.screenshot({ path: './output.png' });

        await browser.close();

        return "";
    }

    public CreateAccount(): void {
        this.FakeEmail();

        if (this.email === "") {
            console.error("New email generated is blank")
            return;
        }
    };
};
