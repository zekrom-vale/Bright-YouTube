var oldRgb= rgb=140,
clock;
const delay=1000,
BROWSER= chrome,
VID= document.getElementsByTagName('video')[0],
//canvas
SUB=25,//Border not processed
canvas= document.createElement('canvas'),
context= canvas.getContext && canvas.getContext('2d', {alpha:false, willReadFrequently:true, premultipliedAlpha:false, antialias: false});
canvas.id= 'Brt-canvas';

setTimeout(()=>{
	BROWSER.storage.local.get('Active', items=>{
		switch(typeof items.Active){
			case 'undefined':
				BROWSER.storage.local.set({'Active': true});
				items.Active= true;		//fallthrough
			case 'boolean':
			//Style
				let Style= document.createElement('style');
				Style.id= 'Brt-YT';
				document.head.appendChild(Style);
			//Canvas
				document.body.appendChild(canvas);
				BROWSER.storage.onChanged.addListener(StorageChange);
				if(items.Active) START();
			//Inline on/off
				try{
					const opt= document.createElement('input');
					opt.type= 'checkbox'
					opt.checked= items.Active;
					opt.id= 'Brt-opt';
					document.getElementById('menu-container').appendChild(opt);
					opt.addEventListener("change",()=>{
						BROWSER.storage.local.set({'Active': opt.checked});
					});
				}finally{}
		}
	});
}, 500);

//Active?
function onPlay(){
	clock= setInterval(evalu, delay);
	toggle();
}

function onPause(){
	clearInterval(clock);
	toggle(false);
}

function StorageChange(changes){
	try{
		if(changes.Active.newValue=== true) START();
		else if(changes.Active.newValue=== false) STOP();
		else if(changes.Active.newValue== 'Short'){
			STOP();
			BROWSER.storage.onChanged.removeListener(StorageChange);
			document.body.removeChild(canvas);
			document.head.removeChild(document.getElementById('Brt-YT'));
		}
	}finally{}
}

function STOP(){
	onPause();
	VID.removeEventListener('play', onPlay);
	VID.removeEventListener('pause', onPause);
	document.getElementById('Brt-YT').innerHTML= '';
}

function START(){
	clock= setInterval(evalu, delay);
	toggle();
	VID.addEventListener('play', onPlay);
	VID.addEventListener('pause', onPause);
}

//End Active?
function evalu(){
	if(VID.style.filter!='' || VID.readyState< 4) return;
	if(document.webkitHidden || document.hidden) return;
	//security
	if(isNaN(rgb+ oldRgb)){
		clearInterval(clock);
		let warning= confirm("Varables ilegaly modifyed, posibly malicious code.  Do you want to Reset and Continue?");
		if(warning=== true){
			oldRgb= 140;
			rgb= 140;
			clock= setInterval(evalu, delay);
		}
		else{
			STOP();
			BROWSER.storage.onChanged.removeListener(StorageChange);
			document.head.removeChild(document.getElementById('Brt-YT'));
			return;
		}
	}
	//End security
	document.getElementById('Brt-YT').innerHTML= '';
	getAvColor(VID);
	rgb= 255-rgb;
	//*
	console.log(rgb);//*/
	var ic= inc= 0.1;
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
	let V= oldRgb*(1-ic) + rgb*ic,
	X= 0.0266813*V -6.6303;
	let PN= X<0? -1: 1;
	var bright= PN*0.473474*Math.pow(Math.abs(X), 1/7)+ 1.53771,//247 is to dark
	invert= 0;
	con= 1;
	sat= 1;
	setFilter(bright, invert, con, sat);
}


function setFilter(bright=1, invert=0, con=1, sat=1){
	bright= bright!=1? 'brightness('+ bright+ ') ': '';
	invert= invert!=0? 'invert('+ invert+') ': '';
	con= con!=1? 'contrast('+ con+ ') ': '';
	sat= sat!=1? 'saturate('+ sat+ ')': '';
	document.getElementById('Brt-YT').innerHTML= 'video{filter: '+bright+ invert+ con+ sat+ '}';
}

function getAvColor(img){
	//Delta size
	const T= document.body.className.toString();
	if(T.includes('enhancer-for-youtube')){
		var size= /_(1?)\d{3}x\d{3}/.exec(T)[0],
		width= /^_(1?)\d{3}/.exec(size);
		var width= canvas.width= width.toString().replace(/\D/g,''),
		height= canvas.height= /\d{3}$/.exec(size)[0];
		context.drawImage(img,0,0);//hardware exceleration
	}
	else{
		var height= canvas.height= img.naturalHeight-SUB*2 || img.offsetHeight-SUB*2 || img.height-SUB*2,
		width= canvas.width= img.naturalWidth-SUB*2 || img.offsetWidth-SUB*2 || img.width-SUB*2;
		context.drawImage(img, SUB, SUB, width, height,0,0,width,height);//hardware exceleration
	}
	//End Delta size
    data= context.getImageData(0,0, width, height);
	
	let i= C= 0;
	while(i< data.data.length){
		rgb+= data.data[i]+ data.data[i+1]+ data.data[i+2];
		let Ran= Math.round(Math.random()*50 +1)*4;
		i+= Ran;
		C+=3;
	}
    rgb/= C;
}
//Indicate
function toggle(poz= true){
	let win= window.location.hostname;
	if(/youtube/i.test(win)){
		(poz)?
		document.getElementsByClassName('ytp-play-button')[0].classList.add('active'):
		document.getElementsByClassName('ytp-play-button')[0].classList.remove('active');
	}
	else if(/twitch/i.test(win)){
		(poz)?
		document.getElementsByClassName('player-icon-pause')[0].classList.add('active'):
		document.getElementsByClassName('player-icon-pause')[0].classList.remove('active');
	}
	else{
		try{
			(poz)?
			document.getElementsByClassName('playpause')[0].classList.add('active'):
			document.getElementsByClassName('playpause')[0].classList.remove('active');
		}finally{}
	}
}