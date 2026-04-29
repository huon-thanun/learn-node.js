const { allow } = require("joi");

const validateMiddleware = (schema) => (req, res, next) => {
    const {error, value } = schema.validate(req.body, {
        abortEarly: false,
        // allowUnknown: true
    })

    if (error)  {
        return res.status(400).json({
            message: 'Invalid fields.',
            details: error.details.map((err) => err.message).join(', ')
        })
    }

    // console.log(error);
    // console.log(value);

    req.validData = value;
    next();
};

module.exports =  validateMiddleware 