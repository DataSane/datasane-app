var database = require('../configs/database/connection'); 

async function authLogin(email, senha) {
    console.log('User Model accessed > function autenticarLogin');

    var sqlCommand = `
        SELECT userid, isadmin, username FROM user
        WHERE email = "${email}" AND password = "${senha}";
    `;
    console.log("Running SQL command: \n" + sqlCommand);

    return await database.execute(sqlCommand).then(resultQuery => {
    
        if (resultQuery && resultQuery.length > 0) {
            return {
                 success: true, 
                 bd_userid: resultQuery[0].userid,
                 bd_isadmin: resultQuery[0].isadmin,
                 bd_username: resultQuery[0].username
            };
        } else {
            return { 
                success: false,
                 message: 'Credenciais de login inválidas.' 
            };
        }
    })
    .catch(error => {
        console.error(error);
        return { success: false, message: 'Error to execute auth login' };
    });;
}

async function isAdmin(userId){
    console.log('User model accessed > isAdmin');

    const sqlCommand = `
        SELECT isadmin FROM user 
        WHERE userid = ?;
    `;

    const resultQuery = await database.execute(sqlCommand, userId);


    return resultQuery[0].administrador;
}

function getAllUser(){
    console.log('Starting get all user');

    const sqlCommand = `
        SELECT * FROM user;
    `;

    return database.execute(sqlCommand);
}

function addUser(name, email, senha, confSenha, acesso){
    console.log('Starting add user');

    const sqlCommand = `
       INSERT INTO user (username, email, password, isadmin) VALUES 
        ('${name}', '${email}', '${senha}', ${acesso});
    `;

    return database.execute(sqlCommand);
}

function updateUser(idUser, name, email, senha, confSenha, acesso){
    console.log('Starting update user');

    const sqlCommand = `
       UPDATE user
            SET 
                username = '${name}',
                email = '${email}',
                password = '${senha}',
                isadmin = ${acesso}
            WHERE 
                userid = ${idUser};
    `;

    return database.execute(sqlCommand);
}

function deleteUser(idUser){
    console.log('Starting delete user');

    const sqlCommand = `
       DELETE FROM user WHERE userid = ${idUser};
    `;

    return database.execute(sqlCommand);
}

function getUserWithId(idUser){
    console.log('Starting get user with id');

    const sqlCommand = `
       SELECT * FROM user WHERE userid = ${idUser};
    `;

    return database.execute(sqlCommand);
}

module.exports = {
    authLogin,
    isAdmin,
    getAllUser,
    addUser,
    deleteUser,
    getUserWithId,
    updateUser
};

