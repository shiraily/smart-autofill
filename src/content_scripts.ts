import browser from "webextension-polyfill";
import { fillForm, listFormControls } from "./dom/fill";

console.log("content script is loaded!");
browser.runtime.onMessage.addListener((msg, _) => {
  if (msg !== "FillSignUp") return;

  const formControls = listFormControls();
  if (!formControls.length) {
    alert("No form tag found");
    return;
  }
  fillForm(formControls);
  //return {response: "ok"};
});
