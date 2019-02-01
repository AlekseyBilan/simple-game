import GameApp from './app/app'
import './main.scss'

window.addEventListener('DOMContentLoaded', function () {
    const startGame = () => {
        if(!game.gameInProgress){
            game.gameStart();
        }
    };

    const changeDelay = (e) => {
        if(!game.gameInProgress){
            game.setDelay(e.target.value);
        }
    };

    let showPopup = () => {
        let popup = document.createElement('div');
        popup.className = "result-popup";
        popup.innerHTML = `<div class="b-popup">
            <div class="b-popup-content">
                <div class="popup-title">
                    ${(game.scorePC < game.scoreHuman) ? 'User won!' : 'PC won!'}
                </div>
                <icon title='Close popup' class="cancel"  data-value="cancel">x</icon>
                <span class="text">Congratulations, ${(game.scorePC < game.scoreHuman) ? 'User' : 'PC'} won. Would you like to play another game?</span>
                <div class="actions-section">
                    <button id="cancel" class="cancel" data-value="cancel">Cancel</button>
                    <button id="play-one-more-game" class="play-one-more-game" data-value="one-more-game"">Play</button>
                </div>
            </div>
        </div>`;
        document.getElementById('game-container').appendChild(popup);
    };

    const removePopup = () => {
        document.querySelector('.result-popup').remove();
        document.getElementById('user-score').innerText = '0';
        document.getElementById('pc-score').innerText = '0';
    };

    const endRoundCallback = () => {
        let score = game.getScore();
        document.getElementById('user-score').innerText = score.human;
        document.getElementById('pc-score').innerText = score.PC;
        showPopup();
    };

    function smartClickHandler(e) {
        let flag = e.target.getAttribute('data-value');
        if(flag){
            if (flag === 'cancel') {
                removePopup();
                game.clear();
            } else if (flag === 'one-more-game') {
                removePopup();
                startGame();
            }
        }
    }

    document.getElementById('start').addEventListener('click', startGame);
    document.getElementById('delay').addEventListener('change', changeDelay);
    document.getElementById('game-container').addEventListener('click', smartClickHandler);//need for popups click handle


    /**
     * settings for instants of GameApp.
     */
    let settings = {
        containerId: "game-container",
        roundsInTheGame: 10,
        fieldsSize: 30, //30*30 px
        fieldsCount: 100,
        endRoundCallback: endRoundCallback
    };

    const game = new GameApp(settings);
});