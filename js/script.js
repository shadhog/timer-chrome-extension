$(window).load(function(){

});

var timerId=0;
var setTime = 30000;
var dailPadInputValueInt = 0;
var dailPadInputValue = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var dailPadInput = $('#dailpadinput');
var dailpad = $('#dailpad');
var timers = $('#timers');
var editTimerLable = 'New Timer';
var selectedTimer = null;

/*************** Dail Numbers ******************/
dailpad.on('click', '.regular-dail', function() {
	var temp = parseInt($(this).attr('data-button'));
	console.log('button: ' + temp);
	
	if (dailPadInputValueInt < 100000) {
		if (dailPadInputValueInt == 0) {
			dailPadInputValueInt = temp;
		}
		else {
			dailPadInputValueInt = dailPadInputValueInt * 10;
			dailPadInputValueInt += temp;
		}		
		initInput(dailPadInputValueInt);
	}
		
	dailPadInputValue = ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2);
	dailPadInput.html(dailPadInputValue);
	
}); /*************** Dail Numbers ******************/



/*************** Dail +10 ******************/
dailpad.on('click', '#dailplus10', function() {
	console.log('button: dailplus10');
	
	if (dailPadInputValueInt < 100000) {
		dailPadInputValueInt += 10;	
		initInput(dailPadInputValueInt);
	}
		
	dailPadInputValue = ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2);
	dailPadInput.html(dailPadInputValue);
	
}); /*************** Dail +10 ******************/



/*************** Init Hours/Minutes/Seconds ******************/
function initInput(getValue) {
	seconds = Math.floor(getValue % 100);
	getValue = getValue / 100;
	minutes = Math.floor(getValue % 100);
	getValue = getValue / 100;
	hours = Math.floor(getValue % 100);
	getValue = getValue / 100;
	console.log('seconds: ' + seconds);
	console.log('minutes: ' + minutes);
	console.log('hours: ' + hours);
} /*************** Init Hours/Minutes/Seconds ******************/


/*************** Split Hours/Minutes/Seconds ******************/
function splitInput(getValue) {
	console.log('asdsadasdas: ' + getValue);
	var a = getValue.split(':');
	seconds = a[2];
	minutes = a[1];
	hours = a[0]; 
	console.log('seconds: ' + seconds);
	console.log('minutes: ' + minutes);
	console.log('hours: ' + hours);
} /*************** Split Hours/Minutes/Seconds ******************/



/*************** Dail SET ******************/
dailpad.on('click', '#dailset', function() {
	dailPadInputValue = (new Date).clearTime().addSeconds(seconds).addMinutes(minutes).addHours(hours).toString('HH:mm:ss');
	console.log(dailPadInputValue);
	dailPadInput.html(dailPadInputValue);
	addTimer(editTimerLable);
	editTimerLable = 'New Timer';
	dailpad.fadeOut();
	dailPadInputValueInt = 0;
}); /*************** Dail SET ******************/



/*************** Init Timer ******************/
function initTimer(getValue) {
	/*return (new Date().getTime() + init); */
	var a = getValue.split(':'); // split it at the colons
	// minutes are worth 60 seconds. Hours are worth 60 minutes.
	var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
	console.log(seconds);
	return (new Date().getTime() + seconds*1000);
} /*************** Init Timer ******************/



/*************** Add Timer ******************/
function addTimer(label) {
	$('#timers').append('<div class="timer-wrap"><input type="text" name="label" class="label" value="' + label + '"><div class="timer" data-timer-number="' + timerId + '" data-timer-active="true" data-timer-init="' + dailPadInputValue + '"></div><a href="#" class="edit-timer">Edit</a><a href="#" class="delete-timer">Delete</a></div>');


	$('.timer[data-timer-number=' + timerId + ']').countdown(initTimer(dailPadInputValue), function(event) {
		$(this).html(event.strftime('%H:%M:%S'));
	});
	timerId++;
}; /*************** Add Timer ******************/



/*************** New Timer to set ******************/
function newTimer() {
	dailpad.fadeIn();
}; /*************** New Timer to set ******************/


/*************** Pause / Resume Timer ******************/
$(document).on('click', '.timer', function() {
	var active = $(this).attr('data-timer-active');
	if(active=='true') {
		//console.log('pause');
		$(this).addClass('paused').countdown('pause');
		$(this).attr('data-timer-active', 'false');
		$(this).attr('data-timer-init', $(this).html());
	}
	else {
		//console.log('resume');
		$(this).removeClass('paused').countdown('resume');
		$(this).attr('data-timer-active', 'true');
		$(this).countdown(initTimer($(this).attr('data-timer-init')));
	}
}); /*************** Pause / Resume Timer ******************/



/*************** Delete Timer ******************/
$(document).on('click', '.delete-timer', function() {
	$(this).parent().closest('.timer').countdown('stop');
	$(this).parent().remove();
}); /*************** Delete Timer ******************/



/*************** Edit Timer ******************/
$(document).on('click', '.edit-timer', function() {
	var currentTimer = $(this).parent();
	var currentTimerHtml = currentTimer.find('.timer').html();
	splitInput(currentTimerHtml);
	dailPadInput.html(currentTimerHtml);
	dailpad.fadeIn();
	editTimerLable = currentTimer.find('.label').val();
	currentTimer.remove();
	
}); /*************** Edit Timer ******************/