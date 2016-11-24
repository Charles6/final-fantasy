var battleOrder = [];
var turn = 0;
var round = 1;


function newOrder(){
  for (var i = 0; i < 4; i++) {
    positionNum = i+1;
    lineUP[i].position = "p"+positionNum;
    console.log(lineUP[i]);
    console.log(lineUP[i].spd);
    battleOrder.push(lineUP[i]);
  };

  for (var i = 0; i < lineUPmon.length; i++) {
    console.log(lineUPmon[i]);
    console.log(lineUPmon[i].spd);
    battleOrder.push(lineUPmon[i]);
  };

  for (var i = 0; i < battleOrder.length; i++){
    console.log(battleOrder[i].name);
  };

  for (var i = 0; i < battleOrder.length; i++){
    battleOrder[i].spd = Math.floor(Math.random()*battleOrder[i].spd);
  };

  battleOrder.sort(function(a, b) {
      return parseFloat(a.spd) - parseFloat(b.spd);
  });

  battleOrder.reverse();
};




function newRound(){
  newOrder();
  console.log("Round "+round);
  for (var i = 0; i < battleOrder.length; i++){
    battleOrder[i].turn = i;
    console.log("turn "+battleOrder[i].turn+": "+battleOrder[i].name+" spd: "+battleOrder[i].spd);
  };
  nextTurn();
};
newRound();



function addButtons(){
	for (var i = 0; i < selection.length; i++) {
		selection[i].addEventListener('click', select);
	};
}
addButtons();

var pAtkSelect;

function select() {
  selectStore = this.id;
  if (battleOrder[turn].type == "monster"){
    console.log("Monster is attacking.");
  } else if (battleOrder[turn].type == "player"){
    if (selectStore == "p1" || selectStore == "p2" || selectStore == "p3" || selectStore == "p4"){
      document.getElementById(selectStore).style.borderColor = "red";
    } else{
      console.log("You clicked "+selectStore);
      for (var i = 0; i < lineUPmon.length; i++) {
        if (selectStore == lineUPmon[i].position){
          pAtkSelect = lineUPmon[i].number;
        };
      };
      playerAtk();
    };
  };




	// if (clickOne == false) {
	// 	selectStore1 = this.id;
	// 	document.getElementById(selectStore1).style.borderColor = "red";
	// 	clickOne = true;
	// 	console.log("First pick: "+this.id);
	// } else if (clickTwo == false){
	// 	selectStore2 = this.id;
	// 	document.getElementById(selectStore2).style.borderColor = "yellow";
	// 	clickTwo = true;
	// 	console.log("second pick: "+this.id);
	// } else {
	// 	document.getElementById(selectStore1).style.borderColor = "black";
	// 	document.getElementById(selectStore2).style.borderColor = "black";
	// 	clickOne = false;
	// 	clickTwo = false;
	// 	console.log("reset");
	// };
};


function nextTurn(){
  console.log("this is turn: "+turn);
  if (turn >= battleOrder.length){
    round++;
    console.log("Round "+round);
    battleOrder = [];
    turn = 0;
    newRound();
  } else if (battleOrder[turn].type == "monster"){
    console.log("It is now "+battleOrder[turn].name+"'s turn.");
    document.getElementById(battleOrder[turn].position).style.borderColor = "green";
    monsterAtk();
  } else {
    console.log("It is now "+battleOrder[turn].name+"'s turn.");
    document.getElementById(battleOrder[turn].position).style.borderColor = "green";
  };
};

function monsterAtk(){
  monAtkPower = Math.floor(Math.random()*battleOrder[turn].atk);
  monAtkSelect = Math.floor(Math.random()*lineUP.length);
  playerDefPower = Math.floor(Math.random()*lineUP[monAtkSelect].def);
  playerLoss = monAtkPower-playerDefPower;
  if (playerLoss <= 0){
    playerLoss = 0;
  };
  lineUP[monAtkSelect].hp = lineUP[monAtkSelect].hp-playerLoss;
  console.log(battleOrder[turn].name+" attacks "+lineUP[monAtkSelect].name+" for "+monAtkPower+" damage.");
  console.log(lineUP[monAtkSelect].name+" loses "+playerLoss+" HP.");
  pUpdate = monAtkSelect+1;
  document.getElementById("p"+pUpdate+"HP").innerHTML = "HP: "+lineUP[monAtkSelect].hp;
  setTimeout(function () {
    document.getElementById(battleOrder[turn].position).style.borderColor = "black";
    turn++;
    nextTurn();
  }, 1000);
};

function playerAtk() {
  console.log("You are attacking "+lineUPmon[pAtkSelect].name);
  pAtkPower = Math.floor(Math.random()*battleOrder[turn].atk);
  monDefPower = Math.floor(Math.random()*lineUPmon[pAtkSelect].def);
  monLoss = pAtkPower - monDefPower;
  if (monLoss <= 0){
    monLoss = 0;
  };
  lineUPmon[pAtkSelect].hp = lineUPmon[pAtkSelect].hp - monLoss;
  console.log(lineUPmon[pAtkSelect].name+" loss "+monLoss+" HP. It is now at "+lineUPmon[pAtkSelect].hp);
  document.getElementById(battleOrder[turn].position).style.borderColor = "black";
  turn++;
  nextTurn();
}
