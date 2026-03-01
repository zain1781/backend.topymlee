const Joi = require('joi');

// Define Joi schema
const signup = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    company: Joi.string().optional().allow(''),
    location: Joi.string().optional().allow('')
});

// Validation middleware
const validateSignup = (req, res, next) => {
    const { error } = signup.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateSignup
};
