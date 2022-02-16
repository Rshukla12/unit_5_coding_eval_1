const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) return res.status(400).json({status: "failure", msg: errors.array()});
    next();
};

module.exports = validator;