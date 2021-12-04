var condition = true;
var playButton = document.getElementById("playButton");

window.addEventListener("load", function () {
  shuffle();
});

function shuffle() {
  while (condition) {
    var images = ["rock.png", "paper.png", "scissors.png"];
    var gameDiv = document.getElementById("game");
    var i =Math.floor(Math.random() * 3);
    console.log(i);

    gameDiv.innerHTML = `<img src=${images[i]} width="300px" height="300px"></img>`;
    return gameDiv;
  }
}

function play() {
  var options = [
    { name: "rock", src: "rock.png", id: 0 },
    { name: "paper", src: "paper.png", id: 1 },
    { name: "scissors", src: "scissors.png", id: 2 },
  ];
  var score = "";
  var userPick = options[randomPick()].id;
  var computerPick = options[randomPick()].id;
  var userImage = options[userPick].src;
  var computerImage = options[computerPick].src;
  var gameDiv = document.getElementById("game");

  score = winnerResult(computerPick, userPick);
  condition = false;
  gameDiv.innerHTML = `   <table class="table">
                            <thead class="thead-light">
                              <tr>
                                <th scope="col">Computer</th>
                                <th scope="col">Result</th>
                                <th scope="col">User</th>

                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row"><img src=${computerImage} width="300px" height="300px"></img></th>
                                <td><h1>${score}<h1></td>
                                <td><img src=${userImage} width="300px" height="300px"></img></td>
                              </tr>
                            </tbody>
                          </table>`;
  return score;
}

playButton.addEventListener("click", play);

function winnerResult(computerPick, userPick) {
  var score = "";
  if ((computerPick + 1) % 3 === userPick) {
    score = "User Wins!!!";
  } else if (computerPick === userPick) {
    score = "Draw";
  } else {
    score = "Computer Wins!!!";
  }
  return score;
}

function randomPick() {
  var i = Math.floor(Math.floor(Math.random() * 3));
  return i;
}
