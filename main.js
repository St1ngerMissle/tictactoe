document.addEventListener('DOMContentLoaded', function () {
	const cells = document.querySelectorAll('.cell');
	cells.forEach((cell, index) => {
		cell.addEventListener('click', () => fillCell(index));
	});

	const resetBtn = document.getElementById('resetBtn');
	resetBtn.addEventListener('click', clearBoard);
});

const x = "\u{274C}";
const o = "\u{2B55}";
var turn = false;
var gaming = true;
var filledCells = new Map();

function fillCell(num){
	if(gaming && filledCells.get(num) == null){
		turn = !turn;
		markCell(num);
		setTimeout(() => {
			filledCells.set(num,turn);
			if(filledCells.size == 9)
				gameover(false);
			winCheck(num);
		}, 1);
	}
}

function markCell(num){
	document.getElementById("c"+num).innerText += turn ? x : o;//getDiag(num);//getRow(num) +","+ getCol(num);
}

function winCheck(num){
	if(filledCells.size >= 5){
		for(let i = 0; i < 3; i++){
			let ln = getLine(num,i);
			if(ln != null){
				if(num == 4){
					checkLine(ln[0]);
					checkLine(ln[1]);
				} else checkLine(ln);
			}
		}
	}
}

function checkLine(ln){
	for(let i = 0; i < 3; i++)
		if(!(filledCells.get(ln[i]) != null && filledCells.get(ln[i]) == turn))
			return false;
	gameover(true,ln);
}

function getCol(num){
	return num % 3;
}

function getRow(num){
	if(num < 3)
		return 0;
	if(num < 6)
		return 1;
	return 2;
}

function getDiag(num){
	if(num % 2 == 0) {
		if(getCol(num) == 1)
			return 2;
		if(getCol(num) != getRow(num))
			return 1;
		return 0;
	} return -1;
}

function getLine(num,type){
	switch(type){
		case 0:
			num = num % 3;
			return [num, num + 3, num + 6];
		case 1:
			if(num < 3)
				return [0,1,2];
			if(num < 6)
				return [3,4,5];
			return [6,7,8];
		case 2:
			switch(getDiag(num)){
				case -1:
					return null;
				case 0:
					return [0,4,8];
				case 1:
					return [2,4,6];
				case 2:
					return [[0,4,8],[2,4,6]]
			}
	}
}

function gameover(wasWinner,ln){
	if(wasWinner){
		for(let i = 0; i < 3; i++)
			document.getElementById("c"+ln[i]).setAttribute('style','background-color: #0f0');
		setTimeout(() => alert((turn ? x : o) +" wins!"),50);
	} else
		alert("Draw!");
	gaming = false;
}

function clearBoard(){
	turn = false;
	filledCells = new Map();
	for(let i = 0; i <= 8; i++)
		document.getElementById("c"+i).innerText = "";
	gaming = true;
}