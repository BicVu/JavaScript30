/* Get elements */
const player = document.querySelector('.player'); // Select class with .
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build functions */
// function togglePlay() {
//     if(video.paused) {
//         video.play();
//     }
//     else {
//         video.pause();
//     }
// }

// Alternate ways to write function
// function togglePlay() {
//     const method = video.paused ? 'play' : 'pause';
//     video[method]();
// }

function togglePlay() {
    const method =
    video[video.paused ? 'play' : 'pause']();
};

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log('Update button');
    toggle.textContent = icon;
}
 
function skip() {
    console.log(this.dataset.skip); // Prints what the function is doing
    video.currentTime += parseFloat(this.dataset.skip); // Use parseFloat to convert a string
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log([this.name, this.value]); // Prints value when slider changes
}

function handleProgress() {
    // Update progress bar by matching percent of bar and video duration
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// Update video by clicking on progress bar using Scrub
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // How far along the bar is the click?
    video.currentTime = scrubTime;
    // console.log(e);
}

/* Hook event listeners */
video.addEventListener('click', togglePlay); // Play and pause upon click
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Update progress bar when time changes (using something like skip button)
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub); // Update video to where the click is on progress bar
progress.addEventListener('mousedown', (e) => mousedown && scrub(e)); // If event mousedown is true then scrub
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
