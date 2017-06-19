"strict mode";
var oldRgb= rgb= glRgb=140,
clock;
const DLY=1000,
BROWSER= chrome,
VID= document.getElementsByTagName('video')[0],
//Canvas
SUB=25,
VAS= document.createElement('canvas'),
CONT= VAS.getContext && VAS.getContext('2d', {alpha:false, willReadFrequently:true, premultipliedAlpha:false, antialias: false});
PLY= set();
var main= setTimeout(()=>{
	BROWSER.storage.local.get('Active', items=>{
		switch(typeof items.Active){
			case 'undefined':
				BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404, 'text':'Active und, overiden to true'}});
				BROWSER.storage.local.set({'Active': true});
				items.Active= true;		//fallthrough
			case 'boolean':
				VID.addEventListener('canplay',()=>{
				//Style
					var styleGl= document.createElement('style');
					styleGl.id= 'Brt-Gl';
					var Style= document.createElement('style');
					Style.id= 'Brt-YT';
					
					VAS.id= 'Brt-canvas';
				//append
					document.head.appendChild(Style);//VID is cleared of childNodes
					document.head.appendChild(VAS);
					document.head.appendChild(styleGl);
					BROWSER.storage.onChanged.addListener(StorageChange);
					if(items.Active) START();
				//Inline IO
					if(/youtube/.test(window.location.hostname) && /watch/.test(window.location.pathname)){
						let opt= document.createElement('input');
						opt.type= 'checkbox';
						opt.checked= items.Active;
						opt.id= 'Brt-opt';
						document.getElementById('menu-container').appendChild(opt);
						opt.addEventListener("change", function(){
							BROWSER.storage.local.set({'Active': this.checked});
						});
					}
				}, {once:true});
		}
	});
}, 2000);
function set(){
	//Set PLY
	if(/youtube/.test(window.location.hostname)){
		var PLY= document.getElementsByClassName('ytp-play-button')[0];
	}
	else if(/twitch/.test(window.location.hostname)){
		var PLY=document.getElementsByClassName('player-icon-pause')[0];
	}
	/* "//*"= on "/*"= off	//More options!
	else if(/___website domain___/.test(window.location.hostname)){
		var PLY=document.getElementsByClassName('___class name of play button___')[0];
	}//*/
	else if(document.getElementsByClassName('playpause')[0]){
		var PLY= document.getElementsByClassName('playpause')[0];
	}
	else PLY= false;
	return PLY;
}

//Active?
function onPlay(){
	clock= setInterval(evalu, DLY);
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
	VID.removeChild(document.getElementById('Brt-canvas'));
	VID.removeChild(document.getElementById('Brt-YT'));
	VID.style.willChange= '';
	//Fail
	//VID.removeEventListener('error', SHORT);
	//VID.removeEventListener('abort', SHORT);
}
function STOP(){
	VID.style.willChange= 'auto';
	onPause();
	VID.removeEventListener('play', onPlay);
	VID.removeEventListener('pause', onPause);
	document.getElementById('Brt-YT').innerHTML= '';
}
function START(){
	VID.style.willChange= 'filter';
	clock= setInterval(evalu, DLY);
	toggle();
	VID.addEventListener('play', onPlay);
	VID.addEventListener('pause', onPause);
}
//End STP
function evalu(){
	if(document.getElementsByClassName('audio_only_div')[0]){
		SHORT();
		return;
	}
	if(VID.style.filter!='' || document.getElementsByTagName('video')[0].readyState< 4) return;
	if(document.webkitHidden || document.hidden) return;
	//security
	if(isNaN(rgb+ oldRgb)){
		
		clearInterval(clock);
		let warning= confirm("Varables ilegaly modifyed, posibly malicious code.  Do you want to Reset and Continue?");
		if(warning=== true){
			oldRgb= rgb= 140;
			clock= setInterval(evalu, DLY);
			BROWSER.storage.local.set({'0': true});
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
	glRgb= (rgb+ glRgb)/2;
	tick(0, true);
	var Ic= 0.1;
	const inc= 0.1;
	if(rgb< 254.9 && rgb> 20){
		if(Math.round(rgb/3)!= Math.round(oldRgb/3)){
			while(Ic< 1){
				let ic= Ic;//Forces ic to be local and static
				setTimeout(tick(ic), DLY*ic);
				Ic+= inc;
			}
			oldRgb= rgb;
		}
		else tick(0);
	}
	else if(rgb<= 20) setFilter(1, 1);
}

function tick(ic, gl= false){
	let V= gl=== true? glRgb: oldRgb*(1-ic) + rgb*ic,
	X= 0.0266813*V -6.6303,
	PN= X<0? -1: 1;
	var brt= PN*0.473474*Math.pow(Math.abs(X), 1/7)+ 1.53771,//247 is to dark
	vrt= 0;
	con= 1;
	sat= 1;
	setFilter(brt, vrt, con, sat, gl);
}

function setFilter(brt=1, vrt=0, con=1, sat=1, gl= false){
	brt= brt!=1? `brtness(${brt}) `: '';
	vrt= vrt!=0? `invert(${vrt}) `: '';
	con= con!=1? `contrast(${con}) `: '';
	sat= sat!=1? `saturate(${sat})`: '';
	var elment= gl=== true? '.ytp-preview': 'video';
	var id= gl=== true? 'Brt-Gl':'Brt-YT';
	document.getElementById(id).innerHTML= `${elment}{filter:${brt+ vrt+ con+ sat}}`;
}

function getAvColor(){
	var o= (document.getElementsByTagName('video')[0].clientWidth<= 450)? 0:1,
	height= VAS.height= document.getElementsByTagName('video')[0].clientHeight-SUB*2*o,
	width= VAS.width= document.getElementsByTagName('video')[0].clientWidth-SUB*2*o;
	CONT.drawImage(VID, SUB*o, SUB*o, width, height,0,0,width,height);//hardware exceleration
    data= CONT.getImageData(0,0, width, height);
	
	let i= C= 0;
	while(i< data.data.length){
		rgb+= data.data[i]+ data.data[i+1]+ data.data[i+2];
		i+= Math.round(Math.random()*50 +1)*4;
		C+=3;
	}
    rgb/= C;
}
//Indicate
function toggle(poz= true){
	if(PLY!= false){
		(poz)?PLY.classList.add('active'):PLY.classList.remove('active');
	}
}