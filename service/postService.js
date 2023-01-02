const Connection = require('../model/connection');
Connection.connected();

class PostService {
    static getPost() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query('select * from post', (err, data) => {
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



