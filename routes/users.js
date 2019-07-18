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

router.post('/saveToFavourites', async function(req, res, next) {
	var body = req.body;
	if (!appController.currentUser) {
		res.send({
			status: "UNAUTHED"
		});
	} else {
		appController.saveToFavourites(body).then((isAdded) => {
			res.send({
				status: isAdded
			});
		});
	}
});


module.exports = router;