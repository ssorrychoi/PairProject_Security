var express = require('express');
var router = express.Router();
const Member = require('../models').Member;

const crypto = require('crypto');

router.post('/', function (req, res, next) {
    const result = {msg: 'Modify Error'};
    
    const secret = req.body.name;				//secret값을 rslt에서 name을 가져옴
            const hash = crypto.createHmac('sha256', secret)		//login페이지에서 입력한 pwd를 해싱
                .update(req.body.password)
                .digest('hex');

    Member.update({
        password: hash,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    }, {
        where: {
            user_id: req.session.login_id,
        }
    })
        .then((rslt) => {
            console.log(rslt);
            

            req.session.loginState = false;

            result.msg = "수정 완료";
            console.log(result.msg);

            res.json(JSON.stringify(result));
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;