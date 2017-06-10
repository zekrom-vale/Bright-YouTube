//On document_idle
	var oldRgb= rgb=140,
	delay=1000,
	clock;
setTimeout(inlze, 500);


function inlze(){
	try{
		chrome.storage.local.get('Active', function(items){
	/**/	console.log(items.Active);
			if(items.Active!== 'Short'){
					var Style= document.createElement('style');
					Style.id= 'Brt-YT';
					document.head.appendChild(Style);
					chrome.storage.onChanged.addListener(StorageChange);
				if(items.Active=== true) START();
				else if(typeof items.Active=== undefined){
					chrome.storage.local.set({'Active': true});
					START();
				}
			}
			else if(typeof items.Short=== undefined) set();
		});
	}catch(e){
		console.log(e);
		set();
	}
}

//set
function set(){
	chrome.storage.local.set({'Active': true});
	inlze();
}
//Active?
function onPlay(){
	chrome.storage.local.get('Active', function(items){
		if(items.Active=== 'Short'){
			STOP();
			chrome.storage.onChanged.removeListener(StorageChange);
		}
		else{
			clock= setInterval(evalu, delay);
			toggle();
		}
	});
}

function onPause(){
	clearInterval(clock);
	toggle(false);
}

function StorageChange(changes){
	try{
		if(changes.Active.newValue=== true) START();
		else if(changes.Active.newValue=== false) STOP();
	}catch(e){}
}

function STOP(){
	onPause();
	var x= document.getElementsByTagName('video')[0];
	x.removeEventListener('play', onPlay);
	x.removeEventListener('pause', onPause);
	document.getElementById('Brt-YT').innerHTML= '';
}

function START(){
	clock= setInterval(evalu, delay);
	var x= document.getElementsByTagName('video')[0];
	toggle();
	x.addEventListener('play', onPlay);
	x.addEventListener('pause', onPause);
}

//End Active?

function evalu(){
	var x= document.getElementsByTagName('video')[0];
	if(document.webkitHidden || x.style.filter!='' || x.readyState< 4) return;
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
			STOP();
			chrome.storage.onChanged.removeListener(StorageChange);
			return;
		}
	}
	//End security
	document.getElementById('Brt-YT').innerHTML= '';
	getAvColor(x);
	rgb= 255-rgb;
	//*
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
	else if(rgb<= 20) setFilter(1, 1);
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
	bright= (bright!=1)? 'brightness('+ bright+ ') ': '';
	invert= (invert!=0)? 'invert('+ invert+') ': '';
	con= (con!=1)? 'contrast('+ con+ ') ': '';
	sat= (sat!=1)? 'saturate('+ sat+ ')': '';
	document.getElementById('Brt-YT').innerHTML= 'video{filter: '+bright+ invert+ con+ sat+ '}';
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
		rgb+= data.data[i] + data.data[i+1] + data.data[i+2];
		var Ran= Math.round(Math.random()*50 +1)*4;
		i+= Ran;
		C+=3;
	}
    rgb/= C;
}
//Indicate
function toggle(poz= true){
	var win= window.location.hostname;
	if(/youtube/i.test(win)){
		if(poz) document.getElementsByClassName('ytp-play-button')[0].classList.add('active');
		else document.getElementsByClassName('ytp-play-button')[0].classList.remove('active');
	}
	else if(/twitch/i.test(win)){
		if(poz) document.getElementsByClassName('player-icon-pause')[0].classList.add('active');
		else document.getElementsByClassName('player-icon-pause')[0].classList.remove('active');
	}
	else{
		try{
			if(poz) document.getElementsByClassName('playpause')[0].classList.add('active');
			else document.getElementsByClassName('playpause')[0].classList.remove('active');
		}catch(e){}
	}
}