
var selection = document.getElementsByClassName("cell");
var monSelection = document.getElementsByClassName("mName");

var monNum = 1;
var lineUP = [];
var lineUPmon = [];

function populatePlayers(){
	for (var i = 0; i < 4; i++) {
		var slotIndex = i+1;
		pickCharacter("p"+slotIndex);
		console.log("Player "+slotIndex+" is a "+lineUP[i].name);
	};
};
populatePlayers();

function pickCharacter(slot) {
	var charSelect = Math.floor(Math.random()*4);
	switch(charSelect) {
		case 0:
			populateCharacter(fighter,slot);
			break;
		case 1:
			populateCharacter(thief,slot);
			break;
		case 2:
			populateCharacter(blackMage,slot);
			break;
		case 3:
			populateCharacter(whiteMage,slot);
			break;
		default:
			console.log("error Character select");
	};
};

function populateCharacter(classPick,slot) {
	document.getElementById(slot).innerHTML = classPick.symbol;
	document.getElementById(slot+"Name").innerHTML = classPick.name;
	document.getElementById(slot+"HP").innerHTML = "HP: "+classPick.hp;
	document.getElementById(slot+"MP").innerHTML = "MP: "+classPick.mp;
	document.getElementById(slot+"XP").innerHTML = "XP: "+classPick.xp;
	lineUP.push(classPick);
};

function populateMonsters() {
	for (var i = 0; i < 9; i++) {
		monSelect = Math.floor(Math.random()*3);
		if (monSelect == 0){
			document.getElementById("m"+i).innerHTML = dog.symbol;
			dogId = monNum
			document.getElementById("mN"+i).innerHTML = "dog "+dogId;
			lineUPmon.push({
				name: "Dog"+dogId,
				type: "monster",
				number: dogId-1,
				hp: dog.hp,
				def: dog.def,
				atk: dog.atk,
				spd: dog.spd,
				position: "m"+i
			});
			monNum++;
		};
	};
};
populateMonsters();
