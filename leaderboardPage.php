<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Leaderboard</title>
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
          <li>
            <a>Games</a>
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


  <div class="main">
    <h1 id="title">Leaderboards!</h1>


    <?php
    // snake highscores
    echo "
  <table>
    <caption>
      Snake High Scores
    </caption>
    <thead>
      <th>Place</th>
      <th>Name</th>
      <th>Score</th>
    </thead>";

    $conn = mysqli_connect("localhost", "myuser", "mypass", "mydb");

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $result = mysqli_query($conn, "SELECT * FROM highscores ORDER BY score DESC;");


    $i = 1;
    $tdOpen = "<td>";
    $tdClose = "</td>";

    if ($result->num_rows > 0) {
      // output data of each row
      while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo $tdOpen . $i++ .  $tdClose;
        echo $tdOpen . $row["name"] .  $tdClose;
        echo $tdOpen . $row["score"] .  $tdClose;
        echo "</tr>";
      }
    } else {
      echo "0 results";
    }

    echo "</table>";

    echo "</br>";
    echo "</br>";

    // Brick highscores

    echo "
  <table>
    <caption>
      Brick High Scores
    </caption>
    <thead>
      <th>Place</th>
      <th>Name</th>
      <th>Score</th>
    </thead>";

    $conn = mysqli_connect("localhost", "myuser", "mypass", "mydb");

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $result = mysqli_query($conn, "SELECT * FROM brickHighscores ORDER BY score DESC;");


    $i = 1;
    $tdOpen = "<td>";
    $tdClose = "</td>";

    if ($result->num_rows > 0) {
      // output data of each row
      while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo $tdOpen . $i++ .  $tdClose;
        echo $tdOpen . $row["name"] .  $tdClose;
        echo $tdOpen . $row["score"] .  $tdClose;
        echo "</tr>";
      }
    } else {
      echo "0 results";
    }

    echo "</table>";

    ?>

  </div>

  <footer>
    <p class="text">
      Author: Matt Bunch<br />
      <a>2020</a>
    </p>
  </footer>

</body>

</html>