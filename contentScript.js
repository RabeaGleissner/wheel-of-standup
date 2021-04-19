const copyParticipantNames = () => {
  const participantsElement = document.querySelector('[aria-label="Participants"]');
  if (participantsElement) {
    const participants = participantsElement.children;
    const participantNames = Array.prototype.map.call(participants, participant => participant.textContent);
    const ownName = participantNames.shift();
    const ownNameWithoutAdditionalInfo = ownName.split('(')[0];
    const participantsWithLineBreaks = Array.prototype.join.call([...participantNames, ownNameWithoutAdditionalInfo], ('\n'))
    return participantsWithLineBreaks;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'COPY_NAMES') {
    const names = copyParticipantNames();
    console.log('names', names);
    const message = names ? { message: 'PARTICIPANT_NAMES', names, status: 'ok' } : { status: 'error' };
    chrome.runtime.sendMessage(message);
  }
});
