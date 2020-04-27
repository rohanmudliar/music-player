const list = document.getElementById('list'),
    player = document.getElementById('player'),
    backBtn = document.getElementById('list__container-backBtn'),
    menuBtn = document.getElementById('player__container-menuBtnDiv'),
    listThumbnail = document.getElementById('list__container-currentPlayingThumbnail'),
    playerThumbnail = document.getElementById('playing__container-currentPlayingThumbnail'),
    songTitle = document.getElementById('playing__container-songTitle'),
    artistName = document.getElementById('playing__container-ArtistName'),
    currentPlayTime = document.getElementById('playing__container-currentPlayingTime'),
    durationTime = document.getElementById('playing__container-durationTime'),
    dot = document.getElementById('slider__dot'),
    progressLine = document.getElementById('slider__gradLine'),
    playerPreviousBtn = document.getElementById('playing__container-previousBt'),
    playerPlayBtn = document.getElementById('playing__container-playBtn'),
    playerPauseBtn = document.getElementById('playing__container-pauseBtn'),
    playerNextBtn = document.getElementById('playing__container-nextBtn');
let songCardNode = document.querySelectorAll('#list__container-songCard');


backBtn.addEventListener('click', backFunctionality);
listThumbnail.addEventListener('click', backFunctionality);
menuBtn.addEventListener('click', menuBtnFunctionality);

songCardNode.forEach(card => {
    card.addEventListener('click', playFromList);
});

var previousSelectedCardNo = '0';

function backFunctionality() {
    player.classList.remove('hidden');
    list.classList.add('hidden');
};

function menuBtnFunctionality() {
    player.classList.add('hidden');
    list.classList.remove('hidden');
}


function playFromList() {
    // songCardNode.forEach(card => {
    // console.log(songListTag.children[0])
    songListTag.children[Number(previousSelectedCardNo)].classList.remove('selected');
    // console.log(typeof songCards[previousSelectedCardNo]);
    // songCards[previousSelectedCardNo].classList.remove('hidden');
    // if (card.getAttribute("datacardno") == previousSelectedCardNo) {
    // card.classList.remove('selected');
    // let playBtn = card.children[1].children[0];
    // let pauseBtn = card.children[1].children[1];
    // playBtn.classList.remove('hidden');
    // pauseBtn.classList.add('hidden');
    // }
    // });

    let currentCardSelected = this.getAttribute("datacardno");
    listThumbnail.children[0].src = `images/${songsList[currentCardSelected].thumbnail}`;
    this.classList.add('selected');
    let playBtn = this.children[1].children[0];
    let pauseBtn = this.children[1].children[1];
    playBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');

    previousSelectedCardNo = currentCardSelected;

    playerThumbnail.children[0].src = `images/${songsList[currentCardSelected].thumbnail}`;

    playerPlayBtn.classList.add('hidden');
    playerPauseBtn.classList.remove('hidden');
    playSong(currentCardSelected);
};

var audio = new Audio();

function playSong(songNo) {
    audio.src = songsList[songNo].src;
    audio.addEventListener("loadeddata", function () {
        audio.play();
        var duration = (audio.duration / 60).toFixed(2);
        durationTime.classList.remove('hidden');
        durationTime.children[0].innerHTML = duration;
        // dot.style.animation = `dotMoveRight ${audio.duration}s linear`;
        // progressLine.style.animation = `lineMoveRight ${audio.duration}s linear`;

        // console.log(audio.duration);
        //264.96
        var a = 0;
        setInterval(function () {
            a += .5
            // jump = (2.64 * a)
            dot.style.left = `${a}%`;
            progressLine.style.width = `${a}%`;
        }, 1320);

        // 100 264.96
        // 1   2.64

        // 2640    1000
        // 1




        setInterval(function () {
            let curTime = (audio.currentTime / 60).toFixed(2);
            currentPlayTime.children[0].innerHTML = curTime;
        }, 50);
    });
};






