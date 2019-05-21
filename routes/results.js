var express = require('express');
var router = express.Router();

/* GET location listing. */
router.get('/', async function(req, res, next) {
	var result = await appController.findDests(req.query);
  	res.send(result);
});

module.exports = router;
