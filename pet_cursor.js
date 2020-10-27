/*
 ____   ___ ______         __  __ __  ____    _____  ___   ____  
|    \ /  _]      |       /  ]|  |  ||    \  / ___/ /   \ |    \ 
|  o  )  [_|      |      /  / |  |  ||  D  )(   \_ |     ||  D  )
|   _/    _]_|  |_|     /  /  |  |  ||    /  \__  ||  O  ||    / 
|  | |   [_  |  |      /   \_ |  :  ||    \  /  \ ||     ||    \ 
|  | |     | |  |      \     ||     ||  .  \ \    ||     ||  .  \
|__| |_____| |__|       \____| \__,_||__|\_|  \___| \___/ |__|\_|                                                  
     ~ a cute pet cursor for your website by alienmelon! ~

...using CSS's cursor:url() & javascript to animate a tiny website cursor
visitors can play as a cute creature as they browse your site!

the pet comes with a few states, and will change animation when hovering over links (a) or button elements
since this uses cursor:url() it will work over any website, and elements can be added or changed
pet cursor will face the direction that the mouse is going and will have a special reaction animation based on mouse direction too

the pet character is easy to change to your own desired graphic
this one is based on Neko desktop pet: https://en.wikipedia.org/wiki/Neko_(software)
see also Web Neko: https://webneko.net/

note that if you want to change to your own animations:
each array must be the same length, and each animation must have the same amount of frames
the cursor cannot be larger than 32x32 because that's the maximum supported by most browsers
*/

//arrays of each animated state
//each animation must have the same number of frames, each array must be the same length
//
//running down
var arr_petCursor_down = ["CUR_DOWN_FRAME01.png", "CUR_DOWN_FRAME02.png"];
var arr_petCursor_down_left = ["CUR_DOWN_LEFT_FRAME01.png", "CUR_DOWN_LEFT_FRAME02.png"];
var arr_petCursor_down_right = ["CUR_DOWN_RIGHT_FRAME01.png", "CUR_DOWN_RIGHT_FRAME02.png"];
//running left & right
var arr_petCursor_left = ["CUR_LEFT_FRAME01.png", "CUR_LEFT_FRAME02.png"];
var arr_petCursor_right = ["CUR_RIGHT_FRAME01.png", "CUR_RIGHT_FRAME02.png"];
//running up
var arr_petCursor_up = ["CUR_UP_FRAME01.png", "CUR_UP_FRAME02.png"];
var arr_petCursor_up_left = ["CUR_UP_LEFT_FRAME01.png", "CUR_UP_LEFT_FRAME02.png"];
var arr_petCursor_up_right = ["CUR_UP_RIGHT_FRAME01.png", "CUR_UP_RIGHT_FRAME02.png"];
//surprised
var arr_petCursor_surprised = ["CUR_SURPRISE_FRAME01.png", "CUR_SURPRISE_FRAME02.png"];
//idle (start)
var arr_petCursor_idle = ["CUR_IDLE_FRAME01.png", "CUR_IDLE_FRAME02.png"];
//idling
var arr_petCursor_idling = ["CUR_IDLING_FRAME01.png", "CUR_IDLING_FRAME02.png"];
//starting to sleep
var arr_petCursor_sleep_start = ["CUR_SLEEPSTART_FRAME01.png", "CUR_SLEEPSTART_FRAME02.png"];
//sleeping
var arr_petCursor_sleeping = ["CUR_SLEEP_FRAME01.png", "CUR_SLEEP_FRAME02.png"];
//scratching (all directions)
var arr_petCursor_scratch_down = ["CUR_SCRATCH_DOWN_FRAME01.png", "CUR_SCRATCH_DOWN_FRAME02.png"];
var arr_petCursor_scratch_left = ["CUR_SCRATCH_LEFT_FRAME01.png", "CUR_SCRATCH_LEFT_FRAME02.png"];
var arr_petCursor_scratch_right = ["CUR_SCRATCH_RIGHT_FRAME01.png", "CUR_SCRATCH_RIGHT_FRAME02.png"];
var arr_petCursor_scratch_up = ["CUR_SCRATCH_UP_FRAME01.png", "CUR_SCRATCH_UP_FRAME02.png"];
//paths
var str_petCursor_directory = "pet_cursor/";//directory path to images
//directions
var str_petCursor_direction = "DOWN";
var num_petCursor_prevX = 0;
var num_petCursor_prevY = 0;
//state countdown (change animation state when idle)
var num_petCursor_stateCnt = 0; //0 = moving
//animation
var int_petCursorAnimation;//interval id
//array handling
var num_petCursor_currFrame = 0;//current frame of the animation (control "playhead")
var arr_petCursorCurrentState = arr_petCursor_idle;//current movement array (sets current direction animation)
var arr_petCursorInteract = arr_petCursor_scratch_down;//current interaction array (sets current interact with an element on the page animation)
//

function petCursor_getDirection(numX, numY){
	//
	//set diagonals first (based on previous direction)
	if(numX > num_petCursor_prevX && str_petCursor_direction == "UP"){
		//UP DIAGONAL RIGHT
		arr_petCursorCurrentState = arr_petCursor_up_right;
	}else if(numX < num_petCursor_prevX && str_petCursor_direction == "UP"){
		//UP DIAGONAL LEFT
		arr_petCursorCurrentState = arr_petCursor_up_left;
	}else if(numX > num_petCursor_prevX && str_petCursor_direction == "DOWN"){
		//DOWN DIAGONAL RIGHT
		arr_petCursorCurrentState = arr_petCursor_down_right;
	}else if(numX < num_petCursor_prevX && str_petCursor_direction == "DOWN"){
		//DOWN DIAGONAL LEFT
		arr_petCursorCurrentState = arr_petCursor_down_left;
	}
	//set movement values
	if(numX > num_petCursor_prevX && numY == num_petCursor_prevY){
		str_petCursor_direction = "RIGHT";
		arr_petCursorCurrentState = arr_petCursor_right;
		arr_petCursorInteract = arr_petCursor_scratch_right;
	}else if(numX < num_petCursor_prevX && numY == num_petCursor_prevY){
		str_petCursor_direction = "LEFT";
		arr_petCursorCurrentState = arr_petCursor_left;
		arr_petCursorInteract = arr_petCursor_scratch_left;
	}else if(numY > num_petCursor_prevY && numX == num_petCursor_prevX){
		str_petCursor_direction = "DOWN";
		arr_petCursorCurrentState = arr_petCursor_down;
		arr_petCursorInteract = arr_petCursor_scratch_down;
	}else if(numY < num_petCursor_prevY && numX == num_petCursor_prevX){
		str_petCursor_direction = "UP";
		arr_petCursorCurrentState = arr_petCursor_up;
		arr_petCursorInteract = arr_petCursor_scratch_up;
	}
	//set previous values
	num_petCursor_prevX = numX;
	num_petCursor_prevY = numY;
}

//special element (a, button, input...)
function petCursor_setForElement(str_tagName, arr){
	var _element = document.getElementsByTagName(str_tagName);
	for (var i=0; i<_element.length; ++i){
		_element[i].style.cursor = 'url(' + str_petCursor_directory + arr[num_petCursor_currFrame] + '), auto';
	}
}

//called with an interval
function petCursor_animateCursor(){
	//set and countdown animation states
	//if idle, play idle animation & fall asleep
	//if scratching
	//if running
	//when changing a state, reset num_petCursor_currFrame
	//...
	
	//special animation states that happen when over certain elements
	//see https://www.w3schools.com/tags/ for more tags
	petCursor_setForElement('a', arr_petCursorInteract);
	petCursor_setForElement('button', arr_petCursorInteract);
	petCursor_setForElement('input', arr_petCursorInteract);
	petCursor_setForElement('h1', arr_petCursorInteract);
	petCursor_setForElement('h2', arr_petCursorInteract);
	petCursor_setForElement('h3', arr_petCursorInteract);
	petCursor_setForElement('h4', arr_petCursorInteract);
	petCursor_setForElement('h5', arr_petCursorInteract);
	petCursor_setForElement('h6', arr_petCursorInteract);
	
	//clicked (surprise animation)
	if(num_petCursor_stateCnt == -5){
		//suprised (mouse has been clicked!)
		arr_petCursorCurrentState = arr_petCursor_surprised;
	}
	
	//when mouse moves this is set to 0
	//when suprise (click) set to -5
	//increments when not moving, above a certain point indicates a state (sleeping, idle, shocked...)
	num_petCursor_stateCnt += 1;
	
	//set cursor for main body
	if(num_petCursor_stateCnt == 5){
		//idle (start)
		arr_petCursorCurrentState = arr_petCursor_idle;
		//
	}else if(num_petCursor_stateCnt == 30){
		//started grooming
		arr_petCursorCurrentState = arr_petCursor_idling;
	}else if(num_petCursor_stateCnt == 70){
		//falling asleep
		arr_petCursorCurrentState = arr_petCursor_sleep_start;
	}else if(num_petCursor_stateCnt == 90){
		//sleeping
		arr_petCursorCurrentState = arr_petCursor_sleeping;
	}

	//set to current animation for overall document...
	document.body.style.cursor = 'url(' + str_petCursor_directory + arr_petCursorCurrentState[num_petCursor_currFrame] + '), auto';
	
	//control "playhead", step through current array
	//increment
	num_petCursor_currFrame += 1;
	//reached end of movement array, loop
	if(num_petCursor_currFrame > arr_petCursorCurrentState.length-1){
		num_petCursor_currFrame = 0;
	}
}

//gets the direction, and manages state
function petCursor_mouseMove(event){
	num_petCursor_stateCnt = 0; //reset state (cursor is moving - send to shocked and then move)
	petCursor_getDirection(event.pageX, event.pageY);
}

//clicked -- when cursor is still and you click, pet gets surpised
function petCursor_mouseDown(event){
	num_petCursor_stateCnt = -5; //set to negative value to count up then reset...
}

function startPetCursor(){
	//console.log("starting cursor...");
	//control movement and clicks
	document.addEventListener('mousemove', petCursor_mouseMove);
	document.addEventListener('mousedown', petCursor_mouseDown);
	//interval controlling the "playhead"
	int_petCursorAnimation = setInterval(petCursor_animateCursor, 100); //change milliseconds to control animation speed (lower = faster, higher = slower)
	//
}


