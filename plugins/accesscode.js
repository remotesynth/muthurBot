exports.accessCode = function accessCode(cb) {
    // if the access code has been set, return it, if not, respond differently
    this.user.getVar('accesscode', (e, ac) => {
    if (ac !== null) {
        cb(null, 'ACCESS CODE IS ' + ac);
        } else {
        cb(null, 'NOT YET AUTHORIZED');
        }
    });
}