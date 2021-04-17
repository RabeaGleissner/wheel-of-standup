copyNames.addEventListener('click', async () => {
  const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: currentTab.id },
    function: copyParticipantNames,
  });
});

function copyParticipantNames() {
  const participants = document.querySelector('[aria-label="Participants"]').children;
  const participantNames = Array.prototype.map.call(participants, participant => participant.textContent);
  const ownName = participantNames.shift();
  const ownNameWithoutAdditionalInfo = ownName.split('(')[0];
  const participantsWithLineBreaks = Array.prototype.join.call([...participantNames, ownNameWithoutAdditionalInfo], ('\n'))

  console.log(participantsWithLineBreaks);
}
