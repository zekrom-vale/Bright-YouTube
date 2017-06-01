"strict mode";
var rgb=0;
evalu();
setInterval(evalu, 100);

function evalu(){
	getAvColor(document.getElementsByClassName('html5-main-video')[0]);
	rgb= 255- rgb;
	console.log(rgb);
	rgb= rgb/255;
	console.log(rgb);
	var bright= 2 * rgb,
	invert= 0.3 * rgb,
	con= 1.3 * rgb,
	sat= 1.27 * rgb;
	setFilter(bright, invert, con, sat);
	rgb=0;
}

function setFilter(bright, invert, con, sat){
	document.getElementsByClassName('html5-main-video')[0].style.filter='brightness('+ bright+ ') invert('+ invert+') contrast('+ con+ ') saturate('+ sat+ ')';
}

function getAvColor(img) {
    var canvas= document.createElement('canvas'),
        context= canvas.getContext && canvas.getContext('2d'),
        count= 0;

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
	var i= C= 0;
	while(i< data.data.length){
		rgb+= Number(data.data[i]);
		i+= 100;
		C++;
	}
    rgb= rgb/C;
}
