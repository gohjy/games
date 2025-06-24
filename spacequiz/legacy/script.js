var currentquestion = -1
/* array: lowercase!!! */
var protoquestions = [
	["How many planets are there in the solar system?", ["8", "eight"]],
	["What is the name of the fourth planet from the Sun?", "Mars"],
	["What is the largest dwarf planet?", "Eris"],
	["What is the largest asteriod?", "Ceres"],
	["How many rocky planets are there?", ["4", "four"]],
	["What is the biggest storm on Jupiter called?", ["great red spot", "the great red spot"]],
	["How many planets have rings?", ["4", "four"]]
	["Where is Pluto located?", ["kuiper belt", "the kuiper belt"]]
] //format [question, answer]
var questionref = document.getElementById(document.currentScript.getAttribute("questionref") || "questionref")
var statusref = document.getElementById(document.currentScript.getAttribute("statusref") || "statusref")
var inputbox = document.getElementById(document.currentScript.getAttribute("inputbox") || "inputbox")
var qnoref = document.getElementById(document.currentScript.getAttribute("qnoref") || "qnoref")
var buttonref = document.getElementById(document.currentScript.getAttribute("btnref") || "btnref")

var score = 0

questions = protoquestions.sort((a, b) => 0.5 - Math.random())

function nextquestion() {
	currentquestion += 1
	console.log(currentquestion)
	if (currentquestion == questions.length) {
		buttonref.style.display = "none"
		inputbox.style.display = "none"
		qnoref.style.display = "none"
		statusref.style.display = "none"
		questionref.innerText = "No more questions. Reload to play again.\nYour score is " + score + ". (1 question right is 10 points. No points deducted for wrong answers.)"
		return false
	}
	qnoref.innerText = "Q" + (currentquestion + 1)
	questionref.innerText = questions[currentquestion][0]
	if (inputbox.hasAttribute("disabled")) {
		inputbox.removeAttribute("disabled")
	}
	statusref.innerText = ""
	buttonref.innerText = "Submit"
	buttonref.onclick = onsubmitans
	inputbox.value = ""
	inputbox.focus()
}

function checkit() {
	input = inputbox.value
	answer = questions[currentquestion][1]
	if (typeof answer == "string") {
		return input.toLowerCase() == answer.toLowerCase()
	} else if (Array.isArray(answer)) {
		return answer.includes(input.toLowerCase())
	}

}

function onsubmitans() {
	correct = checkit()
	if (correct == true) {
		statusref.innerText = "Correct!"
		score += 10
	} else {
		correctans = questions[currentquestion][1]
		if (Array.isArray(correctans)) {
			correctans = correctans.join("/")
		}
		statusref.innerText = "Wrong. The answer was " + correctans + "."
	}
	inputbox.setAttribute("disabled", "")
	buttonref.innerText = "Next question"
	buttonref.onclick = nextquestion	
}
