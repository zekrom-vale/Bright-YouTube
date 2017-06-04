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
		if(rgb< 254.9 && rgb> 30){
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
	var V= oldRgb*(1-ic) + rgb*ic,
	X= -0.0761189*V +18.9021;
	if(X>=0){
		var bright= -0.384007*Math.pow(X, 1/5)+ 1.63776,//NaN, often
		invert= 1- V,
		con= 1.01* V,
		sat= 1.013* V;
	}
	else{
		var bright= 0.384007*Math.pow(-X, 1/5)+ 1.63776,//NaN, often
		invert= 1- V,
		con= 1.01* V,
		sat= 1.013* V;
	}
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
    context.drawImage(img, 0, 0);//--Hardware acceleration?
//!!
    data= context.getImageData(0, 0, width, height);
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