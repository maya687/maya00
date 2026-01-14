const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("start-btn");
const speedSelect = document.getElementById("speed-select");
const ngDisplay = document.getElementById("ng-count");

// ゲーム設定
let ballRadius = 10;
let x, y, dx, dy;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX;
let rightPressed = false;
let leftPressed = false;
let ngCount = 0;
let gameRunning = false;
let animationId;

// キーボード操作の検知
document.addEventListener("keydown", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
});

function initGame() {
    ngCount = 0;
    ngDisplay.textContent = ngCount;
    resetBall();
    paddleX = (canvas.width - paddleWidth) / 2;
    gameRunning = true;
    if (animationId) cancelAnimationFrame(animationId);
    draw();
}

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    const speed = parseInt(speedSelect.value);
    dx = speed;
    dy = -speed;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    // 壁との衝突判定
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // ラケットでの打ち返し判定
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // ミス（NG）
            ngCount++;
            ngDisplay.textContent = ngCount;
            if (ngCount >= 10) {
                alert("ゲームオーバー！10回ミスしました。");
                gameRunning = false;
            } else {
                resetBall();
            }
        }
    }

    // パドルの移動
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    animationId = requestAnimationFrame(draw);
}

startBtn.addEventListener("click", initGame);