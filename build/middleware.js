const iamMiddleware = (req, res, next) => {
    console.log('from middeware');
    next();
};
export { iamMiddleware };
