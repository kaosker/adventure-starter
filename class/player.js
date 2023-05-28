const { Food } = require("./food");
const { Room } = require("./room");

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        const item = this.currentRoom.getItemByName(itemName);

        if (item) {
            this.items.push(item);
            let indexNum = this.currentRoom.items.indexOf(item);
            this.currentRoom.items.splice(indexNum, 1); // first way of doing in IMO better readability
        }
    }

    dropItem(itemName) {
        const item = this.getItemByName(itemName);

        if (item) {
            this.currentRoom.items.push(item);
            this.items.splice(this.items.indexOf(item), 1); // here i splice the item, and also find the location of item in the same code line
        }

    }

    eatItem(itemName) {
        const item = this.getItemByName(itemName);

        if (item instanceof Food) {
            this.items.splice(this.items.indexOf(item), 1);
        }

    }

    getItemByName(name) {
       return this.items.find(item => item.name === name);
    }
}

module.exports = {
  Player,
};
