import browser from "webextension-polyfill";
import { fillForm, listFormControls } from "./dom/fill";

console.log("content script is loaded!");
browser.runtime.onMessage.addListener((msg, _) => {
  console.log(msg, _, "is msg");
  if (msg == "FillSignUp") {
    fillForm(listFormControls());
  }
  //return {response: "ok"};
});
