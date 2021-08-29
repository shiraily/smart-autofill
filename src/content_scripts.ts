import browser from "webextension-polyfill";

console.log("content script is loaded!");
browser.runtime.onMessage.addListener((msg, _ ) => {
  console.log(msg, _, "is msg");
	if (msg == "FillSignUp") {
		fillForm();
	}
  //return {response: "ok"};
})

function fillForm() {
  console.log("TODO fill form");
}
