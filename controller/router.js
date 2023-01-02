
const NotFoundRouting=require('./handle/notFoundRouting');
const UserRouting=require('./handle/userRouting');
const handel={
    '/': UserRouting.login
}
module.exports = handel;