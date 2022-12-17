import puppeteer, { Page } from "puppeteer";
import { Info } from "../accountInfo";
import { Account } from "../createAccount/newAccount";

export async function Login(account: Account): Promise<void> {
    console.log("Account", account);

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.tiktok.com/login/phone-or-email/email");

    await page.type(".tiktok-11to27l-InputContainer", `${account.email}`);
    await page.type(".tiktok-wv3bkt-InputContainer", `${account.password}`)

    await page.click(".tiktok-cjigsp-Button-StyledButton");

    setTimeout(async () => await Follow(page), 10000);

    setTimeout(async () => await browser.close(), 10000);
};

async function Follow(page: Page): Promise<boolean> {
    await page.goto(`https://www.tiktok.com/${Info.username}`);
    await page.click(".tiktok-1uotcs6-Button-StyledFollowButton");

    return true;
};
