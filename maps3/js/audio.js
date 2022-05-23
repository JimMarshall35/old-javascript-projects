
var audio = {
	audioCtx : null,
	waveform : null,
	analyser : null,
	mastervol : null,
	noiseBuffer : null,
	defaultmastervol : 0.03,
	activenodes : [],

	oscillators : [],
	attack : 0,
	decay : 0,
	sustain : 1,
	release : 0,

	init : function(){
		this.audioCtx = new AudioContext();
		this.createPersistantNodes();
		this.initialisePersistantNodes();
		this.connectPersistantNodes();
	},
	createPersistantNodes : function(){
		this.analyser = oscilloscope.init(this.audioCtx);
		this.mastervol = this.audioCtx.createGain(); 
		this.gain = this.audioCtx.createGain();
	},
	connectPersistantNodes : function(){
		this.mastervol.connect(this.audioCtx.destination);
		this.analyser.connect(this.mastervol);
	},
	initialisePersistantNodes : function(){
		
		this.mastervol.gain.value = this.defaultmastervol;
		this.gain.gain.value = 1;
	},
	startTone : function(freq){
		let noteinstantiated = false;
		let note;
		for (var i = 0; i < this.activenodes.length; i++) {
			if(this.activenodes[i].frequency == freq){
				noteinstantiated = true;
				node = this.activenodes[i];
			}
		}
		if(noteinstantiated){
			node.env.reset()
			//node.gain.connect(this.analyser);
			node.env.trigger();
		}
		else{
			let osc = this.audioCtx.createOscillator();
			osc.setPeriodicWave(this.waveform);
			osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
			let envelope = ADSRNode(this.audioCtx, {
			  base:         -1.0, // starting/ending value (default: 0)
			  attack:       this.attack, // seconds until hitting peak value (default: 0)
			  attackCurve:  2.0, // amount of curve for attack (default: 0)
			  peak:         1.0, // peak value (default: 1)
			  hold:         0.0, // seconds to hold at the peak value (default: 0)
			  decay:        this.decay, // seconds until hitting sustain value (default: 0)
			  decayCurve:   2.0, // amount of curve for decay (default: 0)
			  sustain:      this.sustain, // sustain value (required)
			  release:      this.release, // seconds until returning back to base value (default: 0)
			  releaseCurve: 2  // amount of curve for release (default: 0)
			});
			let gain = this.audioCtx.createGain(); 
			osc.connect(gain);
			envelope.connect(gain.gain);
			gain.connect(this.analyser);
			osc.start();
			this.activenodes.push({node: osc, env : envelope, gain: gain, frequency:freq});
			envelope.start();
			envelope.trigger();
		}
		
	}, 
	affectEnvelopeChange : function(){
		this.activenodes = [];
		// for (var i = 0; i < this.activenodes.length; i++) {
		// 	let node = this.activenodes[i];
		// 	node.env = ADSRNode(this.audioCtx, {
		// 	  base:         -1.0, // starting/ending value (default: 0)
		// 	  attack:       this.attack, // seconds until hitting peak value (default: 0)
		// 	  attackCurve:  2.0, // amount of curve for attack (default: 0)
		// 	  peak:         1.0, // peak value (default: 1)
		// 	  hold:         0.0, // seconds to hold at the peak value (default: 0)
		// 	  decay:        this.decay, // seconds until hitting sustain value (default: 0)
		// 	  decayCurve:   2.0, // amount of curve for decay (default: 0)
		// 	  sustain:      this.sustain, // sustain value (required)
		// 	  release:      this.release, // seconds until returning back to base value (default: 0)
		// 	  releaseCurve: 2  // amount of curve for release (default: 0)
		// 	});
		// 	node.node.connect(node.gain);
		// 	node.env.connect(node.gain);
		// 	node.gain.connect(this.analyser);
		// 	node.env.start();
		// 	node.env.reset();
		// }
	},
	stopTone : function(freq){
		let stoppednode;
		for(let i=0; i<this.activenodes.length; i++){
			
			let n = this.activenodes[i];
			if(n.frequency == freq){
				try{
					n.env.release();
				}catch(e){

				}
				
				//window.setTimeout(()=>{n.gain.disconnect(this.analyser)},this.release*1000);
			}
		}
		
	},
	setWaveForm : function(fourier){
		this.waveform = this.audioCtx.createPeriodicWave(
			new Float32Array(fourier.real),
			new Float32Array(fourier.imaginary),
			{disableNormalization:false}
		);
		for (var i = 0; i < this.activenodes.length; i++) {
			this.activenodes[i].node.setPeriodicWave(this.waveform);
		}
	}
}