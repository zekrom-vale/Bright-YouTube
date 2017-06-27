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
		with(document.getElementById('permit').style){
			display= display==''? 'none': '';
		}
		with(document.getElementsByClassName('a')[0].style){
			display= display==''? 'none': '';
		}	
	});
	document.getElementById('CSS').addEventListener('click', ()=>{
		with(document.getElementById('CSScore').style){
			display= display== 'none'? '': 'none';
		}
		with(document.getElementsByClassName('a')[0].style){
			display= display==''? 'none': '';
		}
	});
});