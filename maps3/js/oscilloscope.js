var oscilloscope = {
	canvasCtx : null,
	canvas : null,
	analyser : null,
	gain : 1,
	bufferLength : 0,
	dataArray : null,
	xAdjust : 0,//(1/440),
	last : 0,
	timer : 0,
	init : function(audioContext){
		this.canvas = document.getElementById("c");
		this.canvas.width = 300;
		this.canvas.height = 100;
		this.canvasCtx = this.canvas.getContext('2d');
		this.analyser = audioContext.createAnalyser();
		this.gain = this.canvas.height/4;
		this.analyser.fftSize = 128;
		this.bufferLength = this.analyser.frequencyBinCount;
		this.dataArray = new Uint8Array(this.bufferLength);
		this.last = new Date().getTime();
		oscilloscope.draw();
		window.requestAnimationFrame(this.animationframe);
		return this.analyser;
	},
	animationframe : function(){
		//console.log(oscilloscope.timer);
		let now = new Date().getTime();
		let deltams = (now-oscilloscope.last);
		let delta = deltams/1000;
		oscilloscope.last = now;
		oscilloscope.timer += delta;
		if(oscilloscope.timer >= oscilloscope.xAdjust){
			oscilloscope.draw();
			oscilloscope.timer = 0;
		}
		window.requestAnimationFrame(oscilloscope.animationframe);
	},
	draw : function(){
		oscilloscope.analyser.getByteTimeDomainData(oscilloscope.dataArray);
		oscilloscope.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
		oscilloscope.canvasCtx.fillRect(0, 0, oscilloscope.canvas.width, oscilloscope.canvas.height);
		oscilloscope.canvasCtx.lineWidth = 2;
		oscilloscope.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
		oscilloscope.canvasCtx.beginPath();
		var sliceWidth = oscilloscope.canvas.width * 1.0 / oscilloscope.bufferLength;
		var x = 0;
		for(var i = 0; i < oscilloscope.bufferLength; i++) {
	   
	        var v = oscilloscope.dataArray[i] / 128.0;
	        var y = oscilloscope.canvas.height/2 + (1-v)*oscilloscope.gain;

	        if(i === 0) {
	          oscilloscope.canvasCtx.moveTo(x, y);
	        } else {
	          oscilloscope.canvasCtx.lineTo(x, y);
	        }

	        x += sliceWidth;
	    }
	    oscilloscope.canvasCtx.lineTo(oscilloscope.canvas.width, oscilloscope.canvas.height/2);
	    oscilloscope.canvasCtx.stroke();
		
	}
}