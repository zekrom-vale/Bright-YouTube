"strict mode";
var oldRgb= rgb=140,
g=0,
clock,
oPl;
const DLY=1000,
BROWSER= chrome,
//Canvas
SUB=25,
VAS= document.createElement('canvas'),
CONT= VAS.getContext && VAS.getContext('2d', {alpha:false, willReadFrequently:true, premultipliedAlpha:false, antialias: false});
VAS.id= 'Brt-canvas',
PLY= set();
/*
const c= document.head.childNodes;
for (var i= 0; i< c.length; i++) if(c[i].nodeType== 8) document.head.removeChild(c[i]);
*/
var main= setTimeout(()=>{
	if(document.getElementsByTagName('video')[0]=== undefined){
		return;//Stop if VID does not exist
		console.log('VID is und\n'+ VID);
	}
	BROWSER.storage.local.get('Active', inl);
}, 2000);
function inl(items){
	switch(typeof items.Active){
		case 'undefined':
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404, 'text':'Active und, overiden to true'}});
			BROWSER.storage.local.set({'Active': true});
			items.Active= true;		//fallthrough
		case 'boolean':
			document.getElementsByTagName('video')[0].addEventListener('canplay',()=>{
				for(var vids=0; vids< document.getElementsByTagName('video').length; vids++){
					let el=document.getElementsByTagName('video')[vids];
					el.id= 'BrtV-' +vids;//Can only have one Id!!
				}
			//Style
				let Style= document.createElement('style');
				Style.id= 'Brt-YT';
				document.getElementById('BrtV-0').appendChild(Style);
			//Canvas
				document.getElementById('BrtV-0').appendChild(VAS);
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
}

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
function onPlay(event){
	var gSub= /BrtV-\d+/.exec(event.target.id);
	g= /\d/.exec(gSub);
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
	for(var vids=0; vids< document.getElementsByTagName('video'); vids++){
		document.getElementsByTagName('video')[vids].style.willChange= 'auto';
	}
	onPause();
	document.documentElement.removeEventListener('play', oPl);
	document.documentElement.removeEventListener('pause', onPause);
	BROWSER.storage.onChanged.removeListener(StorageChange);
	document.documentElement.removeChild(VAS);
	document.documentElement.removeChild(document.getElementById('Brt-YT'));
}
function STOP(){
	for(var vids=0; vids< document.getElementsByTagName('video'); vids++){
		document.getElementsByTagName('video')[vids].style.willChange= 'auto';
	}
	onPause();
	document.documentElement.removeEventListener('play', oPl);
	document.documentElement.removeEventListener('pause', onPause);
	document.getElementById('Brt-YT').innerHTML= '';
}
function START(){
	for(var vids=0; vids< document.getElementsByTagName('video'); vids++){
		document.getElementsByTagName('video')[vids].style.willChange= 'filter';
	}
	
	clock= setInterval(evalu, DLY);
	toggle();
	document.documentElement.addEventListener('play', oPl= function(){onPlay(event);});//function named() is not valid!
	document.documentElement.addEventListener('pause', onPause);
}
//End STP
function evalu(){
	const VID= document.getElementById('BrtV-'+g);
	if(document.getElementsByClassName('audio_only_div')[0]){
		SHORT();
		return;
	}
	if(VID.style.filter!='' || VID.readyState< 4) return;//Uncaught TypeError: Cannot read property 'style' of undefined
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
	getAvColor(VID);
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

function getAvColor(VID){
	let o= (VID.clientWidth<= 550)? 0:1;
	var height= VAS.height= VID.clientHeight-SUB*2*o,
	width= VAS.width= VID.clientWidth-SUB*2*o;
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