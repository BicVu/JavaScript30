// JavaScript source code for JS30-01 Drum Kit

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // Skip this event if it's not a transform
    this.classList.remove('playing');
}

// Audio event listener
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; // Stops function if there is no key associated
    audio.currentTime = 0; //Rewind back to start. Allow for new key input while event still playing.
    audio.play();
    key.classList.add('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitioned', removeTransition));
window.addEventListener('keydown', playSound);