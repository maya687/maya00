const area = document.getElementById("contentArea");

// ------- 共通の画面生成関数（画面番号と画像名で作る） -------
function showScreen(title, description, imageFile) {
  area.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
    <img src="images/${imageFile}" width="300">
    <br><br>
    <button id="backBtn">最初の画面に戻る</button>
  `;

  // 戻るボタン
  document.getElementById("backBtn").addEventListener("click", () => {
    showScreen(
      "画面1",
      "ここは画面1です。",
      "screen1.png"
    );
  });
}

// ------- 画面1 -------
document.getElementById("btn1").addEventListener("click", () => {
  showScreen(
    "画面1",
    "ここは画面1です。",
    "maya1.png"
  );
});

// ------- 画面2 -------
document.getElementById("btn2").addEventListener("click", () => {
  showScreen(
    "画面2",
    "ここは画面2です。",
    "maya3.png"
  );
});

// ------- 画面3 -------
document.getElementById("btn3").addEventListener("click", () => {
  showScreen(
    "画面3",
    "ここは画面3です。",
    "maya4.png"
  );

  
});

// ------- 中央AI 外部リンク -------
document.getElementById("btn4").addEventListener("click", () => {
  window.open("https://chuo-ai.jp/", "_blank");
});

