// background.js

// Listen for the extension's icon click event
chrome.action.onClicked.addListener(async (tab) => {
  // Define the URL of the page you want to open
  const targetUrl = chrome.runtime.getURL("index.html"); // Make sure this is your main HTML file

  // Query for existing tabs with the same URL
  const tabs = await chrome.tabs.query({ url: targetUrl });

  if (tabs.length > 0) {
    // If a tab with the URL already exists, focus it
    const existingTab = tabs[0];
    await chrome.tabs.update(existingTab.id, { active: true });
    // Optional: focus the window containing the tab
    await chrome.windows.update(existingTab.windowId, { focused: true });
  } else {
    // If no such tab exists, create a new one
    await chrome.tabs.create({ url: targetUrl });
  }
});