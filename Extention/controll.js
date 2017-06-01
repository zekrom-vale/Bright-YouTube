//Youtube is more pixalated
var rgb=0,
clock= setInterval(evalu, 10000);

function evalu(){
	if(/playing-mode/i.test(document.getElementById('movie_player').class)){
		//Stop if the vedieo is paused
		document.getElementsByClassName('html5-main-video')[0].style.filter='';
		getAvColor(document.getElementsByClassName('html5-main-video')[0]);
		rgb= 255- rgb;
		console.log(rgb);
		var bright= 0.0000178544 * Math.pow(rgb, 2) - 0.0016272 * rgb + 1.01409,
		invert= 0,
		con= 1.01 * rgb,
		sat= 1.013 * rgb;
		setFilter(bright, invert, con, sat);
		rgb=0;
	}
}


class= html5-video-player iv-module-loaded ytp-hide-info-bar paused-mode
class= html5-video-player iv-module-loaded ytp-hide-info-bar playing-mode ytp-autohide


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

    context.drawImage(img, 0, 0);

    try{
        data= context.getImageData(100, 100, width - 100, height - 100);
    } catch(e) {
        // catch errors - usually due to cross domain security issues
        console.log(e);
        return;
    }
	document.body.removeChild(canvas);
	var i= C= 0;
	while(i< data.data.length){
		rgb+= Number(data.data[i]);
		var Ran= Math.random();
		Ran= Ran - 0.5;
		Ran= Math.floor(Ran * 400);
		i+= 1000 + Ran;
		C++;
	}
    rgb= rgb/C;
}
