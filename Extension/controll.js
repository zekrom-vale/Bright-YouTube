var oldRgb= rgb=140,//needs g
clock; //needs g
const DLY=1000,
BROWSER= chrome,
VID= document.getElementsByTagName('video'),
SUB=25,
PLY= set();
var main= setTimeout(()=>{
	if(!VID) return;//Stop if VID does not exist
	BROWSER.storage.local.get('Active', items=>{
		switch(typeof items.Active){
			case 'undefined':
				BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404, 'text':'Active und, overiden to true'}});
				BROWSER.storage.local.set({'Active': true});
				items.Active= true;		//fallthrough
			case 'boolean':
			var Active=items.Active;
			for(G=0; G< VID.length; G++){
				let g= G;
				console.log(g);
				//VID[g].addEventListener('error', SHORT(g));
				//VID[g].addEventListener('abort', SHORT(g));
				VID[g].addEventListener('canplay', rep(g,Active), {once:true});//Imedeate
			}
			VID[0].addEventListener('canplay',()=>{
				console.log('ready');
			//Inline IO
				if(/youtube/.test(window.location.hostname) && /watch/.test(window.location.pathname)){
					let opt= document.createElement('input');
					opt.type= 'checkbox';
					opt.checked= items.Active;
					opt.id= 'Brt-opt';
					document.getElementById('menu-container').appendChild(opt);
					opt.addEventListener("change", opt=>{
						BROWSER.storage.local.set({'Active': opt.checked});
					});
				}
			}, {once:true});
		}
	});
}, 3000);
function rep(g,Active){
	//Style
		console.log(g);
		var Style= document.createElement('style');
		Style.id= 'Brt-YT'+g;
		VID[g].appendChild(Style);
	//Canvas
		let VAS= document.createElement('canvas');
		VAS.id= 'Brt-canvas'+g;
		VID[g].appendChild(VAS);
		VID[g].setAttribute('scoped','');//API not standardized.
		BROWSER.storage.onChanged.addListener(StorageChange(g));
		if(Active) START(g);
}
function set(g=0){//many need g
	//Set PLY
	if(/youtube/.test(window.location.hostname)){//Needs to be var
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
function onPlay(g){
	clock= setInterval(evalu(g), DLY);
	toggle();
}

function onPause(g){
	clearInterval(clock);
	toggle(false);
}
//g=und
function StorageChange(changes, g){
	try{
		if(changes.Active.newValue=== true) START(g);
		else if(changes.Active.newValue=== false) STOP(g);
		else if(changes.Active.newValue== 'Short') SHORT(g);
	}catch(e){}
}
//End Active?
//STP
function SHORT(g){
	STOP(g);
	BROWSER.storage.onChanged.removeListener(StorageChange(g));
	VID[g].removeChild(document.getElementById('Brt-canvas'+g));
	VID[g].removeChild(document.getElementById('Brt-YT'+g));
	//Fail
	//VID[g].removeEventListener('error', SHORT(g));
	//VID[g].removeEventListener('abort', SHORT(g));
}
function STOP(g){
	onPause(g);
	VID[g].removeEventListener('play', onPlay(g));
	VID[g].removeEventListener('pause', onPause(g));
	document.getElementById('Brt-YT'+g).innerHTML= '';
}
function START(g){
	console.log(VID[g]);
	console.log(g);
	clock= setInterval(evalu(g), DLY);
	toggle();
	VID[g].addEventListener('play', onPlay(g));
	VID[g].addEventListener('pause', onPause(g));
}
//End STP
function evalu(g){
	console.log(g);
	if(document.getElementsByClassName('audio_only_div')[0]){
		SHORT(g);
		return;
	}
	/* if(VID[g].style.filter!=/\w/ || VID[g].readyState< 4) {
		return;
	} */
	if(document.webkitHidden || document.hidden){
		return;
	}
	//security
	if(isNaN(rgb+ oldRgb)){
		clearInterval(clock);
		let warning= confirm("Varables ilegaly modifyed, posibly malicious code.  Do you want to Reset and Continue?");
		if(warning=== true){
			oldRgb= rgb= 140;
			clock= setInterval(evalu(g), DLY);
			BROWSER.storage.local.set({'0': true});
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':100.7, 'text':'Varables ilegaly modifyed'}});
		}
		else{
			SHORT(g);
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':407, 'text':'Varables ilegaly modifyed'}});
			return;
		}
	}
	//End security
	console.log(g);
	document.getElementById('Brt-YT'+g).innerHTML= '';
	getAvColor(g);
	rgb= 255-rgb;
	//*
	console.log(rgb);//*/
	var ic= 0.1;
	const inc= 0.1;
	if(rgb< 254.9 && rgb> 20){
		if(Math.round(rgb/3)!= Math.round(oldRgb/3)){
			while(ic< 1){
				setTimeout(tick(ic, g), DLY*ic);
				ic+= inc;
			}
			oldRgb= rgb;
		}
		else tick(0);
	}
	else if(rgb<= 20) setFilter(1, 1);
}

function tick(ic, g){
	let V= oldRgb*(1-ic) + rgb*ic,
	X= 0.0266813*V -6.6303;
	let PN= X<0? -1: 1;
	var brt= PN*0.473474*Math.pow(Math.abs(X), 1/7)+ 1.53771,//247 is to dark
	vrt= 0;
	con= 1;
	sat= 1;
	setFilter(g,brt, vrt, con, sat);
}

function setFilter(g, brt=1, vrt=0, con=1, sat=1){
	brt= brt!=1? `brtness(${brt}) `: '';
	vrt= vrt!=0? `invert(${vrt}) `: '';
	con= con!=1? `contrast(${con}) `: '';
	sat= sat!=1? `saturate(${sat})`: '';
	document.getElementById('Brt-YT'+g).innerHTML= `video{filter:${brt+ vrt+ con+ sat}}`;
}

function getAvColor(g){
	console.log(g);
	const VAS= document.getElementById('Brt-canvas'+g);
	var o= (VID[g].clientWidth<= 450)? 0:1,
	height= VAS.height= VID[g].clientHeight-SUB*2*o,
	width= VAS.width= VID[g].clientWidth-SUB*2*o;
	const CONT= VAS.getContext && VAS.getContext('2d', {alpha:false, willReadFrequently:true, premultipliedAlpha:false, antialias: false});
	CONT.drawImage(VID[g], SUB*o, SUB*o, width, height,0,0,width,height);//hardware exceleration
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
