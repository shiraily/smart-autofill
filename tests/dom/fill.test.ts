import { fillForm } from "../../src/dom/fill";
import fs from "fs";

test("Fill form simply", () => {
  document.body.innerHTML = fs
    .readFileSync("tests/private/data/ana.html")
    .toString();

  const $ = document.querySelector.bind(document);
  fillForm();
  expect(($("#w2lastName") as HTMLInputElement).value).toEqual("last name");
  expect(($("#w2firstNameKana") as HTMLInputElement).value).toEqual(
    "first name"
  );
  expect(($("#w2postNoFirst1") as HTMLInputElement).value).toEqual(
    "postal code 1"
  );
  expect(($("#w2postNoFirst2") as HTMLInputElement).value).toEqual(
    "postal code 2"
  );
});
