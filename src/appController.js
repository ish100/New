ENTITES = {
	INVENTORY : "inventory",
    USERS: "users"
}

class AppController {



    init() {
        this.currentUser = null;
        this.allUsers = null;
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
        var THIS = this;
    	return _.without(_.map(this.inventory.destinations, function(item){
    		if ((_.includes(item["company"], query["company"].toLowerCase())) &&
    			(_.includes(item["season"], query["season"].toLowerCase())) &&
    			(_.includes(item["kind"], query["kind"].toLowerCase())) &&
    			(query["priceLimit"]["leastAmount"] <= item.cost) &&
    			(item.cost <= query["priceLimit"]["mostAmount"])) {
                item["favourited"] = (THIS.currentUser && THIS.currentUser.favourites.includes(item["name"].toLowerCase())) ? true : false;
                return item;
            }
    			
    	}), undefined);
    }

    addIfNewUser(newuser) {
        var THIS = this;
        return new Promise(async (resolve, reject) => {
            rClient.getKey(ENTITES.USERS).then((data) => {
                newuser["favourites"] = [];
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

    isUserAvailable(userattempt) {
        var THIS = this;
        return new Promise((resolve, reject) => {
            rClient.getKey(ENTITES.USERS).then((data) => {
                if (data) {
                    var users = JSON.parse(data);
                    for (var i=0; i<users.users.length ; i++) {
                        var user = users.users[i];
                        if (user.uname === userattempt.uname && user.pass == userattempt.pass) {
                            THIS.currentUser = user;
                            THIS.allUsers = users;
                            resolve(true);
                        }
                    }
                    resolve(false);
                } 
                // No users available or failed login
                resolve(false);
            });
        });
    }

    saveToFavourites(location) {
        var THIS = this;
        return new Promise((resolve, reject) => {
            var locationToAdd = location.location;
            if (THIS.currentUser.favourites.includes(locationToAdd)) {
                resolve(false);
            } else {
                THIS.currentUser["favourites"].push(locationToAdd);
                rClient.addKeyValue(ENTITES.USERS, JSON.stringify(THIS.allUsers));
                resolve(true);
            }
        });
    }
}

module.exports = AppController;