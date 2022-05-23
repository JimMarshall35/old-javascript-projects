
var soundgenerator = {
	audioCtx : null,
	sawwave : null,
	reversesawwave : null,
	trianglewave : null,
	analyser : null,
	mastervol : null,
	noiseBuffer : null,
	gain : null,
	defaultmastervol : 0.03,
	activenodes : [],

	init : function(){
		this.audioCtx = new AudioContext();
		this.generateWaveTables();
		this.generateWhiteNoiseBuffer();
		this.createPersistantNodes();
		this.initialisePersistantNodes();
		this.connectPersistantNodes();
	},
	generateWhiteNoiseBuffer : function(){
		var bufferSize = 2 * this.audioCtx.sampleRate;
		this.noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
		var output = this.noiseBuffer.getChannelData(0);
		for (var i = 0; i < bufferSize; i++) {
		    output[i] = Math.random() * 2 - 1;
		}
	},
	generateWaveTables : function(){
		var n = 4096;
		var real = new Float32Array(n);
		var imag = new Float32Array(n);

		/* Sine 
		imag[1] = 1; */

		/*Sawtooth */
		for(x=1;x<n;x++)
		    imag[x] = -2.0 / (Math.pow(-1, x) * Math.PI * x); 
		this.sawwave = this.audioCtx.createPeriodicWave(real, imag);

		/* Reverse Sawtooth */
		for(x=1;x<n;x++)
		    imag[x] = 2.0 / (Math.pow(-1, x) * Math.PI * x); 
		this.reversesawwave = this.audioCtx.createPeriodicWave(real, imag);
		
		/* Triangle */
		//for(x=1;x<n;x+=2) 
		//    imag[x] = -8.0 / Math.pow(Math.PI, 2) * Math.pow(-1, (x-1)/2) / Math.pow(x, 2) * Math.sin(Math.PI * x);
		//this.reversesawwave = this.audioCtx.createPeriodicWave(real, imag);
	}, 
	createPersistantNodes : function(){
		this.analyser = oscilloscope.init(this.audioCtx);
		this.mastervol = this.audioCtx.createGain(); 
		//this.whiteNoise = this.audioCtx.createBufferSource();
		this.gain = this.audioCtx.createGain();
	},
	connectPersistantNodes : function(){
		this.mastervol.connect(this.audioCtx.destination);
		this.analyser.connect(this.mastervol);
		this.gain.connect(this.analyser);
	},
	initialisePersistantNodes : function(){
		
		this.mastervol.gain.value = this.defaultmastervol;
		this.gain.gain.value = 1;
	},
	returnWhiteNoiseNode:function(freq){
		let whiteNoise = this.audioCtx.createBufferSource();
		
		whiteNoise.buffer = this.noiseBuffer;
		whiteNoise.playbackRate.value = freq; 
		whiteNoise.loop = true;
		return whiteNoise;
	},
	stopSound : function(){
		for(let i=0; i<this.activenodes.length; i++){
			let n = this.activenodes[i];
			if(n.node.stop != null){
				n.node.stop();
			}
			n.node.disconnect(n.connection);

			
		}
		while(this.activenodes.length){
			this.activenodes.pop();
		}
	},
	startSound : function(tone, noise, envelope, envshape, envfreq, tonefreq, noisefreq){
		if(!tone && !noise && !envelope){

		}
		else if(!tone && !noise && envelope){
			this.startEnvelope(envshape, envfreq);
		}
		else if(!tone && noise && !envelope){
			this.gain.gain.setValueAtTime(1, this.audioCtx.currentTime);
			this.startNoise(noisefreq);
		}
		else if(!tone && noise && envelope){
			this.startNoise(noisefreq);
			this.startEnvelope(envshape, envfreq);
		}
		else if(tone && !noise && !envelope){
			this.gain.gain.setValueAtTime(1, this.audioCtx.currentTime);
			this.startTone(tonefreq);
		}
		else if(tone && !noise && envelope){
			this.startTone(tonefreq);
			this.startEnvelope(envshape, envfreq);
		}
		else if(tone && noise && !envelope){
			this.gain.gain.setValueAtTime(1, this.audioCtx.currentTime);
			this.startTone(tonefreq);
			this.startNoise(noisefreq);
		}
		else if(tone && noise && envelope){
			this.startTone(tonefreq);
			this.startNoise(noisefreq);
			this.startEnvelope(envshape, envfreq);
		}
		console.log(this.activenodes.length);
	},
	startEnvelope : function(shape, freq){
		if(shape != 'singlesaw' && shape != 'singlersaw' && shape != 'singleup' &&shape != 'singledown'){
			let env = this.audioCtx.createOscillator();
			switch(shape){
				case 'triangle':
					env.type = 'triangle';
					break;
				case 'sawtooth':
					env.setPeriodicWave(this.sawwave);
					break;
				case 'rsawtooth':
					env.setPeriodicWave(this.reversesawwave);
					//this.gain.gain.setValueAtTime(0, audioCtx.currentTime + 1/freq);
					
					break;
				default:
					console.error("invalid envelope shape");
			}
			env.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
			env.connect(this.gain.gain);
			//this.gain.gain.cancelAndHoldAtTime(this.audioCtx.currentTime + 1/freq);
			env.start();
			this.activenodes.push({node: env, connection : this.gain.gain});
		}
		else{
			let cycleduration = 1/freq;
			switch(shape){
				case 'singlesaw':
					this.gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
					this.gain.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + cycleduration);
					this.gain.gain.setValueAtTime(0, this.audioCtx.currentTime + cycleduration);
					break;
				case 'singlersaw':
					this.gain.gain.setValueAtTime(1, this.audioCtx.currentTime);
					this.gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + cycleduration);
					this.gain.gain.setValueAtTime(1, this.audioCtx.currentTime + cycleduration);
					break;
				case 'singleup':
					this.gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
					this.gain.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + cycleduration);
					break;
				case 'singledown':
					this.gain.gain.setValueAtTime(1, this.audioCtx.currentTime);
					this.gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + cycleduration);
					break;	
				default:
					console.error("invalid envelope shape");
					break;
			}
		}
		
	},
	startTone : function(freq){
		let osc = this.audioCtx.createOscillator();
		osc.type = 'square';
		//osc.setPeriodicWave(this.reversesawwave);
		osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
		osc.connect(this.gain);
		osc.start();
		this.activenodes.push({node: osc, connection : this.gain});
	},
	startNoise : function(freq){
		let whiteNoise = this.returnWhiteNoiseNode(freq);
		whiteNoise.playbackRate.value = freq;
		whiteNoise.connect(this.gain);
		whiteNoise.start();
		this.activenodes.push({node: whiteNoise, connection : this.gain});
	}

}