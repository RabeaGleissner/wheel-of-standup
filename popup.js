const copyToClipboard = (message) => {
  if (!navigator.clipboard) {
    console.log('Your browser does not support the clipboard API.')
    return;
  }

  navigator.clipboard.writeText(message).then(() => {
    console.log('Copied message to clipboard!');
  }, (err) => {
    console.error('Error copying to your clipboard: ', err);
  });
}

copyNames.addEventListener('click', async () => {
  const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(currentTab.id, {'message': 'COPY_NAMES'});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.status === 'error') {
      copyToClipboard('Sorry! Something went wrong.')
      return;
    }

    if(request.message === 'PARTICIPANT_NAMES') {
      copyToClipboard(request.names)
    };
  }
);

