document.addEventListener('DOMContentLoaded', ()=>{
	/*
	var quit;
	document.documentElement.addEventListener("mouseleave",quit=>{
		quit= setTimeout(()=>window.close(),3000);
	});
	document.documentElement.addEventListener("mouseenter", quit=>clearTimeout(quit)); //*/
	document.getElementById("close").addEventListener("click", ()=>window.close() );
	//Open permit
	document.getElementById('exp').addEventListener('click', ()=>{
		const PRMT= document.getElementById('permit');
		PRMT.style.display= PRMT.style.display==''? 'none': '';
		document.getElementsByClassName('a')[0].style.display= document.getElementsByClassName('a')[0].style.display==''? 'none': '';
	});
	document.getElementById('CSS').addEventListener('click', ()=>{
		//Show
		var CSScore= document.getElementById('CSScore');
		CSScore.style.display= CSScore.style.display== 'none'? '': 'none';
		document.getElementsByClassName('a')[0].style.display= document.getElementsByClassName('a')[0].style.display==''? 'none': '';
		//Load new values
	});
});