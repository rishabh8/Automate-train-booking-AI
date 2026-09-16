import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("booking assistant does not collect prohibited IRCTC secrets", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /We never collect passwords, OTPs, CAPTCHA answers, or wallet PINs/);
  assert.doesNotMatch(html, /name="(?:password|otp|captcha|walletPin)"/i);
});

test("journey form contains required preparation fields", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  for (const field of ["date", "train", "from", "to", "class", "quota"]) assert.match(html, new RegExp(`name="${field}"`));
});
