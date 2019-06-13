var express = require('express');
var router = express.Router();

/* GET user listing. */
router.post('/register', async function(req, res, next) {
	var body = req.body;
	appController.addIfNewUser(body).then((isExists) => {
		res.send({
			status: isExists ? "DUPLICATE" : "AUTHED"
		});
	});
});

router.post('/isAuth', async function(req, res, next) {
	var body = req.body;
	appController.isUserAvailable(body).then((isUser) => {
		res.send({
			status: isUser ? "AUTHED" : "UNAUTHED"
		});
	});
});


module.exports = router;