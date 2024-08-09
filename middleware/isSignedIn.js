function isSignedIn(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        return res.redirect('/users/login');
    }
}

module.exports =  isSignedIn;