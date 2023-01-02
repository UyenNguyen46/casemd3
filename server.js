let http = require('http')
let fs = require('fs')
let qs = require('qs')
let userService = require('./service/userService.js')
const cookie = require('cookie')

const handler = require ('./controller/router');
const NotFoundRouting= require('./controller/handle/notFoundRouting');
const url = require("url");
function getUrl(req){
    const urlParse=url.parse(req.url,true);
    const  pathname = urlParse.pathname;
    return pathname.split('./');
}
const server = http.createServer((req, res) => {
    const arrPath = getUrl(req);
    const trimPath = arrPath[arrPath.length-1];
    console.log(arrPath)
    let chosenHandler;
    if (typeof handler[trimPath]==='undefined'){
        chosenHandler=NotFoundRouting.showNotFound
    }else {
        chosenHandler=handler[trimPath];
    }
    chosenHandler(req,res);
})
server.listen(8080,()=>{
    console.log('Server is running')
})