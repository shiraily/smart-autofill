import browser from "webextension-polyfill";

// FIXME: use try as work around to debug under Chrome 93
try {
	console.log("background is loaded!");

	browser.action.onClicked.addListener(function(tab: any) {
		browser.tabs.sendMessage(tab.id, "FillSignUp").catch(e => {
			console.error("Err!", e);
		});
  });
} catch(e) {
	console.log("err", e);
}
