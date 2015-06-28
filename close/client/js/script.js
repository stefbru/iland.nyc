main = function() {

	$("#soundholder div").click(function() {
	
		myAudio = $(this).find("audio")[0];
		
		if(myAudio.paused){
			myAudio.play();
		} else {
			myAudio.pause();
		}
		
	});
	
	

};

$(document).ready(main);