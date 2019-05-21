ENTITES = {
	INVENTORY : "inventory"
}

class AppController {

    init() {

    }

    constructor() {
    	var THIS = this;
    	rClient.getKey(ENTITES.INVENTORY)
    	.then((data) => {
            if (data) {
                THIS.inventory = JSON.parse(data);
                console.log("inventory: " + data);
            } else {
            	console.log("No data found!");
            }
        });
    }

    async findDests(query) {
    	return _.without(_.map(this.inventory.destinations, function(item){
    		if ((_.includes(item["company"], query["company"].toLowerCase())) &&
    			(_.includes(item["season"], query["season"].toLowerCase())) &&
    			(_.includes(item["kind"], query["kind"].toLowerCase())) &&
    			(query["priceLimit"]["leastAmount"] <= item.cost) &&
    			(item.cost <= query["priceLimit"]["mostAmount"]))
    			return item;
    	}), undefined);
    }
}

module.exports = AppController;