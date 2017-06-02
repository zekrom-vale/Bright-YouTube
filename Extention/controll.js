//Youtube is more pixalated
var rgb=0,
oldRgb= 140,
clock= setInterval(evalu, 100);

function evalu(){
	var el= document.getElementById('movie_player').classList;
	el= el.toString();
	if(el.includes('playing-mode')){
		document.getElementsByClassName('html5-main-video')[0].style.filter='';
		getAvColor(document.getElementsByClassName('html5-main-video')[0]);//This is it
		rgb= 255- rgb;
		console.log(rgb);
		var ic=0.1;
		//Now add dellays!
		//while(ic< 0.9){
			//var V= oldRgb* (ic- 1)+ rgb* ic;
			V= rgb;//V/2;
			var bright= 0.0000075391*Math.pow(V, 2) +0.00185722*V +1.05812,
			invert= 1- V,
			con= 1.01* V,
			sat= 1.013* V;
			setFilter(bright, invert, con, sat);//nope
			//ic+= 0.1;
		//}
		//oldRgb= rgb;
		rgb=0;
	}
}

function setFilter(bright, invert, con, sat){
	document.getElementsByClassName('html5-main-video')[0].style.filter='brightness('+ bright+ ')';//+' invert('+ invert+') contrast('+ con+ ') saturate('+ sat+ ')';
}

function getAvColor(img) {
    var canvas= document.createElement('canvas'),
        context= canvas.getContext && canvas.getContext('2d');
	document.body.appendChild(canvas);
	canvas.id= 'temp';
    // return the base colour for non-compliant browsers
    if(!context) return;

    // set the height and width of the canvas element to that of the image
    var height= canvas.height= img.naturalHeight || img.offsetHeight || img.height,
        width= canvas.width= img.naturalWidth || img.offsetWidth || img.width;

    context.drawImage(img, 0, 0);//Disable hardware acceleration//Still a problem

    try{//Nope
        data= context.getImageData(10, 10, width-10, height-10);
    } catch(e) {
        // catch errors - usually due to cross domain security issues
        console.log(e);
        return;
    }
	document.body.removeChild(canvas);
	var i= C= 0;
	while(i< data.data.length){//Nope!
		var Z= Math.random();
		Z= Math.round(Z*3) +1;
		rgb+= Number(data.data[Z]);
		var Ran= Math.round(Math.random()*75 +1)*4;
		i+= Ran;//12;
		C++;
	}
    rgb= rgb/C;
}