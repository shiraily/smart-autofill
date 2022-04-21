import browser from "webextension-polyfill";

try {
  console.log("background is loaded!");

  browser.action.onClicked.addListener(function (tab: any) {
    browser.tabs.sendMessage(tab.id, "FillSignUp").catch((e) => {
      console.error("Err!", e);
    });
  });
} catch (e) {
  console.log("err", e);
}
