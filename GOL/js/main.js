var patterns = {
	sixbit : "#N 6 bits #O Robert Wainwright #C http://conwaylife.com/wiki/6_bits #C http://conwaylife.com/patterns/6bits.rle x = 40, y = 23, rule = B3/S23 21bo$21bo$20bobo$21bo$21bo$21bo$21bo$20bobo$21bo$21bo5$2bo2bo4bo2bo$3o2b6o2b3o$2bo2bo4bo2bo$22b2o$21b2o$23bo$32bo4bo$30b2ob4ob2o$32bo4bo!",
	spaceship64p2h1v0 : "#N 64P2H1V0 #O Dean Hickerson #C The smallest period 2 spaceship, discovered on July 28, 1989. Has speed c/2. #C http://www.conwaylife.com/wiki/index.php?title=64P2H1V0 x = 31, y = 8, rule = B3/S23 5b3o15b3o5b$4bo3bo13bo3bo4b$3b2o4bo11bo4b2o3b$2bobob2ob2o3b3o3b2ob2obobo2b$b2obo4bob2ob3ob2obo4bob2ob$o4bo3bo4bobo4bo3bo4bo$12bo5bo12b$2o7b2o9b2o7b2o!",
	gospreyglidergun : "#N Gosper glider gun #O Bill Gosper #C A true period 30 glider gun. #C The first known gun and the first known finite pattern with unbounded growth. #C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun x = 36, y = 9, rule = B3/S23 24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8bo3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!",
	piwave_3c10piwave : "#N 3c/10 pi wave #O Unknown #C http://conwaylife.com/wiki/3c/10_pi_wave #C http://conwaylife.com/patterns/3c10piwave.rle x = 45, y = 29, rule = B3/S23 4bo17bo17bo$3bobo15bobo15bobo$3bobo15bobo15bobo$3bobo15bobo15bobo4$3bobo15bobo15bobo2$2bo3bo13bo3bo13bo3bo$3b3o15b3o15b3o4$b2o3b2o11b2o3b2o11b2o3b2o$bo5bo11bo5bo11bo5bo$2b5o13b5o13b5o$2bobobo13bobobo13bobobo$bo5bo11bo5bo11bo5bo$bob3obo11bob3obo11bob3obo$bo5bo11bo5bo11bo5bo$4bo17bo17bo$4bo17bo17bo$4bo17bo17bo4$o7bo9bo7bo9bo7bo$o7bo9bo7bo9bo7bo!",
	canadagoose : "#N Canada goose #O Jason Summers #C A c/4 period 4 spaceship. At the time of its discovery, the Canada goose was the smallest known diagonal spaceship other than the glider, but this record has since been beaten, #C first by Orion 2, and more recently by the crab. #C www.conwaylife.com/wiki/index.php?title=Canada_goose x = 13, y = 12, rule = B3/S23 3o10b$o9b2ob$bo6b3obo$3b2o2b2o4b$4bo8b$8bo4b$4b2o3bo3b$3bobob2o4b$3bobo2bob2ob$2bo4b2o4b$2b2o9b$2b2o!",
	davidhilbert : "#N David Hilbert #C A period-23 oscillator found by Luka Okanishi on November 24, 2019 #C based on a partial result by Aidan F. Pierce. x = 33, y = 26, rule = B3/S23 7b2o15b2o$8bo15bo$6bo19bo$6b5o11b5o$10bo11bo$4b4o17b4o$4bo2bo17bo2bo$21bo$21bo$9bo4b2ob2o2bob2o$8b3o3b2obo6b2o$7bo2b2o6bo$7b3o12bo$22bobo$3b2o11b2o4bo2bo2b2o$3bo12b2o5b2o4bo$2obo12b2o11bob2o$ob2ob2o19b2ob2obo$5bo21bo$5bobo17bobo$6b2o17b2o$10bo11bo$6b5o11b5o$6bo19bo$8bo15bo$7b2o15b2o!",
	duelingbanjosgun : "#N duelingbanjosp24gun.rle #C http://conwaylife.com/wiki/Dueling_banjos #C http://conwaylife.com/patterns/duelingbanjosp24gun.rle x = 40, y = 31, rule = B3/S23 5b2ob2o15b2ob2o$5b2obo17bob2o$8bo5bo5bo5bo$8b2o4b2o3b2o4b2o$14bobobobo$3bobo9b2ob2o13b3o$b3ob3o24b6o$o7bo23bob3obo$2ob4obo22bo3bob2o$bo3bo25b4ob4o$bobo2b2o4b2obo3bob2o6b2o4bob3o$2bobob2o5b3o3b3o5b2obob2obo2b2o$3bob3o6bo5bo5b2o2bob2obob2o$5b3o18b3obo4b2o$5b3o18b4ob4o$5b3o19b2obo3bo$6b2o19bob3obo$7bo20b6o$5bobobo4b3o13b3o$4bobob2o12bobo$4bobo6bobobo5b2o$5b2o4b3obob3o3bo$10bo5bo3bo$9bobob2o2b2obo$9bob2o2b2o2bo$8b2o4bo2b2o9bobo$6bo2bobobo2bo12b2o$6b2o2b2ob4o12bo$12bo$12bobo$13b2o!",
	p48lwss : "#N p48lwss.rle #C http://conwaylife.com/wiki/Dueling_banjos #C http://conwaylife.com/patterns/p48lwss.rle x = 71, y = 67, rule = B3/S23 10b2ob2o15b2ob2o$10b2obo4b2o5b2o4bob2o$13bo2bo3b2ob2o3bo2bo$13b2obo11bob2o6bo$16bo11bo8b3o$8bobo6bo3bobo3bo7b2o3bo$6b3ob3o5b3o3b3o8b3o2b2o$5bo7bo5bo5bo14bobo$6bob6o3b3o5b3o4b2o2b4ob3o$6b2o4bo4b3o5b3o4b2obo4bo3bo$8bo3b2o4b2o5b2o4bobobob2obo3b2o$7bobo2bobo5bo3bo5b2o3bob2obobobo$8bo2bo6bo2bobo2bo4bo3bo4bob2o$11bo3bobo3bobo3bo4b3ob4o2b2o$11bo3bo2bo2bobo2bo6bobo16bo3bo$11bo6b3o3b3o7b2o2b3o10bobobobo$11bo2bo20bo3b2o11b2ob2o$12bo7bo15b3o$10bobobo5bo16bo$9bobob2o33b2o9b2o$9bobo6bo3bo7bo17bob4ob4obo$10b2o4b3obob3o6bo17bo3bobo3bo$15bo3b2o4bo3b3o17bo3bobo3bo$15bob2o2b2obobo23b3o3b3o$16bo2b2o2b2obo$17b2o2b2obob2o$11b3o5bo2bobobo2bo6bo$10b6o3b4ob2o2b2o7bo4bo2bo20bo2bo$10bob3obo6bo11b3o8bo23bo$9bo3bob2o4bobo7b2o9bo3bo19bo3bo$9b4ob4o3b2o9b2o9b4o20b4o$7b2o4bob3o13bo$5b2obob2obo2b2o$4b2o2bob2obob2o17b2o$4b3obo4b2o18b2o$4b4ob4o12b2o8bo$2o3b2obo3bo13b2o25b2o$2o3bob3obo13bo26bobo$6b6o40bo$4o4b3o29b2o4b2o2b2ob4o$o2bo35b2o5bo2bobo4bo$19b2o5b2o13bo6b2obob2o2b2o$20b2o5bo21bobo3b2o2bo$10bo8bo5bo23bobob2o2b2obo$10b2o11b4o23bo4bo4bo$2b3o6b2o9bo4bo2b2o14b2o3b3obob3o4b2o$3bobo4b2o9bob2ob2o2bo9b2o3b2o6b2ob2o6bobo$4b2o15bo2bo3b2o2bo6bo2bo4bo13b2obobo$20b2obo2b2o2b5o3bobobo18bobobo$4b2o12bo4bobobobo5bobo2bob2o19bo$3bobo4b2o6bob2o2bo2bobob2ob2ob2obo3bo17b2o$2b3o6b2o5bo3bobob2obob2obo5b2ob3o15b3o$10b2o8b2obobo3bo5bobobo3b3o15b3o$10bo10bobobo3bob3obo2b2o3b3o4bo5bo4b3o$21bo2bo5b2o2b2o7b3o3b3o3b3o3b3o3bo$22b2o9bobo2bob2o2bo3bo2b2ob2o2bo3b2o2bobo$o2bo14b2o8b3ob2ob4obob2o4b3o5b3o7bo2bo$4o3b2o10bo8bo2bo3bo3b2obo20bo$6bo3b9o10bobob2ob2o3bo2bo18b6obo$2o4bobob7o2b3o6b2ob2obobob2obob2o17bo7bo$2o3b2ob2o2b4o2bo2bo18bobo20b3ob3o$8bo2bo7b2o19bobo8b2ob2o9bobo$5b2obobobo28bo7b2obobob2o$6bo4bo32b2o3bo7bo3b2o$6bob3o33bo4b3o3b3o4bo$7b2o32b2obo17bob2o$41b2ob2o15b2ob2o!",
	sirrobin : "#N Sir Robin #O Adam P. Goucher, Tom Rokicki; 2018 #C The first elementary knightship to be found in Conway's Game of Life. #C http://conwaylife.com/wiki/Sir_Robin x = 31, y = 79, rule = B3/S23 4b2o$4bo2bo$4bo3bo$6b3o$2b2o6b4o$2bob2o4b4o$bo4bo6b3o$2b4o4b2o3bo$o9b2o$bo3bo$6b3o2b2o2bo$2b2o7bo4bo$13bob2o$10b2o6bo$11b2ob3obo$10b2o3bo2bo$10bobo2b2o$10bo2bobobo$10b3o6bo$11bobobo3bo$14b2obobo$11bo6b3o2$11bo9bo$11bo3bo6bo$12bo5b5o$12b3o$16b2o$13b3o2bo$11bob3obo$10bo3bo2bo$11bo4b2ob3o$13b4obo4b2o$13bob4o4b2o$19bo$20bo2b2o$20b2o$21b5o$25b2o$19b3o6bo$20bobo3bobo$19bo3bo3bo$19bo3b2o$18bo6bob3o$19b2o3bo3b2o$20b4o2bo2bo$22b2o3bo$21bo$21b2obo$20bo$19b5o$19bo4bo$18b3ob3o$18bob5o$18bo$20bo$16bo4b4o$20b4ob2o$17b3o4bo$24bobo$28bo$24bo2b2o$25b3o$22b2o$21b3o5bo$24b2o2bobo$21bo2b3obobo$22b2obo2bo$24bobo2b2o$26b2o$22b3o4bo$22b3o4bo$23b2o3b3o$24b2ob2o$25b2o$25bo2$24b2o$26bo!"
}
var timer = 0;
var time;
var generationtime = 1000;
var paused = true;
var cellsize = 10;
var mousedown = false;
var pattern;

function handleURLLoadButton(){
	
}
function handlePatternSelectChange(e){
	pattern = patterns[e.value];
}
function handlePatternLoadButton(){
	board.clearBoard();
	let parsed = parsePatternString(pattern);
	drawPattern(parsed);
}
function setDOMPatternSelect(){
	let patternsel = document.getElementById("patternselect");
	for(let key in patterns){
		let option = document.createElement("option");
		option.value = key;
		option.innerHTML = key;
		patternsel.appendChild(option);
	}
	pattern = patterns[patternsel.value];
}
document.body.onload = function(){
	setDOMPatternSelect();
	board.cells = createGrid(cellsize,cellsize);
	board.setNeighbours();
	console.log(board.cells);
	time = new Date().getTime();
	console.log(time);
	window.requestAnimationFrame(loop);
	handleSpeedSliderChange(document.getElementById("speed"));
	document.body.addEventListener('mousedown', function(e){
		mousedown = true;
	});
    document.body.addEventListener('mouseup', function(e){
    	mousedown = false;
    });
}
function drawPattern(pattern){
	let center = {x:board.cells[0].length/2, y:board.cells.length/2};
	let originx = center.x - pattern.width/2;
	let originy = center.y - pattern.height/2;
	let cursor = {x: Math.round(originx), y: Math.round(originy)};
	for(let i=0; i<pattern.array.length; i++){
		let row = pattern.array[i];
		for(let j=0; j<row.length; j++){
			let cellon = row[j];
			if(cellon == 1){
				board.cells[cursor.y][cursor.x].setLive(true);
			}
			cursor.x++
		}
		cursor.x = Math.round(originx);
		cursor.y++;
	}
}
function parsePatternString(string){
	let lines = string.split("rule = B3/S23");
    lines = lines[1].split("$");
    console.log(lines);
    let pattern = [];
    for(let i=0; i< lines.length; i++){
    	let line = lines[i];
    	let number = "";
    	pattern.push([]);
    	for(let j=0; j<line.length; j++){
    		let char = line[j];
    		if(char == "b"){
    			if(number == ""){
    				pattern[pattern.length-1].push(0);
    			}
    			else{
    				for(let a=0; a<parseInt(number); a++){
    					pattern[pattern.length-1].push(0);
    				}
    			}
    			number = "";		
    		}
    		else if(char == "o"){
    			if(number == ""){
    				pattern[pattern.length-1].push(1);
    			}
    			else{
    				for(let a=0; a<parseInt(number); a++){
    					pattern[pattern.length-1].push(1);
    				}
    			}
    			number = "";
    		}
    		else if(char != " "){
    			number += char.toString();
    		}
    	}
    }
    let max = 0;
    for(let i=0; i<pattern.length; i++){
    	let line = pattern[i];
    	if(line.length > max){
    		max = line.length;
    	}
    }
    return { width: max, height: pattern.length, array: pattern};
}
function loop(){
	if(!paused){
		timer += (new Date().getTime() -time);
		time = new Date().getTime();
	}
	
	if(timer > generationtime){
		board.updateBoard();
		timer = 0;
	}
	window.requestAnimationFrame(loop);
}
function togglePause(e){
	if(paused){
		paused = false;
		time = new Date().getTime();
		e.innerHTML = "Pause";
	}
	else{
		paused = true;
		e.innerHTML = "Play";
	}
}
var board = {
	cells : [],
	setNeighbours : function(){
		for(let i=0; i<this.cells.length; i++){
			let row = this.cells[i];
			for(j=0; j<row.length; j++){
				let cell = row[j];
				for(let x=-1; x<=1; x++){
					for(let y=-1; y<=1; y++){
						if(x!=0 || y!=0){
							let neighbourcoords = {x:cell.coords.x + x, y:cell.coords.y + y};
							if(neighbourcoords.x >=0 && 
								neighbourcoords.x <= row.length-1 &&
								neighbourcoords.y >= 0 &&
								neighbourcoords.y <= this.cells.length-1){

								cell.neighbours.push(this.cells[neighbourcoords.y][neighbourcoords.x]);
							}
						}
					}
				}
			}			
		}
	},
	updateBoard : function(){
		let updatelist = []
		for(let i=0; i<this.cells.length; i++){
			let row = this.cells[i];
			for(let j=0; j<row.length; j++){
				let cell = row[j];
				let liveneighbours = 0;
				for(let n=0; n<cell.neighbours.length; n++){
					if(cell.neighbours[n].live){
						liveneighbours++;
					}
				}
				if(cell.live){
					if(liveneighbours <2 || liveneighbours > 3){
						cell.destroy = true;
						updatelist.push(cell);
					}
				}
				else{
					if(liveneighbours == 3){
						cell.create = true;
						updatelist.push(cell);
					}
				}
			}
		}
		for(let i=0; i<updatelist.length; i++){
			updatelist[i].update();
		}
	},
	clearBoard : function(){
		for(let i=0; i<this.cells.length; i++){
			let row = this.cells[i];
			for(let j=0; j<row.length; j++){
				row[j].setLive(false);
			}
		}
		paused = true;
		document.getElementById("pause").innerHTML = "Play";
	}
}
class Cell{
	constructor(coords, div){
		this.create = false;
		this.destroy = false;
		this.live = false;
		this.neighbours = [];
		this.coords = coords;
		this.div = div;
	}
	setLive(on){
		if(on){
			this.live = true;
			this.div.style.backgroundColor = "black";
		}
		else{
			this.live = false;
			this.div.style.backgroundColor = "white";
		}
	}
	update(){
		if(this.create){
			this.setLive(true);
			this.create = false;
		}
		else if(this.destroy){
			this.setLive(false);
			this.destroy = false;
		}
	}
}
function createGrid(cellwidth,celheight){
	let cells = [];
	let columns = Math.floor(window.innerWidth/cellwidth);
	let rows = Math.floor(window.innerHeight/celheight);
	for(let i=0; i< rows; i++){
		cells.push([]);
		let row = document.createElement('div');
		row.className = "row";
		document.body.insertBefore(row, null);
		for(let j=0; j< columns; j++){
			cell = document.createElement('div');
			cell.className = "cell";
			cell = row.appendChild(cell);
			cell.style.width = cellwidth.toString() + "px";
			cell.style.height = celheight.toString() + "px";
			cell.setAttribute("data-x", j.toString());
			cell.setAttribute("data-y", i.toString());
			cell.setAttribute("onclick", "handleCellClick(this)");
			cell.setAttribute("onmouseenter", "handleCellMouseEnter(this)");
			cell.setAttribute("onmouseleave", "handleCellMouseLeave(this)");
			cells[i].push(new Cell({x:j,y:i}, cell));
		}
	}
	return cells;
}
function handleCellClick(e){
	let x = e.getAttribute("data-x");
	let y = e.getAttribute("data-y");
	let cell = board.cells[y][x];
	console.log(e.getAttribute("data-x").toString()+","+e.getAttribute("data-y").toString());
	if(!cell.live){
		cell.setLive(true);
	}
	else{
		cell.setLive(false);
	}	
}
function handleCellMouseEnter(e){
	let x = e.getAttribute("data-x");
	let y = e.getAttribute("data-y");
	let cell = board.cells[y][x];
	if(!cell.live){
		e.style.backgroundColor = "rgb(150,150,150)";
		if(mousedown){
			cell.setLive(true);
		}
	}
	else{
		e.style.backgroundColor = "red";
	}
}
function handleCellMouseLeave(e){
	let x = e.getAttribute("data-x");
	let y = e.getAttribute("data-y");
	let cell = board.cells[y][x];
	if(!cell.live){
		e.style.backgroundColor = "white";
	}
	else{
		e.style.backgroundColor ="black";
	}
}
function handleSpeedSliderChange(e){
	let label = document.getElementById("speedlabel");
	let val = e.value;
	generationtime = val;
	let valstring = val.toString();
	while(valstring.length < 4){
		valstring = "0" + valstring;
	}
	console.log(valstring);
	label.innerHTML = "speed: " + valstring;
}