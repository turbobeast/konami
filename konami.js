var KONAMI = (function(){
	'use strict';
	var nami = {}, actions = [],
	UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39, B = 66, A = 65,
	konamiSequence = [UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A],
	userSequence = [],
	addListener = (function(){
		if(typeof window.addEventListener === 'function') {
			return function (obj, evt, listener) {
				obj.addEventListener(evt,listener,false);
			};
		}
		if(typeof document.attachEvent === 'function') {
			return function (obj, evt, listener) {
				obj.attachEvent('on' + evt, listener);
			};
		}
		return function (obj, evt, listener) {
			obj['on' + evt] = listener; 
		};
	}());

	function doActions () {
		var i = 0,
		aLength = actions.length;
		for(i = 0; i < aLength; i += 1) {
			actions[i]();
		}
		userSequence = [];
	}

	function checkForMatch () {
		var i = 0,
		kLength = konamiSequence.length;
		for(i = 0 ; i < kLength; i += 1) {
			if(userSequence[i] !== konamiSequence[i]) {
				return;
			}
		}
		doActions();
	}

	function trackKeys (evt) {
		var e = evt || window.event;
		//store keycode in array
		userSequence.push(e.keyCode);
		//if there are more than eight, remove the first one
		if(userSequence.length > konamiSequence.length) {
			userSequence.shift();
		}

		//if there are eight, check for match
		if(userSequence.length === konamiSequence.length) {
			checkForMatch();
		}
	}

	//public function for adding callbacks
	nami.onKonami = function (cb) {
		if(typeof cb === 'function') { actions.push(cb); }
	};

	//track clicks
	addListener(window,'keydown',trackKeys);

	return nami;
}());