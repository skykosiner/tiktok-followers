import { Page } from "puppeteer";

// TODO: Find a way to do the capture or find the private tiktok api and sign in and login using that

export function capture(page: Page): void {
    if (!page || page == null) {
        throw new Error(`No page passed in to captcha function, or page could not be working ${page}`);
    }
};
