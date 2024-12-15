import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv  from "dotenv";
import User from "../models/userModels.js";

dotenv.config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3009/auth/google/callback",
    },async (accessToken, refreshToken, profile, cb) => {

       try {
     const user =  await User.findUserByGoogleId(profile.id);
     console.log('facebook',user)

     if(user){
   // Si el usuario ya existe, devolver el usuario encontrado
        console.log('existe',user)
        return cb(null,user)
     }else{
        // Si el usuario no existe, crear un nuevo usuario
        const newUser = {
            googleId: profile.id,
            nombre: profile.displayName,
            correo: profile.emails[0].value,
            imagen:  profile.photos[0].value
            }

            console.log(`Creando un nuevo usuario : ${newUser}`)


            //Se agrega un nuevo usuario a la base de datos
            const createUser= await User.addGoogleUser(newUser);

            // Retorna el usuario recien creado
            return cb(null, createUser);


        }
     

       } catch (error) {
         // Manejo de errores en caso de que ocurra un problema
         return done(error, null);
        
       }

    
        
}))


passport.serializeUser((user,done)=> done(null,user))

passport.deserializeUser(async (user,done)=>{
    try {
        done(null,user)
    } catch (error) {
        done(error,null)
    }
})