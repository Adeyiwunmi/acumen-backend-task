var express = require('express');
var router = express.Router();
const {registerNewUser, verifyUserEmail, login} = require('../services/user-service')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
    return registerNewUser(req, res);
});
router.post('/verify-user', function (req, res, next) {
    return verifyUserEmail(req, res);
});

router.post('/login', function (req, res, next) {
    return login(req, res);
});
module.exports = router;
