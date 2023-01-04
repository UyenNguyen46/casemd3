let http = require('http')
let fs = require('fs')
let qs = require('qs')
let userService = require('./service/userService.js')
const cookie = require('cookie')
const router =require('./controller/router')
const handler = require ('./controller/router');
const NotFoundRouting= require('./controller/handle/notFoundRouting');
const url = require("url");
function getUrl(req){
    const urlParse=url.parse(req.url,true);
    const  pathname = urlParse.pathname;
    return pathname.split('/');
}
const server = http.createServer((req, res) => {
    const arrPath = getUrl(req);

    let trimPath = '/';
    if (arrPath.length > 2) {
            trimPath += arrPath[1]  ;
    } else {
        trimPath += arrPath[arrPath.length - 1];
    }
    let chosenHandler;
    if (typeof handler[trimPath]==='undefined'){
        chosenHandler=NotFoundRouting.showNotFound
    }else {
        chosenHandler=handler[trimPath];
    }
    chosenHandler(req,res,+arrPath[2]);
})
server.listen(8080,()=>{
    console.log('Server is running')
})