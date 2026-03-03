//define variable for our location
let locationField;

let audioCtx;

let freq = 0;

let infoField;
//wait until html document is loaded so that we can access the keyboard input field
document.addEventListener('DOMContentLoaded', function(event) { 
  //locationField = document.getElementById("location");
  locationField = document.querySelector("#location");
  infoField = document.getElementById('info');
  img = document.getElementById("weatherImg");
})

// create web audio api context
audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillator = audioCtx.createOscillator();


oscillator.type = "square";
oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);
oscillator.start();

function sonify(){
  console.log(locationField.value);

fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+locationField.value +'?key=YH5QF5SWJL5LZ8SFPZFT2RCC2')
	.then(response => response.json())
	.then(response => {
    const temp=response.days[0].temp;
    
    if (temp<50){
      document.body.style.backgroundColor="#57A0D2";
      img.src="snowflake.png";
    }

    else if (temp<75){
      document.body.style.backgroundColor="#FFDB58";
      img.src="leaves.png";
    }

    else {
      document.body.style.backgroundColor="#E55451";
      img.src="sun.png";
    }
    }
  )
	.catch(err => console.error(err));
}

function stop(){
  audioCtx.suspend();
}






