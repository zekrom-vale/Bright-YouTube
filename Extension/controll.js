"strict mode";
var oldRgb= rgb= 140,
clock,
life= null;
const DLY=1000,
BROWSER= chrome,
VID= document.getElementsByTagName('video'),
//Canvas
SUB=25,
VAS= document.createElement('canvas'),
CONT= VAS.getContext && VAS.getContext('2d', {alpha:false, willReadFrequently:true, premultipliedAlpha:false, antialias: false});
VAS.id= 'Brt-canvas',
PLY= set();
/*
const c= document.head.childNodes;
for (var i= 0; i< c.length; i++) if(c[i].nodeType== 8) document.head.removeChild(c[i]);//*/
setTimeout(()=>{
	if(VID=== undefined){
		return;//Stop if VID does not exist
		console.log('VID is und\n'+ VID);
	}
	BROWSER.storage.local.get('Active', items=>{
		switch(typeof items.Active){
			case 'undefined':
				BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404, 'text':'Active und, overiden to true'}});
				BROWSER.storage.local.set({'Active': true});
				items.Active= true;		//fallthrough
			case 'boolean':
				VID[0].addEventListener('canplaythrough',()=>{
				//Style
					let Style= document.createElement('style');
					Style.id= 'Brt-YT';
					VID[0].appendChild(Style);
				//Canvas
					VID[0].appendChild(VAS);
					VID[0].setAttribute('scoped','');//This API has not been standardized.
					BROWSER.storage.onChanged.addListener(StorageChange);
					if(items.Active) START();
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
}, 2000);
function set(){
	//Set PLY
	if(/youtube/.test(window.location.hostname)){//Needs to be var
		var PLY= document.getElementsByClassName('ytp-play-button')[0];
	}
	else if(/twitch/.test(window.location.hostname)){
		var PLY=document.getElementsByClassName('player-icon-pause')[0];
	}
	/* "//*"= on "/*"= off	//More options!
	else if(/___domain___/.test(window.location.hostname)){
		var PLY=document.getElementsByClassName('___class play button___')[0];
	}//*/
	else if(document.getElementsByClassName('playpause')[0]){
		var PLY= document.getElementsByClassName('playpause')[0];
	}
	else PLY= false;
	return PLY;
}

//Active?
function onPlay(g){
	life=g;
	clock= setInterval(evalu(g), DLY);
	toggle();
}

function onPause(g){
	clearInterval(clock);
	if(life== g)life= null;
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
	for(var G=0; G<VID.length; G++){
		let g=G;
		VID[g].style.willChange= 'auto';
		onPause(g);
		VID[g].removeEventListener('play', onPlay(g), true);
		VID[g].removeEventListener('pause', onPause(g), true);
	}
	BROWSER.storage.onChanged.removeListener(StorageChange);
	VID[0].removeChild(VAS);
	VID[0].removeChild(document.getElementById('Brt-YT'));
	VID[0].style.willChange= '';
}
function STOP(){
	for(var G=0; G<VID.length; G++){
		let g=G;
		VID.style.willChange= 'auto';
		onPause(g);
		VID[g].removeEventListener('play', onPlay(g), true);
		VID[g].removeEventListener('pause', onPause(g), true);
	}
	document.getElementById('Brt-YT').innerHTML= '';
}
function START(){
	for(var G=0; G<VID.length; G++){
		let g= G;
		console.log(VID[g]=== document.getElementsByTagName('video')[g]);//true
		console.log(g);
		VID[g].style.willChange= 'filter';
		VID[g].addEventListener('pause', onPause(g), true);//almost like it is just onPause(g);
		VID[g].addEventListener('play', onPlay(g), true);
		//clock= setInterval(evalu(g), DLY);//why is this here?
	}
	toggle();
}
//End STP
function evalu(g){
	if(life!= g && life!== null){
		return;
	}
	if(document.getElementsByClassName('audio_only_div')[0]){
		SHORT();
		return;
	}
	if(VID[g].style.filter!='' || VID[g].readyState< 2) return;
	if(document.webkitHidden || document.hidden) return;
	//security
	if(isNaN(rgb+ oldRgb)){
		clearInterval(clock);
		let warning= confirm("Varables ilegaly modifyed, posibly malicious code.  Do you want to Reset and Continue?");
		if(warning=== true){
			oldRgb= rgb= 140;
			clock= setInterval(evalu(g), DLY);
			BROWSER.storage.local.set({'0': true});
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':100.7, 'text':'Varables ilegaly modifyed'}});
			return;
		}
		else{
			SHORT();
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':407, 'text':'Varables ilegaly modifyed'}});
			return;
		}
	}
	//End security
	document.getElementById('Brt-YT').innerHTML= '';
	getAvColor(g);
	rgb= 255-rgb;
	/*
	console.log(rgb);//*/
	var ic= 0.1;
	const inc= 0.1;
	if(rgb< 254.9 && rgb> 20){
		if(Math.round(rgb/3)!= Math.round(oldRgb/3)){
			while(ic< 1){
				setTimeout(tick(ic), DLY*ic);
				ic+= inc;
			}
			oldRgb= rgb;
		}
		else tick(0);
	}
	else if(rgb<= 20) setFilter(1, 1);
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
	brt= brt==1? '': `brtness(${brt}) `;
	vrt= vrt==0? '': `invert(${vrt}) `;
	con= con==1? '': `contrast(${con}) `;
	sat= sat==1? '': `saturate(${sat})`;
	document.getElementById('Brt-YT').innerHTML= `video{\n\tfilter:${brt+ vrt+ con+ sat}\n}`;
}

function getAvColor(g){
	let o= (VID[g].clientWidth<= 550)? 0:1;
	var height= VAS.height= VID[g].clientHeight-SUB*2*o,
	width= VAS.width= VID[g].clientWidth-SUB*2*o;
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