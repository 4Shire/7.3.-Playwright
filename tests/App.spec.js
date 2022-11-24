const { test, expect } = require("@playwright/test");
import { email, password } from "../user.js";

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await page.getByRole("heading", { name: "Мои курсы и профессии" }).click();
  const header = page.locator("h2").first();
  await expect(header).toHaveText("Мои курсы и профессии");
});

test("Authorisation Error", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("dghf@gjdf.ru");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("fjdngjfngjld");
  await page.getByTestId("login-submit-btn").click();
  await page.getByTestId("login-error-hint").click();
  await expect(page.locator("data-testid=login-error-hint")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
});
