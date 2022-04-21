import browser from "webextension-polyfill";

browser.action.onClicked.addListener(function (tab: any) {
  browser.tabs.sendMessage(tab.id, "FillSignUp").catch((e) => {
    console.error("Err!", e);
  });
});
