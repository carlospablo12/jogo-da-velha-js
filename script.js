const boardRegions = document.querySelectorAll("#corpoTabuleiro span");
let vBoard = [];
let turnPlayer = "";

function updateTitle() {
  const inputPlayer = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = inputPlayer.value;
}

function inicializarGamer() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";
  document.querySelector("h2").innerHTML =
    'Vez de :<span id="turnPlayer"></span>';
  updateTitle();
  boardRegions.forEach(function (element) {
    element.classList.remove("win");
    element.innerText = "";
    element.classList.add("cursor-pointer");
    element.addEventListener("click", clickAreaBoard);
  });
}

function getWinRegions() {
  const winRegions = [];

  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

function disableRegion(element) {
  element.classList.remove("cursor-pointer");
  element.removeEventListener("click", clickAreaBoard);
}

function handleWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const playerName = document.getElementById(turnPlayer).value;
  document.querySelector("h2").innerHTML =
    "<h2 id='winner'>" + playerName + " Venceu!</h3>";
}

function clickAreaBoard(ev) {
  const span = ev.currentTarget;
  const region = span.dataset.region; //N.N
  const rowCollunmPair = region.split("."); //cada ponto que se ver o elemento "." quebra se outro element no array
  const row = rowCollunmPair[0];
  const collunm = rowCollunmPair[1];
  // Region click
  if (turnPlayer === "player1") {
    span.innerText = "X";
    vBoard[row][collunm] = "X";
  } else {
    span.innerText = "O";
    vBoard[row][collunm] = "O";
  }
  console.clear(); //smp limpa o conosole
  console.table(vBoard); // tenta transformar inf em, tabelas
  disableRegion(span); // desab.Region clicada
  // parte de implementação alternando jg
  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    handleWin(winRegions);
  } else if (vBoard.flat().includes("")) {
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "<h2 id='empate'>Empate</h2>";
  }
}

document.getElementById("start").addEventListener("click", inicializarGamer);
