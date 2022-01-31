var screenHeight = 500,
    screenWidth = 1200,
    screenMargin = 27;
var screen = document.querySelector('#container');
var paddle1 = document.getElementById('paddle1');
var paddle2 = document.getElementById('paddle2');
var ball = document.getElementById('ball');
var playerScore = document.getElementById('score1');
var computerScore = document.getElementById('score2');
var menu = document.getElementById('menu');
var menuText = document.getElementById('menuText');
var ballRadius = 10,
    paddleWidth = 15,
    paddleHeight = 100;
var marginTop = 50,
    marginLeft = 30;

var moveId;
var dir = [3, 3];
var computerSpeed = 3;

function initGame() {
    resetScore();
    menu.style.opacity = 0;
    menuText.innerHTML = "";
    startNewGame();
}

function startNewGame() {
    if (parseInt(playerScore.innerText) == 5 || parseInt(computerScore.innerText) == 5) {
        var winMessage = (parseInt(playerScore.innerText) == 5) ? 'Kazandın:)' : 'Kaybettin :(';

        clearInterval(moveId);
        menuText.innerHTML = winMessage;
        menu.style.opacity = 1;
        return;
    }

    var dir1 = Math.round(Math.random());
    var dir2 = Math.round(Math.random());

    dir[0] *= (dir1 === 0) ? 1 : -1;
    dir[1] *= (dir1 === 0) ? -1 : 1;
    computerSpeed = 2 + Math.floor((Math.random() * 3));

    clearInterval(moveId);
    ball.style.height = 2 * ballRadius + 'px';
    ball.style.width = 2 * ballRadius + 'px';
    ball.style.position = 'absolute';
    paddle1.style.position = 'absolute';
    ball.style.left = 630 + 'px';
    ball.style.top = 300 + 'px';
    paddle1.style.top = 95 + 'px';
    paddle2.style.top = 95 + 'px';
    moveId = setInterval(moveBall, 10);
}

function resetScore() {
    playerScore.innerText = 0;
    computerScore.innerText = 0;
}

var firstTimeL = true,
    firstTimeR = true;

function moveBall() {
    var ballLeft = parseInt(ball.style.left),
        ballTop = parseInt(ball.style.top);
    var ballRight = ballLeft + (2 * ballRadius),
        ballBottom = ballTop + (2 * ballRadius);
    var paddle1Top = parseInt(paddle1.style.top),
        paddle1Bottom = parseInt(paddle1.style.top) + paddleHeight;
    var paddle2Top = parseInt(paddle2.style.top),
        paddle2Bottom = parseInt(paddle2.style.top) + paddleHeight;

    if (ballLeft <= (marginLeft + paddleWidth)) {
        if (firstTimeL) {
            if ((ballBottom >= paddle1Top && ballBottom <= paddle1Bottom) || (ballTop >= paddle1Top && ballTop <= paddle1Bottom)) {

                let mid = ballTop + ballRadius;

                if (mid >= paddle1Top + 45 && mid <= paddle1Top + 55) {
                    ballLeft = 45;
                    dir[0] = (dir[0] > 0) ? -5 : 5;
                    dir[1] = 0;
                } else {
                    let v1 = 3 + Math.floor(Math.random() * 4);
                    let v2 = 3 + Math.floor(Math.random() * 2);
                    ballLeft = 45;
                    dir[0] = (dir[0] > 0) ? -v1 : v1;
                    dir[1] = (dir[1] > 0) ? v2 : -v2;
                }
            } else {
                firstTimeL = false;
            }
        } else {
            if (ballLeft <= marginLeft) {
                computerScore.innerText = parseInt(computerScore.innerText) + 1;
                startNewGame();
                return;
            } else if ((paddle1Bottom >= ballTop) || (paddle1Top <= ballBottom)) {
                dir[1] = -dir[1];
            }
        }
    } else if (ballRight >= screenMargin + screenWidth - paddleWidth) {
        if (firstTimeR) {
            if ((ballBottom >= paddle2Top && ballBottom <= paddle2Bottom) || (ballTop >= paddle2Top && ballTop <= paddle2Bottom)) {

                let mid = ballTop + ballRadius;
                if (mid >= paddle2Top + 45 && mid <= paddle2Top + 55) {
                    ballLeft = screenMargin + screenWidth - paddleWidth - (2 * ballRadius);
                    dir[0] = (dir[0] > 0) ? -5 : 5;
                    dir[1] = 0;
                } else {
                    ballLeft = screenMargin + screenWidth - paddleWidth - (2 * ballRadius);
                    let v1 = 3 + Math.floor(Math.random() * 4);
                    let v2 = 3 + Math.floor(Math.random() * 2);
                    dir[0] = (dir[0] > 0) ? -v1 : v1;
                    dir[1] = (dir[1] > 0) ? v2 : -v2;
                }
            } else {
                firstTimeR = false;
            }
        } else {
            if (ballRight >= screenWidth + screenMargin) {
                playerScore.innerText = parseInt(playerScore.innerText) + 1;
                startNewGame();
                return;
            } else if ((paddle2Bottom >= ballTop) || (paddle2Top <= ballBottom)) {
                dir[1] = -dir[1];
            }
        }
    }

    if (ballTop < marginTop || ballBottom > marginTop + screenHeight) {
        dir[1] = -dir[1];
    }


    if (ballLeft < marginLeft || ballLeft >= marginLeft + paddleWidth) {
        firstTimeL = true;
    }
    if (ballRight <= screenMargin + screenWidth - paddleWidth || ballRight > screenMargin + screenWidth) {
        firstTimeR = true;
    }

    ball.style.left = ballLeft + dir[0] + 'px';
    ball.style.top = ballTop + dir[1] + 'px';


    if (ballRight >= screenWidth / 2 && paddle2Bottom <= 548) {
        if (ballTop <= paddle2Top) {
            paddle2.style.top = paddle2Top - computerSpeed + 'px';
        } else if (paddle2Bottom + 5 < screenHeight + marginTop) {
            paddle2.style.top = paddle2Top + computerSpeed + 'px';
        }
    }
}

window.addEventListener('mousemove', (e) => {
    if (e.clientY >= marginTop && e.clientY + paddleHeight <= screenHeight + marginTop)
        paddle1.style.top = e.clientY + 'px';
    else if (e.clientY < marginTop)
        paddle1.style.top = marginTop + 'px';
    else
        paddle1.style.top = screenHeight + marginTop - paddleHeight + 'px';
});

document.addEventListener("DOMContentLoaded", () => {
    menu.style.opacity = 1;
    menuText.innerHTML = "PONG : oyuncu v/s bilgisayar";
});