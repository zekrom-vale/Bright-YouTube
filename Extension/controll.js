//On document_idle
	var oldRgb= rgb=140,
	delay=1000,
	clock;
	gettingItem= chrome.storage.local.get('Short', function(items){
		if(items.Short=== false){
				var Style= document.createElement('style');
				Style.id= 'Brt-YT';
				document.head.appendChild(Style);
			chrome.storage.onChanged.addListener(StorageChange);
			gettingItem= chrome.storage.local.get('Active', function(items){
				if(items.Active=== true) START();
			});
		}
	});
	
//Active?
function onPlay(){
	gettingItem= chrome.storage.local.get('Short', function(items){
		if(items.Short=== true) SHORT();
		else{
			clock= setInterval(evalu, delay);
			document.getElementsByClassName('ytp-play-button')[0].classList.add('active');
		}
	});
}

function onPause(){
	clearInterval(clock);
	document.getElementsByClassName('ytp-play-button')[0].classList.remove('active');
}

function SHORT(){
	STOP();
	chrome.storage.onChanged.removeListener(StorageChange);
}

function StorageChange(changes){
	try{
		if(changes.Active.newValue=== true) START();
		else STOP();
	}catch(e){}//changes.Active.newValue does not exist
}

function STOP(){
	onPause();
	var x= document.getElementsByClassName('html5-main-video')[0];
	x.removeEventListener('play', onPlay);
	x.removeEventListener('pause', onPause);
	document.getElementById('Brt-YT').innerHTML= '';//x.style.filter='';
}

function START(){
	clock= setInterval(evalu, delay);
	var x= document.getElementsByClassName('html5-main-video')[0];
	document.getElementsByClassName('ytp-play-button')[0].classList.add('active');
	x.addEventListener('play', onPlay);
	x.addEventListener('pause', onPause);
}

//End Active?

function evalu(){
	if(document.webkitHidden) return;
	//https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
	//security
	if(isNaN(rgb) || isNaN(oldRgb) || isNaN(delay) || delay< 50){
		clearInterval(clock);
		var warning= confirm("Varables ilegaly modifyed, posibly malicious code.  Do you want to Reset and Continue?");
		if(warning=== true){
			oldRgb= 140;
			rgb= 140;
			delay= 1000;
			clock= setInterval(evalu, delay);
		}
		else{
			SHORT();
			return;
		}
	}
	//End security
	document.getElementById('Brt-YT').innerHTML= '';//document.getElementsByClassName('html5-main-video')[0].style.filter='';
	getAvColor(document.getElementsByClassName('html5-main-video')[0]);
	rgb= 255-rgb;
	/*
	console.log(rgb);//*/
	var ic=0.1,
	inc= 0.1;
	if(rgb< 254.9 && rgb> 20){
		if(Math.round(rgb/3)!= Math.round(oldRgb/3)){
			while(ic< 1){
				setTimeout(tick(ic), delay*ic);
				ic+= inc;
			}
			oldRgb= rgb;
		}
		else tick(0);
	}
	else if(rgb<= 20) setFilter(1, 1, 1, 1);
	rgb=0;
}
function tick(ic){
	var V= oldRgb*(1-ic) + rgb*ic,
	X= 0.0266813*V -6.6303;
	var PN= (X<0)? -1: 1,
	bright= PN*0.473474*Math.pow(Math.abs(X), 1/7)+ 1.53771,//247 is to dark
	invert= 1- V,
	con= 1.01* V,
	sat= 1.013* V;
	setFilter(bright/*, invert, con, sat*/);
}


function setFilter(bright=1, invert=0, con=1, sat=1){
	document.getElementById('Brt-YT').innerHTML= '.html5-main-video{filter: '+
		'brightness('+ bright+ ') invert('+ invert+') contrast('+ con+ ') saturate('+ sat+ ')'+
	'}';
}

function getAvColor(img) {
    var canvas= document.createElement('canvas'),
    context= canvas.getContext && canvas.getContext('2d');
	document.body.appendChild(canvas);

    //set canvas size
    var height= canvas.height= img.naturalHeight || img.offsetHeight || img.height,
    width= canvas.width= img.naturalWidth || img.offsetWidth || img.width;
//!!
    context.drawImage(img, 0, 0);//--Hardware acceleration!!
    data= context.getImageData(0, 0, width, height);
	document.body.removeChild(canvas);
	var i= C= 0;
	while(i< data.data.length){
		rgb+= data.data[i];
		rgb+= data.data[i+1];
		rgb+= data.data[i+2];
		var Ran= Math.round(Math.random()*50 +1)*4;
		i+= Ran;
		C+=3;
	}
    rgb/= C;
}