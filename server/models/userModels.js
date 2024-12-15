import { query as _query,pool } from '../db/db.js';


class User{


    static async addUserGoogle({ google_id, nombre, correo, imagen }) {
        const result = await _query('INSERT INTO usuario (google_id, nombre, correo, imagen) VALUES (?, ?, ?, ?)',
            [google_id, nombre, correo, imagen]
        );
    
     // Ahora, busca el usuario insertado usando su ID
  const insertedUser = await _query('SELECT * FROM usuario WHERE id = ?', [result.insertId]);
    
  return insertedUser[0]; // Asegúrate de retornar solo el primer resultado
    }

   static  async addUserFacebook({ facebook_id, nombre, correo, imagen }) {
        const result = await _query('INSERT INTO usuario (facebook_id, nombre, correo, imagen) VALUES (?, ?, ?, ?)',
            [facebook_id, nombre, correo, imagen]
        );
    
     // Ahora, busca el usuario insertado usando su ID
  const insertedUser = await _query('SELECT * FROM usuario WHERE id = ?', [result.insertId]);
    
  return insertedUser[0]; // Asegúrate de retornar solo el primer resultado
    }

   static  async addUserGithub({ github_id, nombre, correo, imagen }) {
        const result = await _query('INSERT INTO usuario (github_id, nombre, correo, imagen) VALUES (?, ?, ?, ?)',
            [github_id, nombre, correo, imagen]
        );
    
     // Ahora, busca el usuario insertado usando su ID
  const insertedUser = await _query('SELECT * FROM usuario WHERE id = ?', [result.insertId]);
    
  return insertedUser[0]; // Asegúrate de retornar solo el primer resultado
    }

    
  static  async addUserTwitter({ twitter_id, nombre, correo, imagen }) {
        const result = await _query('INSERT INTO usuario (twitter_id, nombre, correo, imagen) VALUES (?, ?, ?, ?)',
            [twitter_id, nombre, correo, imagen]
        );
    
     // Ahora, busca el usuario insertado usando su ID
  const insertedUser = await _query('SELECT * FROM usuario WHERE id = ?', [result.insertId]);
    
  return insertedUser[0]; // Asegúrate de retornar solo el primer resultado
    }

  static  async findUserByGoogleId(googleId) {
        const query = 'SELECT * FROM usuario WHERE google_id = ?';
        const [rows] = await _query(query, [googleId]);
        return rows;
    }

   static async findUserByFacebookId(facebookId) {
        const query = 'SELECT * FROM usuario WHERE facebook_id = ?';
        const [rows] = await _query(query, [facebookId]);
        return rows;
    }

   static async findUserByGithubId(githubId) {
        const query = 'SELECT * FROM usuario WHERE github_id = ?';
        const [rows] = await _query(query, [githubId]);
        return rows;
    }

   static  async findUserByTwitterId(twitterId) {
        const query = 'SELECT * FROM usuario WHERE twitter_id = ?';
        const [rows] = await _query(query, [twitterId]);
        return rows;
    }

    static async findByEmail(email) {
        const results = await _query('SELECT * FROM usuario WHERE correo = ?', [email]);
        return results;
    }


    static async findByCedula(cedula){
        const results = await _query('SELECT * FROM usuario WHERE cedula = ?', [cedula]);
        return results.length > 0
    }

    static async addMultipleUsers(users){
        const queries= users.map(user=>{
            const {name,apellido,cedula,email,password,rol,imagen} = user;
            return _query('INSERT INTO usuario (nombre, apellido, cedula, correo, contraseña,rol,imagen) VALUES (?, ?, ?, ?, ?,?,?)',
                [name,apellido,cedula,email,password,rol,imagen]
            )
        })

        const result = await Promise.all(queries)
        return result
    }


    static async updateUser(id,updateFields,values){
        const setClause = updateFields.map(field=> `${field} = ?`).join(',')

        const query = `UPDATE usuario SET ${setClause} WHERE id= ?`;

        const finalValues= values.concat(id)

        const result= await _query(query,finalValues)

        return result;
        
    } 



}

export default User