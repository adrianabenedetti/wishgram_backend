export const validatePassword = (req, res, next) => {
    const {password} = req.body;
    const regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!regularExpression.test(password)) {
        return res.status(401).send('password must be at least 8 character, and must contain at least a symbol, a number, a lowercase and a uppercase letter')
    }
    next();
}