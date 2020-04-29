/*
* This function alows user to switch between player and list dom.
*/
function navigateFunctionality() {
    playerDomElem.classList.toggle('hidden');
    listDomElem.classList.toggle('hidden');
};
/*
* This function executes when clicked on the seekbar.
* @param e is of type object. It passes the event.
*/
function seekEventClickFunctionality(e) {
    if (audio.duration) {
        interactionStartCalculation(e);
        interactionEndCalculation();
    };
};
/*
* This function executes when mouse is pressed down on the seekbar.
*/
function seekEventDownFunctionality() {
    audio.duration ? modelObj.draggable = true : null;
};
/*
* This function executes the mouse is dragged.
*/
function seekEventMoveFunctionality(e) {
    if (modelObj.draggable) {
        modelObj.seekable = true;
        interactionStartCalculation(e);
    };
};
/*
* This function calculates based on the interaction.
*/
function interactionStartCalculation(e) {
    clearInterval(modelObj.trackInterval);
    clearInterval(modelObj.currTimeInterval);

    let sliderJumpTemp = ((Math.abs(modelObj.dimensions.dotX - modelObj.dimensions.lineInitialValue) / (modelObj.dimensions.lineFinalValue - modelObj.dimensions.lineInitialValue)) * 100)

    let time = (sliderJumpTemp * audio.duration) / 100;
    currentPlayTimeDomElem.children[0].innerHTML = calculateTime(time);

    if (e.x <= modelObj.dimensions.lineFinalValue) {
        modelObj.dimensions.dotX = (e.x - (dotDomElem.getBoundingClientRect().width / 2));
    } else {
        modelObj.dimensions.dotX = modelObj.dimensions.lineFinalValue;
    };
};
/*
* This function executes when the mouse interaction is ended.
*/
function seekEventEndFunctionality() {
    modelObj.draggable = false;
    if (modelObj.seekable) {
        if (audio.duration)
            interactionEndCalculation();
    };
};
/*
* This function calculates when the seek event is ended.
*/
function interactionEndCalculation() {
    let seekto = (((Math.abs(modelObj.dimensions.dotX - modelObj.dimensions.lineInitialValue) / (modelObj.dimensions.lineFinalValue - modelObj.dimensions.lineInitialValue)) * 100) * audio.duration) / 100;

    audio.currentTime = seekto;
    modelObj.seekable = false;
    modelObj.sliderJumpInPercent = ((Math.abs(modelObj.dimensions.dotX - modelObj.dimensions.lineInitialValue) / (modelObj.dimensions.lineFinalValue - modelObj.dimensions.lineInitialValue)) * 100)

    if (playerPlayBtnDomElem.classList.contains('hidden')) {
        trackDom();
        timersDom();
    };
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
        modelObj.sliderJumpInPercent += .25;
        let value = (modelObj.sliderJumpInPercent * (modelObj.dimensions.lineFinalValue - modelObj.dimensions.lineInitialValue) / 100) + modelObj.dimensions.lineInitialValue;
        modelObj.dimensions.dotX = value;
    }, (audio.duration * 10) / 4); // ((audio.duration / 100) * 1000) futher dividing it by 4 to increse the timeout.
};
/*
* This function used to play the song.
*/
function playSongFunctionality() {
    playerPlayBtnDomElem.classList.add('hidden');
    playerPauseBtnDomElem.classList.remove('hidden');

    if (!modelObj.isSongRunning) {
        resetTimersSliders();
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = `/images/favicons/${songsList[modelObj.currentPlayingSongNo].favIcon}.ico`;
        document.getElementsByTagName('head')[0].appendChild(link);
        audio.src = songsList[modelObj.currentPlayingSongNo].localsrc;

        audio.addEventListener("loadeddata", songLoaded);
        audio.addEventListener("ended", songEnded);
        audio.addEventListener("error", songPlaybackError);
    } else {
        audio.play();
        timersDom();
        trackDom();
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
    modelObj.dimensions.dotX = modelObj.dimensions.lineInitialValue;
    durationTimeDomElem.classList.add('hidden');
    currentPlayTimeDomElem.children[0].innerHTML = '0:00';
};
/*
* This function is executed when the song has been loaded.
*/
function songLoaded() {
    modelObj.isSongRunning = true;
    timersDom();
    trackDom();
    audio.play();
};
/*
* This function is executed when the current playing song has ended.
*/
function songEnded() {
    resetTimersSliders();
    audio.removeEventListener("loadeddata", songLoaded);
    audio.removeEventListener("ended", songEnded);
    modelObj.draggable = false;
    modelObj.seekable = false;
    modelObj.isSongRunning = false;
    nextSongFunctionality();
};
/*
* This function executes when there is an error.
*/
function songPlaybackError() {
    clearInterval(modelObj.trackInterval);
    clearInterval(modelObj.currTimeInterval);
    alert('Please check your internet Connection');
};
/*
* This setInterval checks for any changes made in the currentSong.
*/
setInterval(() => {
    if (modelObj.currentSong !== modelObj.currentPlayingSongNo) {
        renderDOM();
        modelObj.currentSong = modelObj.currentPlayingSongNo;
    };

    audio.duration ? seekEventDomElem.classList.add('hoverPointer') : seekEventDomElem.classList.remove('hoverPointer');

    var value = (Math.abs(modelObj.dimensions.dotX - modelObj.dimensions.lineInitialValue) / (modelObj.dimensions.lineFinalValue - modelObj.dimensions.lineInitialValue)) * 100;
    dotDomElem.style.left = `${value}%`;
    progressLineDomElem.style.width = `${value}%`;
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