const fs = require('fs');

let grid = [];
let coordinates = [];
let dirtCoordinates = [];
let instructions = [];
let input = [];


const hoover = {
    xPos: Number,
    yPos: Number,
    dirtCleaned: 0
};

const checkCoordinates = (currentPlacement) =>{
    let hooverPlacement = `${currentPlacement[0]}, ${currentPlacement[1]}`;
    dirtCoordinates.forEach(coordinate=>{
        let dirt = `${coordinate[0]}, ${coordinate[1]}`;
        if(dirt == hooverPlacement){
            console.log(`The hoover is at (${currentPlacement}) and has found dirt`);
            hoover.dirtCleaned = hoover.dirtCleaned + 1;
            const index = dirtCoordinates.indexOf(coordinate);
            if(index > -1){
                dirtCoordinates.splice(index, 1);
                console.log(dirtCoordinates);
            }
        };
    });
};

const placeHoover = (xInput,yInput) => {    
    hoover.xPos = parseInt(xInput);
    hoover.yPos = parseInt(yInput);
    hoover.coordinates= [hoover.xPos, hoover.yPos];
    console.log(`Hoover started at ${hoover.coordinates}`);
    if(coordinates[1][0] > grid[0] || coordinates[1][1] > grid[1] || coordinates[1][0] < 0 ||coordinates[1][1] > grid[1] < 0) return `Hoover has been placed outside of room dimensions`;
    instructions.forEach(direction=> moveHoover(direction));
};

const moveHoover = (direction) => {
    if (direction == 'N'){
        hoover.yPos = hoover.yPos + 1;
        hoover.coordinates= [hoover.xPos, hoover.yPos];
        console.log(`Hoover has moved ${direction} and its coordinates are now (${hoover.coordinates})`);
        checkCoordinates(hoover.coordinates);
    } else if (direction == 'S'){
        hoover.yPos = hoover.yPos - 1;
        hoover.coordinates= [hoover.xPos, hoover.yPos];
        console.log(`Hoover has moved ${direction} and its coordinates are now (${hoover.coordinates})`);
        checkCoordinates(hoover.coordinates);
    } else if(direction == 'E'){
        hoover.xPos = hoover.xPos + 1;
        hoover.coordinates= [hoover.xPos, hoover.yPos];
        console.log(`Hoover has moved ${direction} and its coordinates are now (${hoover.coordinates})`);
        checkCoordinates(hoover.coordinates);
    } else if(direction == 'W'){
        hoover.xPos = hoover.xPos - 1;
        hoover.coordinates= [hoover.xPos, hoover.yPos];
        console.log(`Hoover has moved ${direction} and its coordinates are now (${hoover.coordinates})`);
        checkCoordinates(hoover.coordinates);
    } else{
        return console.log(`${direction} is not a valid direction`);
    }
}

// output: display final hoover position
//         display patches vacuumed

const setUp = () => {
    let j = 0;
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
        dirtCoordinates = coordinates.slice(1).slice(-3);
        dirtCoordinates = dirtCoordinates.map(item=>item.map(item=>parseInt(parseInt(item))));
        instructions = input.filter(index => isNaN(index));
        placeHoover(coordinates[1][0], coordinates[1][1]);
        return console.log(`Hoover ended at (${hoover.xPos}, ${hoover.yPos}) and vacuumed ${hoover.dirtCleaned} mounds of dirt`);
    });
};

console.log(setUp());
