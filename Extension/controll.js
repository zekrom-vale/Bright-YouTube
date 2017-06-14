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
const PLY= set();
setTimeout(()=>{
	BROWSER.storage.local.get('Active', items=>{
		try{
			switch(typeof items.Active){
				case 'undefined':
					BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404, 'text':'Active in storage, overiden to true'}});
					BROWSER.storage.local.set({'Active': true});
					items.Active= true;		//fallthrough
				case 'boolean':
					VID.addEventListener('error', SHORT);
					VID.addEventListener('canplay',()=>{
					//Style
						let Style= document.createElement('style');
						Style.id= 'Brt-YT';
						document.head.appendChild(Style);
					//Canvas
						document.body.appendChild(canvas);
						BROWSER.storage.onChanged.addListener(StorageChange);
						if(items.Active) START();
					//Inline on/off //Must delay over 1000ms
						try{
							let opt= document.createElement('input');
							opt.type= 'checkbox'
							opt.checked= items.Active;
							opt.id= 'Brt-opt';
							document.getElementById('menu-container').appendChild(opt);
							opt.addEventListener("change",()=>{
								BROWSER.storage.local.set({'Active': opt.checked});
							});
						}catch(e){
							BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404, 'text':Object.entries(e)}});
						}
					}, {once:true});
				//
			}
		}catch(e){
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':502, 'text':Object.entries(e)}});
		}
	});
}, 2000);
//Set PLY
function set(){
	if(/youtube/.test(window.location.hostname)){//Needs to be var
		var PLY= document.getElementsByClassName('ytp-play-button')[0];
	}
	else if(/twitch/.test(window.location.hostname)){
		var PLY=document.getElementsByClassName('player-icon-pause')[0];
	}
	/*//More options!
	else if(/___website domain___/.test(window.location.hostname)){
		var PLY=document.getElementsByClassName('___class name of play button___')[0];
	}//*/
	else{
		var PLY= document.getElementsByClassName('playpause')[0];
	}
	return PLY;
}

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
		else if(changes.Active.newValue== 'Short') SHORT();
	}finally{}
}
//End Active?
//STP
function SHORT(){
	STOP();
	BROWSER.storage.onChanged.removeListener(StorageChange);
	VID.removeEventListener('error', SHORT);
	document.body.removeChild(canvas);
	document.head.removeChild(document.getElementById('Brt-YT'));
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
//End STP
function evalu(){
	if(VID.style.filter!='' || VID.readyState< 4) return;//Uncaught TypeError: Cannot read property 'style' of undefined
	if(document.webkitHidden || document.hidden) return;
	//security
	if(isNaN(rgb+ oldRgb)){
		
		clearInterval(clock);
		let warning= confirm("Varables ilegaly modifyed, posibly malicious code.  Do you want to Reset and Continue?");
		if(warning=== true){
			oldRgb= rgb= 140;
			clock= setInterval(evalu, delay);
			BROWSER.storage.local.set({'Vd': 'min'});
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':100.7, 'text':'Varables ilegaly modifyed'}});
		}
		else{
			SHORT();
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':407, 'text':'Varables ilegaly modifyed'}});
			return;
		}
	}
	//End security
	document.getElementById('Brt-YT').innerHTML= '';
	getAvColor();
	rgb= 255-rgb;
	/*
	console.log(rgb);//*/
	var ic= 0.1;
	const inc= 0.1;
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
	var brt= PN*0.473474*Math.pow(Math.abs(X), 1/7)+ 1.53771,//247 is to dark
	vrt= 0;
	con= 1;
	sat= 1;
	setFilter(brt, vrt, con, sat);
}


function setFilter(brt=1, vrt=0, con=1, sat=1){
	brt= brt!=1? `brtness(${brt}) `: '';
	vrt= vrt!=0? `invert(${vrt}) `: '';
	con= con!=1? `contrast(${con}) `: '';
	sat= sat!=1? `saturate(${sat})`: '';
	document.getElementById('Brt-YT').innerHTML= `video{filter:${brt+ vrt+ con+ sat}}`;
}

function getAvColor(){
	//Delta size
	const BDY= document.body.className.toString();
	if(BDY.includes('enhancer-for-youtube')){
		var size= /_(1?)\d{3}x\d{3}/.exec(BDY)[0],
		width= canvas.width= /^_(1?)\d{3}/.exec(size).toString().replace(/\D/g,''),
		height= canvas.height= /\d{3}$/.exec(size)[0];
		context.drawImage(VID,0,0);//hardware exceleration
	}
	else{
		var height= canvas.height= VID.naturalHeight-SUB*2 || VID.offsetHeight-SUB*2 || VID.height-SUB*2,
		width= canvas.width= VID.naturalWidth-SUB*2 || VID.offsetWidth-SUB*2 || VID.width-SUB*2;
		context.drawImage(VID, SUB, SUB, width, height,0,0,width,height);//hardware exceleration
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
	try{
		(poz)?PLY.classList.add('active'):PLY.classList.remove('active');
	}finally{}
}