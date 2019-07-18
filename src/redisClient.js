const redis = require('async-redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('ready', function() {
    console.log("Redis is ready");
});
client.on('error', function() {
    console.log("Error in Redis");
});

const ENTITIES = {
    LOCATIONS        :   "locations"
}

class RedisActions {

    async addKeyValue(key, value) {
        console.log("storing " + value);
        await client.set(key,value);
    }

    getKey(key) {
        return new Promise( async (resolve, reject) => {
            var val =  await client.get(key);
            resolve(val);
        });
    }

}

module.exports = RedisActions;