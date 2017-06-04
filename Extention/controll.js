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
		inc= 0.1,
		Test=[
			Math.round(rgb/6.375),
			Math.round(oldRgb/6.375)
		];
		if(Test[0]!= Test[1] && rgb< 254 && rgb> 30){
			while(ic< 1){
				setTimeout(tick(ic), delay*ic);
				ic+= inc;
			}
			oldRgb= rgb;
		}
		else if(rgb<= 30){//White
			function setFilter(1, 1, 1, 1);
		}
		else{
			tick(0);
		}
		rgb=0;
	}
}
function tick(ic){
	var V= oldRgb*(1-ic) + rgb*ic;
	// Dont /2
	var bright= 0.477613*Math.pow(0.027429*V-6.57493, 1/5)+ 1.63493,//244 is too bright
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
    //if(!context) return;//Chrome is fine with this

    // set size of the canvas to the image
    var height= canvas.height= img.naturalHeight || img.offsetHeight || img.height,
        width= canvas.width= img.naturalWidth || img.offsetWidth || img.width;
//!!
    context.drawImage(img, 0, 0);//Disable hardware acceleration//Still a problem
//!!
    try{
        data= context.getImageData(10, 10, width-10, height-10);
    }catch(e){
        //Cross domain security issues
        console.log(e);
        return;
    }
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