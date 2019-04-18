var counter = 6 * 60;
var score = 0;

function test() {
  var d = new Date();
  $.ajax({
    url: 'https://www.cricbuzz.com/match-api/livematches.json',
    type: 'GET',
    success: function(data) {
      //console.log(data);
      var data = data.matches;
      //var data = res.matches;
      document.getElementById('summary').innerHTML = data;
      var matches = Object.values(data);

      for (var i = 0; i < matches.length; i++) {
        //console.log(matches[i]);
        if (matches[i].series.type === 'IPL') {
          var summary = "";
          summary += matches[i].status;
          document.getElementById('summary').innerHTML = summary;
          battingRuns = matches[i].score.batting.innings[0].score;
          document.getElementById('team1').innerHTML = "<img src='assets/" + getFlag(matches[i].team1.name) + "' class='img-rounded'>";
          document.getElementById('team2').innerHTML = "<img src='assets/" + getFlag(matches[i].team2.name) + "' class='img-rounded'>";
          if ((battingRuns - score) == 6) {
            // notifyMe();
          }
          document.getElementById('batting-runs').innerHTML = matches[i].score.batting.innings[0].score + '/' + matches[i].score.batting.innings[0].wkts;
          document.getElementById('batting-over').innerHTML = matches[i].score.batting.innings[0].overs;
          '/20';
          document.getElementById('bowling-runs').innerHTML = matches[i].score.bowling.innings[0].score + '/' + matches[i].score.bowling.innings[0].wkts;
          document.getElementById('bowling-over').innerHTML = matches[i].score.bowling.innings[0].overs;
          '/20';
          document.getElementById('cricbuzz').innerHTML = (matches[i].state == 'mom' ? 'COMPLETED' : 'LIVE');
          break;
        }
      }
    },
    error: function(data) {
      //console.log(data);
    }
  });
}

setInterval(test, 2000);

function show() {
  new Notification('', {
    icon: '48.png',
    body: 'Time to make the toast.'
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe() {

  var deadline = new Date(Date.parse(new Date()) + 6 * 60 * 1000);
  initializeClock(deadline);
  //var deadline = new Date(Date.parse(new Date()) +  6  * 1000);
  // chrome.storage.local.set({timer: deadline}, function() {
  //     console.log('coutdowntimer is set to ' + deadline);
  //     countDownSiwggy();
  //   });

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



document.addEventListener('DOMContentLoaded', function() {
  // document.getElementById("noti").addEventListener("click", notifyMe);
  document.getElementById("alarmOn").addEventListener("click", alarmOn);
  document.getElementById("alarmOff").addEventListener("click", alarmOff);
  document.getElementById("developer").addEventListener("click", openGitHub);
});


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

function initializeClock(endtime) {
  clearInterval(timeinterval);

  function updateClock() {
    var t = getTimeRemaining(endtime);
    if (t.minutes == '0' && t.seconds == '0') {
      document.getElementById('timer').innerHTML = 'IPL 2019';
    }
    else {
      var countdown = '0' + t.minutes + ' min ';
      if (t.seconds < 10) {
        countdown += '0' + t.seconds + ' sec';
      }
      else {
        countdown += t.seconds + ' sec';
      }
      document.getElementById('timer').innerHTML = '<span class="label label-danger">' + countdown + '</span>';
    }

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}


//   function countDownSiwggy() {
//     chrome.storage.local.get(['key'], function(result) {
//         console.log('deadline is ' + result.key);
//         initializeClock(result.key);
//       });

//   }

//  countDownSiwggy();


function alarm() {
  chrome.storage.local.get(['alarm'], function(result) {
    //var myAudio = new Audio(chrome.runtime.getURL("ipl.mp3"));
    if (result.alarm !== 'false') {
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

function getFlag(team) {
  var teamName = team.toLowerCase();
  if (teamName.indexOf('chennai') !== -1) {
    return 'chennai.png';
  }
  else if (teamName.indexOf('mumbai') !== -1) {
    return 'mumbai.png';
  }
  else if (teamName.indexOf('hyderabad') !== -1) {
    return 'hyderabad.png';
  }
  else if (teamName.indexOf('bangalore') !== -1) {
    return 'banaglore.png';
  }
  else if (teamName.indexOf('delhi') !== -1) {
    return 'delhi.png';
  }
  else if (teamName.indexOf('punjab') !== -1) {
    return 'punjab.png';
  }
  else {
    return 'ipl.png';
  }
}

function openGitHub() {
  window.open('https://www.github.com/vinitshahdeo',
    ' ', 'width=50%, height=30%');
}