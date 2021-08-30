import { fillForm } from "../../src/dom/fill";
import fs from "fs";

test("Fill form simply", () => {
  document.body.innerHTML = fs.readFileSync("tests/private/data/ana/index.html").toString();

  const $ = document.querySelector.bind(document);
  fillForm();
  expect(($("#w2phoneNoFirst") as HTMLInputElement).value).toEqual("test");
})