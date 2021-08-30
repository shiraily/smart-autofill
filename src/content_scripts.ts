import browser from "webextension-polyfill";

console.log("content script is loaded!");
browser.runtime.onMessage.addListener((msg, _ ) => {
  console.log(msg, _, "is msg");
	if (msg == "FillSignUp") {
		fillForm();
	}
  //return {response: "ok"};
})

const $ = document.querySelectorAll.bind(document);

function fillForm() {
  console.log("TODO fill form");
  $("form input[type=text]").forEach((element: any) => {
    element.value = "test";
  });
}
