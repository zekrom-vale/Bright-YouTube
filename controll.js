setInterval(evalu,1500);

function evalu(){
	getAvColor(document.getElementsByClassName('html5-main-video')[0]);
	rgb= 255- Math.floor(rgb.r+ rgb.g+ rgb.b/3);
	var bright= 2 * rgb,
	invert= 0.3 * rgb,
	con= 1.3 * rgb,
	sat= 1.27 * rgb;
	
	setFilter(bright, invert, con, sat);
}

function setFilter(bright, invert, con, sat){
	document.getElementsByClassName('html5-main-video')[0].style.filter='brightness('+ bright+ ') invert('+ invert+') contrast('+ con+ ') saturate('+ sat+ ')';
}

function getAvColor(img) {
    var canvas= document.createElement('canvas'),
        context= canvas.getContext && canvas.getContext('2d'),
        rgb= {r:0,g:0,b:0},
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
    data= data.data;
    length= data.length;
    while ((i+= pixelInterval * 4) < length) {
        count++;
        rgb.r+= data.data[i];
        rgb.g+= data.data[i + 1];
        rgb.b+= data.data[i + 2];
    }

    // floor values to give correct values
    rgb.r= Math.floor(rgb.r/count);
    rgb.g= Math.floor(rgb.g/count);
    rgb.b= Math.floor(rgb.b/count);
    return rgb;
    console.log(rgb);
}
