const CHANGE_STATUS_MESSAGE = 'CHANGE_STATUS';
const ON_TEXT = 'On';
const OFF_TEXT = 'Off';

const turnOn = async () => {
  chrome.action.setBadgeBackgroundColor({ color: '#90EE90' });
  chrome.action.setBadgeText({
    text: ON_TEXT,
  });
};

const turnOff = async () => {
  chrome.action.setBadgeBackgroundColor({ color: '#FF7F7F' });
  chrome.action.setBadgeText({
    text: OFF_TEXT,
  });
};

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === CHANGE_STATUS_MESSAGE) {
    if (message.status) {
      await turnOn();
    } else {
      await turnOff();
    }
  }
});

chrome.action.onClicked.addListener(async () => {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const badgeText = await chrome.action.getBadgeText({});
  if (badgeText === ON_TEXT) {
    await turnOff();
  } else {
    await turnOn();
  }

  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (
      tab.url &&
      !tab.url.startsWith('chrome://') &&
      !tab.url.startsWith('chrome-extension://')
    ) {
      try {
        await chrome.tabs.sendMessage(tab.id, {
          type: 'CHANGE_STATUS',
          status: badgeText !== ON_TEXT,
        });
      } catch (error) {
        console.error('Error sending message to content script:', error);
      }
    }
  }
});
