/*
* This function alows user to switch between player and list dom.
*/
function navigateFunctionality() {
    playerDomElem.classList.toggle('hidden');
    listDomElem.classList.toggle('hidden');
};
/*
* This function is used to process the action when clicked on the list song cards.
*/
function cardClickFunctinality() {
    modelObj.currentPlayingSongNo = Number(this.getAttribute("datacardno"));
    if (modelObj.currentSong !== modelObj.currentPlayingSongNo) {
        modelObj.isSongRunning = false;
        playSongFunctionality();
    } else if (modelObj.currentSong === modelObj.currentPlayingSongNo && modelObj.isSameSongPlayed) {
        pauseBtnFunctionality();
        modelObj.isSameSongPlayed = false;
    } else if ((modelObj.currentSong == modelObj.currentPlayingSongNo) && !modelObj.isSameSongPlayed) {
        playSongFunctionality();
        modelObj.isSameSongPlayed = true;
    };
};
/*
* This function is used to play next song.
*/
function nextSongFunctionality() {
    if ((songsList.length - 1) !== modelObj.currentPlayingSongNo)
        modelObj.currentPlayingSongNo++;
    else
        modelObj.currentPlayingSongNo = 0;
    modelObj.isSongRunning = false;
    playSongFunctionality();
};
/*
* This function updates the DOM element of duration and current timersDom.
*/
function timersDom() {
    durationTimeDomElem.classList.remove('hidden');
    durationTimeDomElem.children[0].innerHTML = calculateTime(audio.duration);
    modelObj.currTimeInterval = setInterval(function () {
        currentPlayTimeDomElem.children[0].innerHTML = calculateTime(audio.currentTime);
    }, 10);
};
/*
* This function returns time in mins:seconds format.
* @param _time is of type number.
*/
function calculateTime(_time) {
    let mins = 0;
    let seconds = 0;
    mins = parseInt(_time / 60, 10);
    seconds = ('0' + (parseInt(_time) % 60)).slice(-2);
    return `${mins}:${seconds}`;
};
/*
* This function updates the DOM element of seekbar and dot.
*/
function trackDom() {
    modelObj.trackInterval = setInterval(() => {
        modelObj.sliderJumpInPercent += .25
        dotDomElem.style.left = `${modelObj.sliderJumpInPercent}%`;
        progressLineDomElem.style.width = `${modelObj.sliderJumpInPercent}%`;
    }, (audio.duration * 2.5)); // (((audio.duration / 100) * 1000) / 4)
};
/*
* This function used to play the song.
*/
function playSongFunctionality() {
    playerPlayBtnDomElem.classList.add('hidden');
    playerPauseBtnDomElem.classList.remove('hidden');

    if (!modelObj.isSongRunning) {
        resetTimersSliders();
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = `/images/favicons/${songsList[modelObj.currentPlayingSongNo].favIcon}.ico`;
        document.getElementsByTagName('head')[0].appendChild(link);
        audio.src = songsList[modelObj.currentPlayingSongNo].localsrc;
        audio.addEventListener("loadeddata", songLoaded);
        audio.addEventListener("ended", songEnded);
    } else {
        audio.play();
        timersDom(audio);
        trackDom(audio);
    };
    modelObj.isSameSongPlayed = true;
    togglelistPlayPauseBtn();
};
/*
* This function used to pause the song.
*/
function pauseBtnFunctionality() {
    clearInterval(modelObj.trackInterval);
    clearInterval(modelObj.currTimeInterval);
    playerPlayBtnDomElem.classList.remove('hidden');
    playerPauseBtnDomElem.classList.add('hidden');
    audio.pause();
    modelObj.isSameSongPlayed = false;
    togglelistPlayPauseBtn();
};
/*
* This function used to play the previous song.
*/
function previousSongFunctionality() {
    resetTimersSliders();
    modelObj.isSongRunning = false;
    if (audio.currentTime <= 3) {
        if (modelObj.currentPlayingSongNo !== 0)
            modelObj.currentPlayingSongNo--;
        else
            modelObj.currentPlayingSongNo = (songsList.length - 1);
    };
    playSongFunctionality();
}
/*
* This function used to reset the timers ans sliders.
*/
function resetTimersSliders() {
    clearInterval(modelObj.trackInterval);
    clearInterval(modelObj.currTimeInterval);
    modelObj.sliderJumpInPercent = 0;
    // remove transistion class
    dotDomElem.style.left = '0%';
    progressLineDomElem.style.width = '0%';
    // add transistion class
    durationTimeDomElem.classList.add('hidden');
    currentPlayTimeDomElem.children[0].innerHTML = '0:00';
};
/*
* This function is executed when the song has been loaded.
*/
function songLoaded() {
    modelObj.isSongRunning = true;
    timersDom(audio);
    trackDom(audio);
    audio.play();
};
/*
* This function is executed when the current playing song has ended.
*/
function songEnded() {
    resetTimersSliders();
    audio.removeEventListener("loadeddata", songLoaded);
    audio.removeEventListener("ended", songEnded);
    modelObj.isSongRunning = false;
    clearInterval(modelObj.trackInterval);
    clearInterval(modelObj.currTimeInterval);
    nextSongFunctionality();
};
/*
* This setInterval checks for any changes made in the currentSong.
*/
setInterval(() => {
    if (modelObj.currentSong !== modelObj.currentPlayingSongNo) {
        renderDOM();
        modelObj.currentSong = modelObj.currentPlayingSongNo;
    };
}, 10);
/*
* This funciton is used to render the DOM based on selction of the song.
*/
function renderDOM() {
    modelObj.isSongRunning = false;

    modelObj.previousCard = songListTag.children[modelObj.previousSelectedCardNo];
    modelObj.previousCard.classList.remove('selected');
    let playBtn = modelObj.previousCard.children[1].children[0];
    let pauseBtn = modelObj.previousCard.children[1].children[1];
    playBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');

    songCardNodeDomElem[modelObj.currentPlayingSongNo].classList.add('selected');
    songTitleDomElem.children[0].innerHTML = songsList[modelObj.currentPlayingSongNo].title;
    artistNameDomElem.children[0].innerHTML = songsList[modelObj.currentPlayingSongNo].artistName;
    modelObj.thumbnailSrc = `images/${songsList[modelObj.currentPlayingSongNo].thumbnail}`;
    listThumbnailDomElem.children[0].src = playerThumbnailDomElem.children[0].src = modelObj.thumbnailSrc;

    modelObj.previousSelectedCardNo = modelObj.currentPlayingSongNo;
};
/*
* This funciton is used to toggle play pause button on the list based on interaction.
*/
function togglelistPlayPauseBtn() {
    let playBtn = songCardNodeDomElem[modelObj.currentPlayingSongNo].children[1].children[0];
    let pauseBtn = songCardNodeDomElem[modelObj.currentPlayingSongNo].children[1].children[1];
    if (playerPlayBtnDomElem.classList.contains('hidden')) {
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    } else {
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
    };
};