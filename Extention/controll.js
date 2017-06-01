"strict mode";
var rgb= {r:0,g:0,b:0};
evalu();
setInterval(evalu, 1500);

function evalu(){
	getAvColor(document.getElementsByClassName('html5-main-video')[0]);
	console.log(rgb);
	rgb= 255- Math.floor(rgb.r+ rgb.g+ rgb.b/3);
	console.log(rgb);
	var bright= 2 * rgb,
	invert= 0.3 * rgb,
	con= 1.3 * rgb,
	sat= 1.27 * rgb;
	setFilter(bright, invert, con, sat);
	rgb= {r:0,g:0,b:0};
}

function setFilter(bright, invert, con, sat){
	document.getElementsByClassName('html5-main-video')[0].style.filter='brightness('+ bright+ ') invert('+ invert+') contrast('+ con+ ') saturate('+ sat+ ')';
}

function getAvColor(img) {
    var canvas= document.createElement('canvas'),
        context= canvas.getContext && canvas.getContext('2d'),
        pixelInterval= 5, // Rather than inspect every single pixel in the image inspect every 5th pixel
        count= 0,
        data, length,
        i= -4;

    // return the base colour for non-compliant browsers
    if(!context) return;

    // set the height and width of the canvas element to that of the image
    var height= canvas.height= img.naturalHeight || img.offsetHeight || img.height,
        width= canvas.width= img.naturalWidth || img.offsetWidth || img.width;

    context.drawImage(img, 0, 0);

    try{
        data= context.getImageData(0, 0, width, height);
    } catch(e) {
        // catch errors - usually due to cross domain security issues
        alert(e);
        return;
    }
    while ((i+= pixelInterval * 4) < data.length){
        count+=1;
		console.log(data[i]);
        rgb.r+= data[i];
		consloe.log(rgb.r[i]);
        rgb.g+= data[i + 1];
        rgb.b+= data[i + 2];
    }

    // floor values to give correct values
    rgb.r= rgb.r/count
    rgb.g= rgb.g/count
    rgb.b= rgb.b/count
}
