import passport from "passport";
import  { Strategy as TwitterStrategy } from 'passport-twitter'
import dotenv  from 'dotenv';
import User from  '../models/userModels.js';

dotenv.config();


passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3009/auth/twitter/callback',
    includeEmail: true // Incluye el email en la respuesta

    },
    async (token, tokenSecret, profile, done) =>{
     
      try {
                            
   const user=  await User.findUserByTwitterId(profile.id)

    if(user){
        //Si el usuario ya existe lo devuelve
        return done(null, user)
    }else{
        //Si no existe lo crea y lo devuelve
        const newUser= {
            twitter_id: profile.id,  
            nombre: profile.displayName,
            correo: profile.emails ? profile.emails[0].value : null,
            imagen :  profile.photos ? profile.photos[0].value : null

            }

            user =  await User.addUserTwitter(newUser)

            return done(null,user)

        }
    }  catch (error) {
                            
        return  done(error,null)
    }
}
));

passport.serializeUser((user,done)=>{
    done(null,user.id) // Almacena la id del usuario 
})

passport.deserializeUser(async (id,done)=>{
    try {
        const user=  await User.getUserById(id)
    done(null,user)
    } catch (error) {
        done(error,null)
    }
})
