var keyboard = {
	keyboard : null,
	init : function() {
		this.keyboard = new QwertyHancock({
             id: 'keyboard',
             width: 1200,
             height: 150,
             octaves: 4,
             startNote: 'A3',
             whiteNotesColour: 'white',
             blackNotesColour: 'black',
             hoverColour: '#f3e939'
        });
        this.keyboard.keyDown = function (note, frequency) {
		    audio.startTone(frequency);
		};

		this.keyboard.keyUp = function (note, frequency) {
		    audio.stopTone(frequency);
		};
	}
}