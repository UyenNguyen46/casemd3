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
                    res.writeHead(301, {'location': '/'})
                    res.end()
                } else {
                    res.setHeader('cookie', cookie.serialize('name', JSON.stringify(users[0]), {
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 7
                    }));

                    fs.readFile('./views/home.html', "utf-8", async (err, homeHtml) => {
                        res.writeHead(200, 'text/html');
                        let posts = await postService.getPost();
                        let html = ``
                        posts.map((post, index) => {
                            html += ` 
                                <div class="col-6 mt-2">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">${post.idUser}</h5>
                                            <p class="card-text">${post.content}</p>
                                        </div>
                                    </div>
                                </div>`
                        })
                        homeHtml = homeHtml.replace('{posts}', html);
                        await res.write(homeHtml);
                        res.end();
                    })
                }


            })


        }
    }
}

module.exports = UserRouting;