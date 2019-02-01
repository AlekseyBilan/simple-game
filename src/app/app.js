'use strict';
import './app.scss'

/**
 * Create instants of GameApp.
 *
 * @constructor
 * @this  {GameApp}
 * @param {settings} obj with all app settings.
 */
class GameApp {
    constructor(settings) {
        this.settings = Object.assign(GameApp.defaultSettings(), settings);
        this.scorePC = 0;
        this.scoreHuman = 0;
        this.timeOut = null;
        this._renderHTML(this.settings);

        document.getElementById(this.settings.containerId).addEventListener('click', this.clickHandler.bind(this));
    }

    static defaultSettings() {
        return {
            fieldsSize: 20, //20*20 px field size in px
            fieldsCount: 100,// number of fields
            roundsInTheGame: 10, //default rounds in the game
            delay: 1000, //default delay for game
        }
    };

    _renderHTML(settings) {
        let container = document.getElementById(settings.containerId);
        let width = settings.fieldsSize * Math.sqrt(settings.fieldsCount);
        container.setAttribute("style", "width:" + width + "px;");
        let result = '<div class="play-field">';
        for (let i = 0; i < settings.fieldsCount; i++) {
            result += '<div style="width:' + settings.fieldsSize + 'px;height:' + settings.fieldsSize + 'px"></div>'
        }
        result += '</div>';
        container.innerHTML = result;
    }

    clickHandler(e) {
        if (!this.gameInProgress) return false;
        let elemClassList = e.target.classList;
        if (elemClassList.contains('active')) {
            this.scoreHuman += 1;
            elemClassList.remove('active');
            elemClassList.add('disabled', 'green');
            clearTimeout(this.timeOut);
            this.markField();
        }
    };

    setDelay(delay) {
        this.settings.delay = delay;
    }

    gameStart() {
        this.clear();
        this.markField();
    }

    markField() {
        if (this.scorePC < this.settings.roundsInTheGame && this.scoreHuman < this.settings.roundsInTheGame) {
            this.gameInProgress = true;
            let isOccupiedField = true;
            let activeContainer, randomNumber;
            do {
                randomNumber = Math.floor((Math.random() * this.settings.fieldsCount));
                activeContainer = document.querySelector('#' + this.settings.containerId + ' .play-field').childNodes[randomNumber];
                if (!activeContainer.classList.contains('disabled')) {
                    activeContainer.classList.add('active');
                    isOccupiedField = false;
                }
            } while (isOccupiedField);

            this.startRound(activeContainer);
        } else {
            this.gameInProgress = false;
            if (typeof this.settings.endRoundCallback === 'function') {
                this.settings.endRoundCallback()
            }
        }
    }

    startRound(activeContainer) {
        this.timeOut = setTimeout(() => {
            this.scorePC += 1;
            activeContainer.classList.remove('active');
            activeContainer.classList.add('disabled', 'red');
            this.markField();
        }, this.settings.delay);
    }

    clear() {
        this.scorePC = 0;
        this.scoreHuman = 0;
        let arr = document.querySelectorAll('#' + this.settings.containerId + ' .disabled');
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                arr[i].classList.remove('disabled', 'red', 'green');
            }
        }
    }

    getScore(){
        return { PC: this.scorePC,  human: this.scoreHuman};
    }
}

export default GameApp;