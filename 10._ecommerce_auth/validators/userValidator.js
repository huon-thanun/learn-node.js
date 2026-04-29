
const joi = require('joi');

const registerUserSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'លេខសម្ងាត់ត្រូវមាន អក្សរធំ អក្សរតូច លេខ និងនិមិត្តសញ្ញាពិសេសយ៉ាងតិចមួយ',
            'string.min': 'លេខសម្ងាត់ត្រូវមានយ៉ាងតិច {#limit} ខ្ទង់',
        }),
});

const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.required()
})

module.exports = { registerUserSchema, loginUserSchema };