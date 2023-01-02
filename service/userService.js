const connection1 = require('../model/connection');
connection1.connected();
class UserService {
    login(user) {
        let sql = `select * from user where userName = '${user.username}' and idUser = '${user.password}'  `;
        let connect = connection1.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, user) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(user)
                }
            })

        })
    }
}
module.exports = new UserService()
