//1.imports

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
//7
require("dotenv").config();

//7.1. Instalar y configuar EL JWT y bcrypt
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//2. arrancar el servidor

const app = express();

//3. configurar

app.use(cors());
app.use(express.json()); //siempre usar

// 5. conexion base de datos: mysql - siempre igual
async function getConnection(){
    //crear y configurar conexion
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password:"Jhonathan123",
        database:"colombianSongs",
    });

    connection.connect();
    return connection;
}

const generateToken = (payload) => {
    const token = jwt.sign(payload, "secreto", { expiresIn: "12h" });
    return token;
  };

//4. escuchar servidor

const port = 4000;
app.listen(port, ()=>{
    console.log(`servidor iniciado en http://localhost:${port}`);
});

//6. crear endpoints

//6.1 Insertar una entrada en su entidad principal - ID

app.get("/allSongs/:id", async(req, res)=> {

//obtener el id: url params
const idAllSongs = req.params.id;

//validacion
if(isNaN(parseInt(idAllSongs))){
    res.json({
        success: false,
        error: "Ingresa un numero"
    });
    return;
}

// select a la DB por id
let query = "SELECT * FROM colombianSongs.favoriteSongs WHERE id = ?";

const conn = await getConnection()
//ejecutar consulta por id
const [results] = await conn.query(query, [idAllSongs]);
const numOfElements = results.length;

//validacion cuando no existe
if(numOfElements === 0){
    res.json({
        success: true,
        message: "No existe una cancion con ese ID. Ingrese un nuevo numero",
    });
    return;
}

res.json({
    results: results[0],
    });
});

//6.2 Leer/listar todas las entradas existentes

app.get("/allSongs", async(req, res)=>{
    //select a la DB
    let query = "SELECT * FROM colombianSongs.favoriteSongs";
    //hacer conexion DB
    const conn = await getConnection();
    //ejecutar consulta
    const [results] = await conn.query(query);
    console.log(results);

    //* longitud del array
    const numOfElements = results.length;

    //enviar una respuesta
    res.json({
        info: {count: numOfElements}, //numero de elementos que trae la lista*
        results: results,
    });

});

//6.3 Actualizar una entrada existente (PUT)
//id: url params
//info actualizar: body params

app.put("/allSongs/:id", async (req, res) => {

    const infoSongs = req.body; 
    const { name,author,year,genre,comments } = infoSongs;

    const idAllSongs = req.params.id;

    let query = "UPDATE favoriteSongs SET name=?,author=?,year=?,genre=?,comments=? WHERE id = ?";

    const conn = await getConnection();
    const [results] = await conn.query(query, [name, author, year, genre, comments, idAllSongs,]);

    res.json({
        success: true,
        message: "Se ha actualizado el registro correctamente",
    });
});

//6.4 insertar una nueva entrada (POST)

app.post("/addSongs", async(req, res) => {

    const infoSongs = req.body; 
    const { name,author,year,genre,comments } = infoSongs;

    //consulta
    let addQuery = "INSERT INTO `favoriteSongs`(`name`,`author`,`year`,`genre`,`comments`) VALUES (?,?,?,?,?)";

    try{
        //hacer conexion DB
        const conn = await getConnection();
        //ejecutar consulta
        const [results] = await conn.query(addQuery, [name,author,year,genre,comments]);

        //validar si se inserto o no
        if(results.affectedRows === 0){
            res.json({
                success: false,
                message: "No se ha podido insertar la cancion, revisa los datos"
            });
            return;
        };

        //enviar una respuesta
        res.json({
            success: true,
            id: results.insertId, //nuevo elemento agregado
        });
    } catch(error){
        res.json({
            success: false,
            message: `Se ha generado un error${error}`,
        });
    }
});

//6.5 Eliminar una entrada existente (DELETE)

app.delete("/allSongs/:id", async(req, res)=>{

    const idAllSongs = req.params.id;

    let query = "DELETE FROM favoriteSongs WHERE id = ?;";

    const conn = await getConnection();
    const [results] = await conn.query(query, [idAllSongs,]);

    res.json({
        success: true,
        message: "Se ha eliminado el registro correctamente",
    });
});


//7.2 Proceso de registro
//email,usuario, contraseña
app.post("/register", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
    //encriptar la contraseña
    const passwordHashed = await bcrypt.hash(password, 10); //aumentar la seguridad de contraseña encriptada
  
    // prepara la consulta sql
    const query = "INSERT INTO `usuarios_db`(`email`, `username`, `password`) VALUES (?,?,?)";
  
    const conn = await getConnection();
  
    const [results] = await conn.query(query, [email,username,passwordHashed]);
    conn.end();

    res.json({
      success: true,
      id: results.insertId,
    });
  });

  //7.3 Proceso de login
//usuario y la contraseña
app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    //Ver si el usuario existe : en bd
    const query = "SELECT * FROM colombianSongs.usuarios_db WHERE username = ?";
  
    const conn = await getConnection();
  
    const [usuarios_db] = await conn.query(query, [username]);
    const user = usuarios_db[0]; // solo me quedo con el primer usuario
    console.log(user);
  
    //Comprobar si el usuario y la contraseña coincide con la que está en BD: bcrypt
    const wellPass =
      user === null
        ? false
        : await bcrypt.compare(password, user.password);
  
    //Si el usuario no existe o la contraseña es incorrecta -> credenciales no válidas
    if (!(wellPass && user)) {
      return res.json({ success: false, error: "Credenciales inválidas" });
    }
  
    //si el usuario existe y la contraseña coincide: generar un token
    const infoToken = {
      username: user.username,
      id: user.id,
    };
  
    const token = generateToken(infoToken);
  
    res.json({ success: true, token, username: user.username });
  //
  });
  



  

