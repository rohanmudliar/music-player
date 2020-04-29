// ////////////////////////////////////////////////////////////////////////////////////
// Developed By : Rohan Mudliar
// Name : Music Player
// Created on : 26/04/2020
// ////////////////////////////////////////////////////////////////////////////////////
window.onload = () => init();
/*
* Initializing the domVariables.
*/
const listDomElem = document.getElementById('list'),
    playerDomElem = document.getElementById('player'),
    backBtnDomElem = document.getElementById('list__container-backBtn'),
    menuBtnDomElem = document.getElementById('player__container-menuBtnDiv'),
    listThumbnailDomElem = document.getElementById('list__container-currentPlayingThumbnail'),
    playerThumbnailDomElem = document.getElementById('playing__container-currentPlayingThumbnail'),
    songTitleDomElem = document.getElementById('playing__container-songTitle'),
    artistNameDomElem = document.getElementById('playing__container-ArtistName'),
    currentPlayTimeDomElem = document.getElementById('playing__container-currentPlayingTime'),
    durationTimeDomElem = document.getElementById('playing__container-durationTime'),
    sliderLineDomElem = document.getElementById('slider__normalLine'),
    seekEventDomElem = document.getElementById('playing__continer-transparentLine'),
    dotDomElem = document.getElementById('slider__dot'),
    progressLineDomElem = document.getElementById('slider__gradLine'),
    playerPreviousBtnDomElem = document.getElementById('playing__container-previousBtn'),
    playerPlayBtnDomElem = document.getElementById('playing__container-playBtn'),
    playerPauseBtnDomElem = document.getElementById('playing__container-pauseBtn'),
    playerNextBtnDomElem = document.getElementById('playing__container-nextBtn'),
    songCardNodeDomElem = document.querySelectorAll('#list__container-songCard');
/*
* Initializing the public Variables.
*/
const modelObj = {
    previousSelectedCardNo: 0,
    previousCard: null,
    currentCardSelected: null,
    thumbnailSrc: null,
    trackInterval: null,
    currTimeInterval: null,
    currentPlayingSongNo: 0,
    isSameSongPlayed: false,
    isSongRunning: false,
    sliderJumpInPercent: 0,
    currentSongNo: 0,
    draggable: false,
    seekable: false,
    dimensions: {
        dotX: dotDomElem.getBoundingClientRect().x,
        lineInitialValue: sliderLineDomElem.getBoundingClientRect().x - (dotDomElem.getBoundingClientRect().width / 2),
        lineFinalValue: ((sliderLineDomElem.getBoundingClientRect().x + sliderLineDomElem.getBoundingClientRect().width) - (dotDomElem.getBoundingClientRect().width / 2)),
    },
};
/*
* Creating audio instance.
*/
const audio = new Audio();
/*
* Adding Event Listeneres.
*/
function init() {
    backBtnDomElem.addEventListener('click', navigateFunctionality);
    listThumbnailDomElem.addEventListener('click', navigateFunctionality);
    menuBtnDomElem.addEventListener('click', navigateFunctionality);
    playerPlayBtnDomElem.addEventListener('click', playSongFunctionality);
    playerPauseBtnDomElem.addEventListener('click', pauseBtnFunctionality);
    playerPreviousBtnDomElem.addEventListener('click', previousSongFunctionality);
    playerNextBtnDomElem.addEventListener('click', songEnded);
    seekEventDomElem.addEventListener('click', seekEventClickFunctionality);
    if (isMobileDevice()) {
        seekEventDomElem.addEventListener('touchstart', seekEventDownFunctionality);
        seekEventDomElem.addEventListener('touchmove', seekEventMoveFunctionality);
        seekEventDomElem.addEventListener('touchcancel', seekEventEndFunctionality);
        seekEventDomElem.addEventListener('touchend', seekEventEndFunctionality);
    } else {
        seekEventDomElem.addEventListener('mousedown', seekEventDownFunctionality);
        seekEventDomElem.addEventListener('mousemove', seekEventMoveFunctionality);
        seekEventDomElem.addEventListener('mouseleave', seekEventEndFunctionality);
        seekEventDomElem.addEventListener('mouseup', seekEventEndFunctionality);
    }
    songCardNodeDomElem.forEach(card => {
        card.addEventListener('click', cardClickFunctinality)
    });

    renderDOM();
};