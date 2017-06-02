//Youtube is more pixalated
var rgb=0,
clock= setInterval(evalu, 100);

function evalu(){
	var el= document.getElementById('movie_player').classList;
	el= el.toString();
	if(el.includes('playing-mode')){
		document.getElementsByClassName('html5-main-video')[0].style.filter='';
		getAvColor(document.getElementsByClassName('html5-main-video')[0]);//This is it
		rgb= 255- rgb;
		console.log(rgb);
		var bright= 0.0000075391* Math.pow(rgb, 2)+ 0.00185722* rgb+ 1.05812,
		invert= 1- rgb,
		con= 1.01* rgb,
		sat= 1.013* rgb;
		setFilter(bright, invert, con, sat);//nope
		rgb=0;
	}
}

function setFilter(bright, invert, con, sat){
	document.getElementsByClassName('html5-main-video')[0].style.filter='brightness('+ bright+ ')';//+' invert('+ invert+') contrast('+ con+ ') saturate('+ sat+ ')';
}

function getAvColor(img) {
    var canvas= document.createElement('canvas'),
        context= canvas.getContext && canvas.getContext('2d'),
        count= 0;
	document.body.appendChild(canvas);
	canvas.id= 'temp';
    // return the base colour for non-compliant browsers
    if(!context) return;

    // set the height and width of the canvas element to that of the image
    var height= canvas.height= img.naturalHeight || img.offsetHeight || img.height,
        width= canvas.width= img.naturalWidth || img.offsetWidth || img.width;

    context.drawImage(img, 0, 0);//Disable hardware acceleration

    try{//Nope
        data= context.getImageData(0, 0, width, height);
    } catch(e) {
        // catch errors - usually due to cross domain security issues
        console.log(e);
        return;
    }
	document.body.removeChild(canvas);
	var i= C= 0;
	while(i< data.data.length){//Nope!
		var Z= Math.random();
		Z= Math.round(Z* 3) +1;
		rgb+= Number(data.data[Z]);
		i+= 12;
		C++;
	}
	/*while(i< data.data.length){//Nope!
		rgb+= Number(data.data[i]);
		var Ran= Math.random();
		Ran= Ran - 0.5;
		Ran= Math.floor(Ran * 400);
		i+= 1000 + Ran;
		C++;
	}*/
    rgb= rgb/C;
}
