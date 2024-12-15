import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/userModels.js";
import dotenv  from "dotenv";

dotenv.config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3009/auth/facebook/callback',
    profileFields :['id','displayName','emails','photos'] //campos a obtener
    
}, async  (accessToken, refreshToken, profile, done) => {

try {
    
    let user= await User.findUserByFacebookId(profile.id);

    if(user){
        return done(null,user);
    }else{
        const newUser ={
            facebook_id: profile.id,
            nombre: profile.displayName,
            correo: profile.emails[0].value,
            imagen: profile.photos[0].value
        }

        user = await User.addUserFacebook(newUser);

        return done(null,user)

    }

} catch (error) {
return done (error,null)
    
}
}))

passport.serializeUser((user,done)=>{
 done(null,user.id)
})


passport.deserializeUser(async (id,done)=>{

    try {
        const user = await User.getUserById(id)
    done(null,user)
    
    } catch (error) {
        done(error,null)
    }
        
})