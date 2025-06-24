var circle = "◯"
var cross = "✕"

var statusref = document.getElementById(document.currentScript.getAttribute("statusref") || "statusref")

/*var board = document.getElementById("board")
var rows = board.children
var boxes = []
var rowChildren*/

var boxes = []
for (i=0; i<3; i++) {
	for (j=0; j<3; j++) {
		boxes.push(String(i) + "_" + String(j))
	}
}

var turn = circle
var play = true

function place(obj) {
	if (obj.innerText != "" || !play) return
	obj.innerText = turn
	check()
	turn = turn == circle ? cross : circle
}

/*rows.forEach(function(val) {
	boxes.push(val.children)
})*/

/*boxes.forEach(function(box) {
	box.onclick = function(this) { place(this) }
})*/

function equal(l) {
	return l[0].innerText != "" && l[0].innerText == l[1].innerText && l[0].innerText == l[2].innerText
}

function check() {
	for (i=0; i<3; i++) {
		
		n = [document.getElementById(i + "_0"), document.getElementById(i + "_1"), document.getElementById(i + "_2")]
		if (equal(n)) {
			win(n)
			return
		}
		n = [document.getElementById("0_" + i), document.getElementById("1_" + i), document.getElementById("2_" + i)]
		if (equal(n)) {
			win(n)
			return
		}
		n = [document.getElementById("0_0"), document.getElementById("1_1"), document.getElementById("2_2")]
		if (equal(n)) {
			win(n)
			return
		}
		n = [document.getElementById("0_2"), document.getElementById("1_1"), document.getElementById("2_0")]
		if (equal(n)) {
			win(n)
			return
		}
	}
}

/*function checkit() {
	boxes.forEach(function(val) {
		if (val[0] != "" && val[0] == val[1] && val[0] == val[2]) {
			win(val)
		}
		else {
			diag = []
			for (i=0; i<3; i++) {
				diag.push(boxes[i][i])
			}
			if (diag[0] != "" && diag[0] == diag[1] && diag[0] == diag[2]) {
				win(diag)
			} else {
				diag = []
				for (i=0; i<3; i++) {
					diag.push(boxes[i][2-i])
				}
				if (diag[0] != "" && diag[0] == diag[1] && diag[0] == diag[2]) {
					win(diag)
				}
			}
		}
	})
}*/

function win(val) {
	for (i=0; i<val.length; i++) {
		val[i].setAttribute("style", "background-color: yellow;")
	}
	play = false
	statusref.innerText = turn + " won!"
}