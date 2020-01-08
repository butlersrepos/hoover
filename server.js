const fs = require('fs');

let grid = [];
let coordinates = [];
let instructions = [];
let input;

const hoover = {
    xPos: Number,
    yPos: Number,
};

const checkRoomLimits = ()=>{
        if(hoover.xPos + 1 > grid[0] || hoover.yPos + 1 > grid[1] ){
            return `Cannot move there as it would take the hoover outside room limitations`;
        } else {
            // console.log('')
        }
};

const placeHoover = (xInput,yInput) => {    
    hoover.xPos = parseInt(xInput);
    hoover.yPos = parseInt(yInput);
    hoover.coordinates= `(${hoover.xPos}, ${hoover.yPos})`;
    if(coordinates[1][0] > grid[0] || coordinates[1][1] > grid[1] || coordinates[1][0] < 0 ||coordinates[1][1] > grid[1] < 0) return `Hoover has been placed outside of room dimensions`;
    instructions.forEach(direction=> console.log(moveHoover(direction)));
    return `Hoover started at ${hoover.coordinates}`;
};

const moveHoover = (direction) => {
    if (direction == 'N'){
        // console.log(checkRoomLimits());
        hoover.yPos = hoover.yPos + 1;
        hoover.coordinates= `(${hoover.xPos}, ${hoover.yPos})`;
    } else if (direction == 'S'){
        hoover.yPos = hoover.yPos - 1;
        hoover.coordinates= `(${hoover.xPos}, ${hoover.yPos})`;
    } else if(direction == 'E'){
        hoover.xPos = hoover.xPos + 1;
        hoover.coordinates= `(${hoover.xPos}, ${hoover.yPos})`;
    } else if(direction == 'W'){
        hoover.xPos = hoover.xPos - 1;
        hoover.coordinates= `(${hoover.xPos}, ${hoover.yPos})`;
    } else{
        return `${direction} is not a valid direction`;
    }
    return `Hoover has moved ${direction} and its coordinates are now ${hoover.coordinates}`;
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
        instructions = input.filter(index => isNaN(index));
        console.log(placeHoover(coordinates[1][0], coordinates[1][1]));
    });
};

console.log(setUp());
