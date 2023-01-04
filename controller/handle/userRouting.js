let http = require('http')
let fs = require('fs')
let qs = require('qs')
let userService = require("../../service/userService");
let postService = require("../../service/postService");
let cookie = require("cookie");


class UserRouting {
    static login(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/login.html', "utf-8", async (err, loginHtml) => {
                res.writeHead(200, 'text/html');
                await res.write(loginHtml);
                res.end();
            })
        } else {
            let data = ''
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async (err) => {
                if (err) {
                    alert('duong dan loi')
                }
                let user = qs.parse(data)
                let users = await userService.login(user)
                if (users.length === 0) {
                    res.writeHead(301, {'location': '/login'})
                    res.end()
                } else {
                    res.setHeader('cookie', cookie.serialize('name', JSON.stringify(users[0]), {
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 7
                    }));
                }
            })
        }
    }

    static signup(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/signup.html', "utf-8", async (err, loginHtml) => {
                res.writeHead(200, 'text/html');
                await res.write(loginHtml);
                res.end();
            })
        } else {
            let data = ''
            req.on('data', chunk => {

                data += chunk
            })

            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                }
                const user = qs.parse(data);
                const mess = await userService.signup(user);
                res.writeHead(301, {'location': '/login'});
                res.end();
            })
        }
    }


    static showHome(req, res) {
        fs.readFile('./views/home.html', 'utf8', async (err, homeHtml) => {
            if (err) {
                console.log(err)
            } else {
                let posts = await postService.getPost();
                res.write(homeHtml)
                res.end();
            }
        })
    }

    static showMyHome(req, res) {
        fs.readFile('./views/myHome.html', "utf-8", async (err, homeHtml) => {
            res.writeHead(200, 'text/html');
            let posts = await postService.getPost();

            let html = ``
            for (let i = 0; i < posts.length; i++) {
                html += `<div class="col-3">
                            <div class="card">
                                <img class="card-img-top" src="${posts[i].image} " alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">${posts[i].userName}</h5>
                                        <p class="card-text">${posts[i].content}</p>
                                            <a href="/mycontent/${posts[i].id}" class="btn btn-primary">More</a>
                                      </div>
                                    </div>
                                    </div>  
                                    `

            }
            homeHtml = homeHtml.replace('{posts}', html);
            await res.write(homeHtml);
            res.end();
        })
    }

    static myContent(req, res, id) {
        fs.readFile('./views/detail.html', "utf-8", async (err, homeHtml) => {
            res.writeHead(200, 'text/html');
            let posts = await postService.getPost(id);
            console.log(posts)
            let html = ``;
            for (let i = 0; i < posts.length; i++) {
                html += `
                                    <div class="col-3">
                                       
                                           <h4>${posts[i].userName}</h4> 
                                           <h5> ${posts[i].content}</h5>
                                         <img src="${posts[i].image}" alt="" >   
                                           <h4> ${posts[i].createTime}</h4>
                                          <a href="/edit/${posts[i].id}" class="btn btn-danger">EDIT</a>
                                          <a href="/delete/${posts[i].id}" class="btn btn-danger">DELETE</a>
                                        </div>
                                    
                                   
                               `
            }
            homeHtml = homeHtml.replace('{post}', html);
            await res.write(homeHtml);
            res.end();
        })
    }

    static deletePost(req, res, id) {
        if (req.method === "GET") {
            fs.readFile('./views/delete.html', 'utf8', async (err, deleteHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    deleteHtml = deleteHtml.replace('{id}', id);
                    res.write(deleteHtml);
                    res.end();
                }
            })
        } else {
            let mess = userService.remove(id)
            res.writeHead(301, {'location': '/myhome'})
            res.end()
        }

    }

    static editPost(req, res, id) {
        if (req.method === 'GET') {
            console.log(1)
            fs.readFile('./views/edit.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let post = await userService.findById(id)
                    // editHtml = editHtml.replace('{name}',post[0].name);
                    editHtml = editHtml.replace('{content}', post[0].content);
                    editHtml = editHtml.replace('{createTime}', post[0].createTime);
                    editHtml = editHtml.replace('{image}', post[0].image);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            })
        } else {
            console.log(2)
            let editData = ''
            req.on('data', chunk => {
                editData += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const product = qs.parse(editData);
                    const mess = await userService.editPost(product, id);
                    res.writeHead(301, {'location': '/myhome'});
                    res.end();
                }
            })
        }
    }

    static createPost(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/create.html', 'utf-8', async (err, createHtml) => {
                if (err) {
                    console.log(err.message);
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(createHtml);
                    res.end();
                }
            })
        } else {
            let data = ''
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const post = qs.parse(data);
                    const mess = await userService.save(post);

                    res.writeHead(301, {'location': '/home'})
                    res.end();
                }
            })
        }
    }

}

module.exports = UserRouting;