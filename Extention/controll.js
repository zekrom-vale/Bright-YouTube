//chrome://flags/#enable-display-list-2d-canvas ?
var oldRgb= rgb=140,
delay=1000,
clock= setInterval(evalu, delay);

function evalu(){
	var el= document.getElementById('movie_player').classList.toString();
	if(el.includes('playing-mode') && !document.webkitHidden){//Chrome
		document.getElementsByClassName('html5-main-video')[0].style.filter='';
		getAvColor(document.getElementsByClassName('html5-main-video')[0]);
		rgb= 255- rgb;
		console.log(rgb);//Dev
		var ic=0.1,
		inc= 0.1;
		if(rgb< 254 && rgb> 30){
			if(Math.round(rgb/6.375)!= Math.round(oldRgb/6.375)){
				while(ic< 1){
					setTimeout(tick, delay*ic, ic);
					ic+= inc;
				}
				oldRgb= rgb;
			}
			else tick(0);
		}
		else if(rgb<= 30) setFilter(1, 1, 1, 1);
		rgb=0;
	}
}
function tick(ic){
	var V= oldRgb*(1-ic) + rgb*ic;
	var bright= -0.384007*Math.pow(-0.0761189*V +18.9021, 1/5)+ 1.63776,
	invert= 1- V,
	con= 1.01* V,
	sat= 1.013* V;
	setFilter(bright, invert, con, sat);//nope
}


function setFilter(bright, invert, con, sat){
	document.getElementsByClassName('html5-main-video')[0].style.filter='brightness('+ bright+ ')';//+' invert('+ invert+') contrast('+ con+ ') saturate('+ sat+ ')';
}

function getAvColor(img) {
    var canvas= document.createElement('canvas'),
        context= canvas.getContext && canvas.getContext('2d');
	document.body.appendChild(canvas);

    // set size of the canvas to the image
    var height= canvas.height= img.naturalHeight || img.offsetHeight || img.height,
        width= canvas.width= img.naturalWidth || img.offsetWidth || img.width;
//!!
    context.drawImage(img, 0, 0);//--Hardware acceleration?//Problem
//!!
    //Find black bar//Need to reconfirm
	try{
        data= context.getImageData(0, height/2, width/4, height/2 +1);
    }catch(e){console.log(e); return;}
	
	var i= S= 0;
	while(i< data.data.length && data.data[i]>= 252 && data.data[i+1]>= 252 && data.data[i+2]>= 252){
		S++;
		i+=4;
		
	}
	if(S>=40)S=0;
	//Rev
	i= data.data.length;
	var nS= 0;
	while(i>0 && data.data[i]>= 252 && data.data[i+1]>= 252 && data.data[i+2]>= 252){
		nS++;
		i-=4;
		
	}
	if(S>=30)S=0;
	if(nS>=30)nS=0;
	//End
	
	data= context.getImageData(S, 0, width-nS, height);
	document.body.removeChild(canvas);
	var i= C= 0;
	while(i< data.data.length){
		rgb+= data.data[i];
		rgb+= data.data[i+1];
		rgb+= data.data[i+2];
		var Ran= Math.round(Math.random()*75 +1)*4;
		i+= Ran;
		C+=3;
	}
    rgb/= C;
}