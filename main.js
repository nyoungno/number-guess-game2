//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호는 맞추면, 맞췃습니다.
//랜덤번호가 < 유저번호 Down!!
//랜덤번호가 > 유전번호 up!!
//Rest버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가. 버튼이 disavle)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또입 입력하면, 알려준다. 기회를 깍지 않는다.


let computerNumber = 0;
let playButton = document.getElementById("play-button");
let resetButton = document.querySelector(".button-reset");
let userInput = document.querySelector("#user-input");
let resultAreaImg = document.querySelector(".main-img");
let resultText = document.querySelector(".result-text");
let chanceArea = document.getElementById("chance-area");
let gameOver = false;
let chances = 5; // 남은 기회
let userValueList = []; // 유저가 입력한 숫자들 리스트

chanceArea.innerHTML = `chance:${chances}`;
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", focusInput);

function pickRandomNumber() {
  // 랜덤숫자 뽑기

  computerNumber = Math.floor(Math.random() * 100) + 1;
  console.log("Success!", computerNumber);
}

function play() {
  // 숫자 추측하기
  const userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    resultAreaImg.src = "";
    resultText.textContent = "Enter a number from 1 to 100";

    return;
  }

  if (userValueList.includes(userValue)) {
    resultAreaImg.src = "";
    resultText.textContent = "The number you have already entered. Please enter a different number";

    return;
  }

  chances--;
  chanceArea.innerHTML = `chance:${chances}`;
  userValueList.push(userValue);
  if (userValue < computerNumber) {
    resultAreaImg.src = "./image/UP.PNG";
    resultText.textContent = "Up!";
  } else if (userValue > computerNumber) {
    resultAreaImg.src = "./image/DOWN.PNG";
    resultText.textContent = "Down!";
  } else {
    resultAreaImg.src = "./image/success.PNG";
    resultText.textContent = "Success!";
    gameOver = true;
  }

  if (chances == 0) {
    gameOver = true;
    resultAreaImg.src = "./image/failure.PNG";
    resultText.textContent = "Failed!";
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function focusInput() {
  userInput.value = "";
}

function reset() {
  //리셋
  pickRandomNumber();
  userInput.value = "";
  resultAreaImg.src = "./image/first_image.PNG";
  resultText.textContent = "Get the numbers right";
  gameOver = false;
  playButton.disabled = false;
  chances = 5;
  chanceArea.innerHTML = `chance:${chances}`;
  userValueList = [];
}

pickRandomNumber()