var oldRgb= rgb=140,
delay=1000,
clock,
Initialize= setInterval(look, 1000);
function look(){
	if(document.getElementsByClassName('html5-main-video')[0].readyState== 4){
		clock= setInterval(evalu, delay);
		clearInterval(Initialize);
	}
}

function evalu(){
	//security
	oldRgb= Number(oldRgb);
	rgb= Number(rgb);
	delay= Number(delay)
	rgb=(rgb>=0 && rgb<=255)? rgb: 140;
	oldRgb=(oldRgb>=0 && oldRgb<=255)? oldRgb: 140;
	//End security
	if(isNaN(rgb) || isNaN(oldRgb) || isNaN(delay) || delay< 50){
		clearInterval(clock);
		var warning= confirm("Varables ilegaly modifyed, posibly malicious code.  Do you want to continue?");
		if(warning=== true){
			oldRgb= 140;
			rgb= 140;
			delay= 1000;
			clock= setInterval(evalu, delay);
		}
		else{
			document.getElementsByClassName('html5-main-video')[0].style.filter='';
			return;
		}
	}
	
	var el= document.getElementById('movie_player').classList.toString();
	if(el.includes('playing-mode') && !document.webkitHidden){//Chrome
		document.getElementsByClassName('html5-main-video')[0].style.filter='';
		getAvColor(document.getElementsByClassName('html5-main-video')[0]);
		rgb= 255- rgb;
		console.log(rgb);//Dev
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
}
function tick(ic){
	var V= oldRgb*(1-ic) + rgb*ic,
	X= 0.0266813*V -6.6303;
	var PN= (X<0)? -1: 1,
	bright= PN*0.473474*Math.pow(Math.abs(X), 1/7)+ 1.53771,//247 is to dark
	invert= 1- V,
	con= 1.01* V,
	sat= 1.013* V;
	setFilter(bright, invert, con, sat);
}


function setFilter(bright, invert, con, sat){
	document.getElementsByClassName('html5-main-video')[0].style.filter='brightness('+ bright+ ')';//+' invert('+ invert+') contrast('+ con+ ') saturate('+ sat+ ')';
}

function getAvColor(img) {
    var canvas= document.createElement('canvas'),
    context= canvas.getContext && canvas.getContext('2d');
	document.body.appendChild(canvas);

    //set canvas size
    var height= canvas.height= img.naturalHeight || img.offsetHeight || img.height,
    width= canvas.width= img.naturalWidth || img.offsetWidth || img.width;
//!!
    context.drawImage(img, 0, 0);//--Hardware acceleration?
//!!
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