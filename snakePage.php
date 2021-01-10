<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Snake</title>
  <meta name="Description" content="Snake Game" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,600" />
  <link rel="stylesheet" type="text/css" media="screen" href="style.css" />

  <link rel="icon" href="https://i.ibb.co/7JfqJK4/website-icon-ico.png" />
</head>

<body>
  <header>
    <div class="container">
      <a href="#something">
        <img src="img/header-logo.png" alt="logo" class="logo" />
      </a>
      <nav>
        <ul>
          <li><a href="/second/homePage.html">Home</a></li>
          <li><a>Games</a>
            <ul class="dropdown">
              <li><a href="/second/snakePage.php">Snake</a></li>
              <li><a href="/second/pongPage.html">Pong</a></li>
              <li><a href="/second/brickPage.php">Brick</a></li>
            </ul>
          </li>
          <li><a href="/second/leaderboardPage.php">Leaderboards</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <audio id="myAudio">
    <source src="audio/Gulp1.mp3" type="audio/mpeg" />
    <source src="audio/death1.wav" type="audio/wav" />
  </audio>

  <div class="main">
    <h1>Snake</h1>
    <canvas id="canvas" width="400" height="400"> </canvas> <br />

    <h2 id="score" name="score">Score: 0</h2>
    <button href="" id="playbutton" onclick="startSnakeGame();">
      Play snake
    </button>
    </br>
    <div class="Keycode Instructions">
      <h3>Keycodes:</h3>
      <h4>arrow keys to move</h4>
      <h4>"m" to mute</h4>
    </div>
    <div class="submitMenu" onload="hideSubmit()">
      <iframe title="SubmitForm" name="iframeName" style="display:none;"></iframe>
      <form method="post" id="formPost" target="iframeName">
        <label>Enter name: </label>
        <input type="text" name="name" autocomplete="off"></input>
        <input type="hidden" name="score" id="scoreInput"> </input>
        <button name="submitScoreButton" id="submitScoreButton" type="submit" name="submitScoreButton" value="submitScoreValue" method="post" class="button" onclick="clickSubmitScoreButton()">
          Submit score
        </button>
      </form>
    </div>
    <script src="snake.js"></script>
  </div>

  <?php

  if (array_key_exists('submitScoreButton', $_POST)) {
    submit();
  }

  function submit()
  {
    $conn = mysqli_connect("localhost", "myuser", "mypass", "mydb");

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $name = $_POST["name"];
    $score = $_POST["score"];

    $sql = "INSERT INTO highscores VALUES ('$name', $score)";

    if ($conn->query($sql) === TRUE) {
      echo "New record of " . $score . " by " . $name . " created successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
  }
  ?>

  <footer>
    <div class="container">
      <p>
        Author: Matt Bunch<br />
        <a>2020</a>
      </p>
    </div>
  </footer>
</body>

</html>