import { Page } from "puppeteer";

export function ClickElementByXPath(page: Page, xPaths: string[]): void {
    xPaths.map(async (path: string) => {
        const button = await page.$x(`${path}`);
        //@ts-ignore
        await button[0].click();
    })
}
