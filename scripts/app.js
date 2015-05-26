var x = 0;
var vx = 0;
var ax = 0;
var player = document.getElementById('player');
var hand = document.getElementById('hand');
var scene = document.querySelector('.scene');
var video = document.getElementById('video');

if (typeof window.DeviceMotionEvent != 'undefined') {
	window.ondevicemotion = function(e) {
		ax = event.accelerationIncludingGravity.x * 5;
	}

	setInterval(function() {
		vx += ax;
		vx *= 0.98;
		x += vx / 50;
		var size = Math.min(screen.width, scene.offsetWidth) / 2 / 2.3;
		if (x > size) {
			x = size;
			vx *= -1;
		} else if (x < -size) {
			x = -size;
			vx *= -1;
		}
		player.style.marginLeft = (x / 10) + 'px';
		hand.style.marginLeft = (x - 133) + 'px';
	}, 25);
}

document.getElementById('about').onclick = function() {
	document.body.classList.add('show-content');
	video.pause();
	video.paused = true;
	video.onclick = null;
}

video.onclick = function() {
	if (!this.paused) {
		this.pause();
		this.paused = true;
	} else {
		this.play();
		this.paused = false;
	}
}
