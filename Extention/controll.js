//Youtube is more pixalated
var rgb=0,
oldRgb= 140,
delay=1000,
clock= setInterval(evalu, delay);

function evalu(){
	var el= document.getElementById('movie_player').classList;
	el= el.toString();
	if(el.includes('playing-mode')){
		document.getElementsByClassName('html5-main-video')[0].style.filter='';
		getAvColor(document.getElementsByClassName('html5-main-video')[0]);//This is it
		rgb= 255- rgb;
		console.log(rgb);
		var ic=0.1,
		inc= 0.1,
		Test=[null,null],
		Test[0]=Math.round(rgb/6.375),
		Test[1]=Math.round(oldRgb/6.375);
		if(Test[0]!= Test[1]){
			//are they the same (or close.)
			while(ic< 1){
				setTimeout(tick(ic), delay*ic);//Asumming this is valid to pass paramters
				ic+= inc;//Do I need to incrment before?
			}
			oldRgb= rgb;
			}
		rgb=0;
	}
}
function tick(ic){
	var V= oldRgb* (ic- 1)+ rgb* ic;
	V= V/2;
	var bright= 0.0000075391*Math.pow(V, 2) +0.00185722*V +1.05812,
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
		i+= Ran;
		C++;
	}
    rgb= rgb/C;
}