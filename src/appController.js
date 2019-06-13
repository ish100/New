ENTITES = {
	INVENTORY : "inventory",
    USERS: "test1"
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

    addIfNewUser(newuser) {
        var THIS = this;
        return new Promise(async (resolve, reject) => {
            rClient.getKey(ENTITES.USERS).then((data) => {
                if (data) {
                    var users = JSON.parse(data);
                    var isUserExists = _.some(users.users, function (user) {
                        return user.uname === newuser.uname;
                    });
                    if (!isUserExists) {
                        users.users.push(newuser);
                        rClient.addKeyValue(ENTITES.USERS, JSON.stringify(users));
                    }
                    resolve(isUserExists);
                } else {
                    var users = {"users" : [newuser]};
                    rClient.addKeyValue(ENTITES.USERS, JSON.stringify(users));
                    resolve(false);
                }
            });
        }); 
    }
}

module.exports = AppController;