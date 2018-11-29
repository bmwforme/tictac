var userMove = true;
var items;
var gameEnded = false;
var firstClick = true;
var playerScore = 0;
var computerScore = 0;
var polesUsed = 0;

window.onload = start;

function start(){
  document.getElementById("communicate").innerHTML = "To start game, click on any pool!";
  items = Array.from(Array(3), () => new Array(3));
  setupBoard();
}

function setupBoard()
{
	var div="";
	for(var i=1; i<=9; i++)
	{
		var element = "s"+i;
		div = div + '<div class="single-square" id="'+element+'" onclick="check('+i+')"></div>';
		if(i%3 == 0) div = div + '<div style="clear:both;"</div>';
	}
	
	document.getElementById("game-board").innerHTML = div;
}

function check(nr)
{
	var element = "s"+nr;
	
	if(firstClick) { document.getElementById("communicate").innerHTML = ""; firstClick = false;}
	
	if(userMove && document.getElementById(element).innerHTML !="O" && !gameEnded)
	{
		changeElementStyle(element, "X", "default", "#24272E");
		setArray(nr, 'X');
		polesUsed++;
		checkForWin();
		userMove = false;
		if(polesUsed==9) won("draw");
		if(!gameEnded) computerMove();
	}
}

function computerMove()
{
   var element;
   var rand;
   
   do {
	   rand = Math.floor(Math.random() * 9) + 1;
	   element = "s" + rand;
      }
   while (document.getElementById(element).innerHTML == "X" || document.getElementById(element).innerHTML == "O")
	   
           changeElementStyle(element, "O", "default", "#24272E");	
           polesUsed++;
		   setArray(rand, 'O');
		   checkForWin();
		   if(polesUsed == 12) won("draw");
           if(!gameEnded) userMove = true;
		   
   
  /* 
   for(let i=1; i<=9; i++)
   {
	   element = "s"+i;
	   if(document.getElementById(element).innerHTML != "X" && document.getElementById(element).innerHTML != "O" )
	   {
		   changeElementStyle(element, "O", "default", "#24272E");	
           polesUsed++;
		   setArray(i, 'O');
		   checkForWin();
		   if(polesUsed == 12) won("draw");
           if(!gameEnded) userMove = true;
		   break;
	   }
   }*/
}

function changeElementStyle (elementpassed, character, cursorstyle, color)
{

	document.getElementById(elementpassed).innerHTML = character;
    document.getElementById(elementpassed).style.cursor = cursorstyle;	
	document.getElementById(elementpassed).style.backgroundColor = color;
		
}

function changeAllElementsStyle ()
{
    
	for(let i=1; i<=9; i++)
    {
	   element = "s" + i;
	   if(document.getElementById(element).innerHTML == "")
	   {		   
         changeElementStyle(element, "", "default", "#24272E");	
		
	   }
    }
}

function setArray(nr, character)
{
	
	switch (nr)
	{
	case 1:
	  items[0][0] = character;
	  break;
	case 2:
	  items[0][1] = character;
	  break;
	case 3:
	  items[0][2] = character;
	  break;
	case 4:
	  items[1][0] = character;
	  break;
	case 5:
	  items[1][1] = character;
	  break;
	case 6:
	  items[1][2] = character;
	  break;
	case 7:
	  items[2][0] = character;
	  break;
	case 8:
	  items[2][1] = character;
	  break;
	case 9:
	  items[2][2] = character;
	  break;
	}
	  
}

function checkForWin()
{
	if (items[0][0] == items[0][1] && items[0][0] == items[0][2] && items[0][0] != null)
	{
		won(items[0][0]);
		
	}
	else if (items[1][0] == items[1][1] && items[1][0] == items[1][2] && items[1][0] != null)
	{
		won(items[1][0]);
		
	}
	else if (items[2][0] == items[2][1] && items[2][0] == items[2][2]  && items[2][0] != null)
	{
		won(items[2][0]);
		
	}
	else if (items[0][0] == items[1][0] && items[0][0] == items[2][0] && items[0][0] != null)
	{
		won(items[0][0]);
		
	}
	else if (items[0][1] == items[1][1] && items[0][1] == items[2][1] && items[0][1] != null)
	{
		won(items[0][1]);
		
	}
	else if (items[0][2] == items[1][2] && items[0][2] == items[2][2] && items[0][2] != null)
	{
		won(items[0][2]);
		
	}
	else if (items[0][0] == items[1][1] && items[0][0] == items[2][2] && items[0][0] != null)
	{
		won(items[0][0]);
		
	}
	else if (items[2][0] == items[1][1] && items[2][0] == items[0][2] && items[2][0] != null)
	{
		won(items[2][0]);
		
	}	
}

function won(winner)
{
	switch(winner){
		case 'X':
		
		document.getElementById("communicate").innerHTML = "Congratulations! You have won the game!" + '<span id = "next-round" onclick="nextRound()"> Once again?</span>';
		playerScore+=1;
		document.getElementById("player-score").innerHTML = playerScore;
		break;
		case 'O':
		computerScore+=1;
		document.getElementById("computer-score").innerHTML = computerScore;
		document.getElementById("communicate").innerHTML = "Opss.. You have lost the game! Wanna try again?" + '<span id = "next-round" onclick="nextRound()"> Once again?</span>';
		break;	
		case 'draw':
		document.getElementById("communicate").innerHTML = "It's a draw!" + '<span id = "next-round" onclick="nextRound()"> Once again?</span>';
		break;
	}
	gameEnded = true;
	changeAllElementsStyle();
	
}

function clearBoard()
{
	   for(let i=1; i<=9; i++)
    {
	   element = "s"+i;
	   document.getElementById(element).innerHTML = ""; 
    }
}

function nextRound()
{
	document.getElementById("communicate").innerHTML = "";
	gameEnded = false;
	firstClick = true;
	userMove = true;
	polesUsed = 0;

	start();
}
	
