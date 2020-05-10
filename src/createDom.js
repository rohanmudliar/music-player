import { songsList } from './songsList';
export let songListTag;
export function createDom() {
    let songCards = [];

    songsList.forEach((song, i) => {
        songCards.push(
            `<div id="list__container-songCard" class="list__container-songCard" datacardno="${i}">
            <div class="list__container-songInfo">
                <p class="list__container-songTitle">
                    ${song.title}
                </p>
                <p class="list__container-artistName">
                    ${song.artistName}
                </p>
            </div>
            <div class="list__container-playPauseBtn">
                <svg class="list__container-playBtn">
                    <use xlink:href="icons/sprite.svg#icon-controller-play"></use>
                </svg>
                <svg class="list__container-pauseBtn hidden">
                    <use xlink:href="icons/sprite.svg#icon-controller-paus"></use>
                </svg>
            </div>
        </div>`
        );
    });

    songListTag = document.getElementById('list__container-songsList');

    songListTag.innerHTML = songCards.join('');
};