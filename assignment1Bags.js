const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    COLOUR:   Symbol("Colour"),
    CLEANER:  Symbol("Cleaner")
});

module.exports = class BagsOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sColour = "";
        this.sCleaner = "";
        this.sItem = "backbag";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Conestoga's Bags.");
                aReturn.push("What size bag would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.COLOUR
                this.sSize = sInput;
                aReturn.push("What Colour would you like?");
                break;
            case OrderState.COLOUR:
                this.stateCur = OrderState.CLEANER
                this.sColour = sInput;
                aReturn.push("Would you like Cleaner with that?");
                break;
            case OrderState.CLEANER:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sCleaner = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sColour}`);
                if(this.sCleaner){
                    aReturn.push(this.sCleaner);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}