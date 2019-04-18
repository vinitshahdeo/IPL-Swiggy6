var data = null;
var score = 0;

function cricbuzz() {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      var res = JSON.parse(this.responseText);
      var data = res.matches;
      var matches = Object.values(data);
      for (var i = 0; i < matches.length; i++) {
        // console.log(matches[i]);
        if (matches[i].series.type === 'IPL') {
          //document.getElementById('summary').innerHTML = matches[i].status;
          battingRuns = matches[i].score.batting.innings[0].score;
          
          if ((battingRuns - score) == 6) {
            notifyMe();
            updateScore(battingRuns);
          }
          updateScore(battingRuns);
          break;
        }
      }
    }
  });
  
  xhr.open("GET", "https://www.cricbuzz.com/match-api/livematches.json");
  xhr.send(data);
}

function notifyMe() {

  console.log('Yess, SIX');
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('That\'s a SIX!', {
      icon: 'assets/ipl.png',
      body: "Apply SWIGGY6 and get exclusive offers!",
    });

    notification.onclick = function() {
      window.open("https://6.swiggy.com/");
    };
    alarm();
  }
}

function updateScore(run) {
  score = run;
  chrome.storage.local.set({
    score: run
  }, function() {
    console.log('score is set');
  });
}

function fetchScore() {
  chrome.storage.local.get(['score'], function(result) {
    if (result.score) {
      score = result.score;
      console.log('score is fetched ',score);
    }
  });
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function alarm() {
  chrome.storage.local.get(['alarm'], function(result) {
    //var myAudio = new Audio(chrome.runtime.getURL("ipl.mp3"));
    if (result.alarm === 'true') {
      playAudio();
    }
  });
}

function alarmOff() {
  chrome.storage.local.set({
    alarm: 'false'
  }, function() {
    console.log('alarm is off');
  });
}

function alarmOn() {
  chrome.storage.local.set({
    alarm: 'true'
  }, function() {
    console.log('alarm is on');
  });
}

function playAudio() {
  var myAudio = new Audio(chrome.runtime.getURL("ipl.mp3"));
  myAudio.play();
}

fetchScore();

setInterval(cricbuzz, 2000);
