const fs = require('fs');

const inputs = fs.readFileSync('input.txt', { encoding: 'UTF-8' });
const lines = inputs.split('\n');

// The first line is our room dimensions
const [roomWidth, roomHeight] = lines.shift().split(' ').map(Number);
// The second line is our hoover start
let [hooverX, hooverY] = lines.shift().split(' ').map(Number);


// All subsequent lines up until the last one are dirt
let dirtPatches = [];
while (lines.length > 1) {
    let dirtSpot = lines.shift().split(' ').map(Number);
    dirtPatches.push(dirtSpot)
}

// The last line is the directions
const directions = lines.shift().split('');

let cleanedSpots = 0;
// Process all movements
directions.forEach(direction => {
    // Apply the movement but remember that the coordinates are 0-based
    // so the room dimensions have one subtracted when constraining movement.
    if ('N' === direction) {
        hooverY = Math.min(roomHeight - 1, hooverY + 1)
    } else if ('S' === direction) {
        hooverY = Math.max(0, hooverY - 1)
    } else if ('E' === direction) {
        hooverX = Math.min(roomWidth - 1, hooverX + 1)
    } else if ('W' === direction) {
        hooverX = Math.max(0, hooverX - 1)
    }

    // This is a big hard to read but we can't do an equality match on arrays
    // so instead we hard-check each x/y coordinate pair
    let dirtPatchesHere = dirtPatches.filter(([dpX, dpY]) => dpX === hooverX && dpY === hooverY).length;

    // If we found none, we add none, no big deal
    cleanedSpots += dirtPatchesHere;

    // This effectively keeps any dirt patches that aren't exactly where we are now,
    // meaning the hoover can pick up multiple dirt spots that were defined in the inputs, 
    // because its so powerful ;)
    dirtPatches = dirtPatches.filter(patch => patch[0] !== hooverX || patch[1] !== hooverY)
})

console.log(`${hooverX} ${hooverY}`);
console.log(`${cleanedSpots}`);

