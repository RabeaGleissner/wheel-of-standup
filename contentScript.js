// Fisher-Yates shuffle algorithm copied from https://stackoverflow.com/a/6274381

const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const copyParticipantNames = () => {
  const participantsElement = document.querySelector('[aria-label="Participants"]');
  if (participantsElement) {
    const participants = participantsElement.children;
    const participantNames = Array.prototype.map.call(participants, participant => participant.textContent);
    const ownName = participantNames.shift();
    const ownNameWithoutAdditionalInfo = ownName.split('(')[0];
    const participantNamesWithoutPresentation = participantNames.filter(name => !name.toLowerCase().includes('presentation'));
    const randomisedParticipants = shuffle(participantNamesWithoutPresentation);
    const participantsWithLineBreaks = [...randomisedParticipants, ownNameWithoutAdditionalInfo].join('\n');
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
