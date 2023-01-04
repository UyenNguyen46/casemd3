const Connection = require('../model/connection');
Connection.connected();

class PostService {
    static getPosts(){
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select * from post `, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            });
        })
    }
    static getPost(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select * from post join user u on post.idUser = u.idUser where post.id = ${id}`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            });
        })
    }

}

module.exports = PostService



