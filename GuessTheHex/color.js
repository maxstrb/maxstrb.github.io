// function arrays_equal(a, b) {
//   if (a === b) return true;
//   if (a == null || b == null) return false;
//   if (a.length !== b.length) return false;

//   for (var i = 0; i < a.length; ++i) {
//     if (a[i] !== b[i]) return false;
//   }
//   return true;
// }

function correct_guess(){
	alert("You won!")
	new_color()
}

function close_enough(a, b){
	const tolerance = document.getElementById("error_tolerance").value;

	for (let i = 0; i < 3; i++){
		if (Math.abs(a[i] - b[i]) > tolerance){
			return false
		}
	}

	return true
}

function check_result() {
	const user_input = document.getElementById("user_input").value;

	document.getElementById("guessed_color_canvas").style.backgroundColor = user_input

	if (close_enough(hex2rgb(user_input), current_color)){
		correct_guess()
	}
}

function hex2rgb(hex_input){
	let output = [0, 0, 0]
	
	//red channel
	output[0] += hex_character_array.indexOf(hex_input[1]) * 16
	output[0] += hex_character_array.indexOf(hex_input[2]) *  1
	
	//green channel
	output[1] += hex_character_array.indexOf(hex_input[3]) * 16
	output[1] += hex_character_array.indexOf(hex_input[4]) *  1
	
	//blue channel
	output[2] += hex_character_array.indexOf(hex_input[5]) * 16
	output[2] += hex_character_array.indexOf(hex_input[6]) *  1
	
	return output
}

function new_color(){
	for (let i = 0; i < 3; i++) {
		current_color[i] = Math.floor(Math.random() * 256);
	}

	document.getElementById("color_canvas").style.backgroundColor = "rgb(" + 
		current_color[0] + ", " +
		current_color[1] + ", " +
		current_color[2] + ")";
}

function main(){
	new_color();
}


let current_color = [0, 0, 0];

const hex_character_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

window.onload = main;
