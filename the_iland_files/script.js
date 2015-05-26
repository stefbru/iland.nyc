var images = ['fish.png', 'morph.gif', 'morph_loop.gif'];

window.onload = function() {
	/*var c = document.getElementById('canvas');
	var ctx = c.getContext('2d');
	for (var i = 0; i < 100; ++i) {
		ctx.drawImage(images[i % images.length], 10, 10);
	}
    setInterval(moveImage, 3000);*/
}

function moveImage(){
    var randNum_V = Math.round(Math.random() * availSpace_V);
    var randNum_H = Math.round(Math.random() * availSpace_H);

    image_Element.style.top = randNum_V + "px";
    image_Element.style.left = randNum_H + "px";
}

// create image, set position,
// append image,
// set another position.
// the css transition will animate it. use setInterval to reset it

function initSeagal(id, img) {
	var bird = document.getElementById(id);
	var overlay = document.createElement('div');
	overlay.className = 'overlay';
	overlay.onclick = function() {
		overlay.parentNode.removeChild(overlay);
	};
	var image = new Image();
	image.src = 'the_iland_files/' + img;
	overlay.appendChild(image);
	bird.firstChild.onclick = function() {
		document.body.appendChild(overlay);
	};
}

initSeagal('bird-1', 'hands_00.png');
initSeagal('bird-2', 'hands_01.png');
initSeagal('bird-3', 'hands_02.png');
