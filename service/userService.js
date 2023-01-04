const connection1 = require('../model/connection');
connection1.connected();

class UserService {
    login(user) {
        let connect = connection1.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`select userName, password
                           from user
                           where userName = '${user.username}'
                             and password = '${user.password}';`,
                (err, users) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log('ok ')
                        resolve(users)
                    }
                }
            )
        })
    };

    signup(user) {
        let connect = connection1.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`insert into user (userName, password)
                           values ('${user.Username}', '${user.password}')`, (err) => {
                if (err) {
                    reject(err)
                } else {
                    console.log("tạo xong tài khoản")
                    resolve('tạo xong tài khoản')
                }
            })
        })
    }

    fillAll() {
        let connect = connection1.getConnection();
        return new Promise(((resolve, reject) => {
            connect.query('select * from post', (err, post) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(post)
                }
            })
        }))
    }

    save(post) {
        let connect = connection1.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`insert into post(createTime, name, image, description)
                           values (${post.createTime}, '${post.name}', '${post.image}', '${post.description}
                                   ')`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Tao thanh cong!')
                }
            })
        })

    }

    remove(id) {
        let connect = connection1.getConnection();
        let sql = `delete *
                   from blog.post
                   where id = ${id}`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('Xoa thah cong')
                }
            })
        })

    }

    editPost(post, id) {
        let connect = connection1.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`update post
                           set content       = '${post.content}',
                               createtime = '${post.createTime}',
                               image      = '${post.image}'
                               
                           where id = ${id}`, (err, post) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("đã sửa")
                    resolve(post);
                }
            })
        })
    }
    findById(id) {
        let conn = connection1.getConnection();
        console.log(connection1)
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM post WHERE id = ${id}`,(err, post) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(post);
                }
            })
        })
    }
    searchPost(search) {
        let connection1 = connection1.getConnection();
        let sql = `SELECT * FROM post WHERE name LIKE '%${search}%'`
        return new Promise((resolve, reject) => {
            connection1.query(sql,(err, post) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(post);
                }
            })
        })
    }


}

    module
.
    exports = new UserService()
