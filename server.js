const fs = require('fs');

let input = [];
let grid = [];
let coordinates = [];
let dirtCoordinates = [];
let instructions = [];

// hoover object containing its coordinates and how much dirt it has picked up
const hoover = {
    xPos: 0,
    yPos: 0,
    dirtCleaned: 0
};

// places hoover in the start position determined by the text file and calls the function that moves it
const placeHoover = (xInput,yInput) => {    
    hoover.xPos = parseInt(xInput);
    hoover.yPos = parseInt(yInput);
    hoover.coordinates= [hoover.xPos, hoover.yPos];
    console.log(`Hoover started at ${hoover.coordinates}`);
    // checks to see if hoover's starting coordinates go past the grid's limitations
    if(coordinates[1][0] > grid[0] || coordinates[1][1] > grid[1] || coordinates[1][0] < 0 ||coordinates[1][1] > grid[1] < 0) {
        return console.log(`Hoover has been placed outside of room dimensions`);
    };
    instructions.forEach(direction=> moveHoover(direction));
};

// takes in the instructions from the text file and moves the hoover.
const moveHoover = (direction) => {
    if (direction == 'N'){
        hoover.yPos = hoover.yPos + 1;
        changeCoordinates(direction);
    } else if (direction == 'S'){
        hoover.yPos = hoover.yPos - 1;
        changeCoordinates(direction);
    } else if(direction == 'E'){
        hoover.xPos = hoover.xPos + 1;
        changeCoordinates(direction);
    } else if(direction == 'W'){
        hoover.xPos = hoover.xPos - 1;
        changeCoordinates(direction);
    } else{
        return console.log(`${direction} is not a valid direction`);
    };
};

// changes the coordinates and checks to see if it has vacuumed dirt or hit a wall
const changeCoordinates = (direction) =>{
    hoover.coordinates= [hoover.xPos, hoover.yPos];
    console.log(`Hoover has moved ${direction} and its coordinates are now (${hoover.coordinates})`);
    checkForWall();
    checkCoordinates(hoover.coordinates);
};

// checks to see if hoover has hit the boundaries and make sure it does not go
// past the boundaries
const checkForWall = () => {
    const response = () => {
        console.log('Hoover has hit a wall and bounced back to its original space');
    };
    if(hoover.xPos > grid[0]){
        response();
        hoover.xPos = hoover.xPos - 1;
    } else if (hoover.yPos > grid[1]){
        response();
        hoover.yPos = hoover.yPos - 1;
    } else if(hoover.xPos < 0){
        response();
        hoover.xPos = hoover.xPos + 1;
    } else if(hoover.yPos < 0){
        response();
        hoover.yPos = hoover.yPos + 1;
    };  
};

// function checks the coordinates of the hoover to see if it is out of bounds or on dirt
const checkCoordinates = (currentPlacement) =>{
    let hooverPlacement = `${currentPlacement[0]}, ${currentPlacement[1]}`;
    dirtCoordinates.forEach(coordinate=>{
        let dirt = `${coordinate[0]}, ${coordinate[1]}`;
        if(dirt == hooverPlacement){
            const index = dirtCoordinates.indexOf(coordinate);
            console.log(`The hoover is at (${currentPlacement}) and has found dirt`);
            hoover.dirtCleaned = hoover.dirtCleaned + 1;
            if(index > -1){
                dirtCoordinates.splice(index, 1);
            };
        };
    });
};

// extracts the text file and parses it into multiple arrays that are used for the functions
const startHoover = () => {
    let j = 0;
    // this method reads the input file
    // converts it into a string
    // splits it into an array of characters 
    // filters out the spaces and indentations
    // then iterates over the array and pushes numbers into an array as coordinates
    fs.readFile('input.txt', (error,data)=>{
        if(error) throw error;
        input = data
                .toString()
                .split('')
                .filter(character=>character !== ' ' && character !='\n');
        for (let i = 0; i < input.length; i+=2){
            if(!isNaN(input[i])){
                coordinates[j] = ([input[i], input[i + 1]]);
                j = j + 1;
            };
        };
        grid[0] = coordinates[0][0];
        grid[1] = coordinates[0][1];
        // pushes any line of input between the second and the last line
        // into the dirt coordinates array
        for(let i = 2; i < coordinates.length; i++){
            dirtCoordinates.push(coordinates[i]);
        };
        dirtCoordinates = dirtCoordinates.map(item=>item.map(item=>parseInt(item)));
        // filters the letters in the input array and assigns the instructions variable as the filtered array
        instructions = input.filter(index => isNaN(index));
        placeHoover(coordinates[1][0], coordinates[1][1]);
        if(hoover.dirtCleaned == 1){
            return console.log(`Hoover ended at (${hoover.xPos}, ${hoover.yPos}) and vacuumed ${hoover.dirtCleaned} mound of dirt`);
        } else{
            return console.log(`Hoover ended at (${hoover.xPos}, ${hoover.yPos}) and vacuumed ${hoover.dirtCleaned} mounds of dirt`);
        };
    });
};

console.log(startHoover());
