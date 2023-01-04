const NotFoundRouting = require('./handle/notFoundRouting');
const UserRouting = require('./handle/userRouting');

const handel = {
    '/login': UserRouting.login,
    '/signup': UserRouting.signup,
    "/home": UserRouting.showHome,
    "/myhome": UserRouting.showMyHome,
    "/mycontent": UserRouting.myContent,
    "/edit": UserRouting.editPost,
    "/delete":UserRouting.deletePost,
    "/create":UserRouting.createPost,
}
module.exports = handel;