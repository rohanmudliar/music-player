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
};
/*
* Creating audio instance.
*/
const audio = new Audio();

function init() {
    backBtnDomElem.addEventListener('click', navigateFunctionality);
    listThumbnailDomElem.addEventListener('click', navigateFunctionality);
    menuBtnDomElem.addEventListener('click', navigateFunctionality);
    playerPlayBtnDomElem.addEventListener('click', playSongFunctionality);
    playerPauseBtnDomElem.addEventListener('click', pauseBtnFunctionality);
    playerPreviousBtnDomElem.addEventListener('click', previousSongFunctionality);
    playerNextBtnDomElem.addEventListener('click', songEnded);
    songCardNodeDomElem.forEach(card => { card.addEventListener('click', cardClickFunctinality) });
    renderDOM();
}