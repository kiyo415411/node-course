const express = require('express');
const router = express.Router();

router.get('/info', (req, res, next) => {
    if (req.session.member) {
        return res.json(req.session.member);
    } else {
        return res.status(403).json({ code: 2001, error: '尚未登入' });
    }
});
module.exports = router;
