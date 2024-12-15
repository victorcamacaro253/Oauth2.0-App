import { compare } from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/userModels.js';
import passport from 'passport';

// Local authentication strategy
passport.use(new LocalStrategy({
    usernameField: 'email', // Specify the field for the username
    passwordField: 'password' // Specify the field for the password
}, async (email, password, done) => {
    try {
        const result = await User.findByEmail(email);
        const user= result[0]
        console.log(user)
        if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
        }
console.log(password,email)
        const isMatch = await compare(password, user.contraseña); // Ensure 'contraseña' is the hashed password field
        if (!isMatch) {
            return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user); // Authentication successful
    } catch (err) {
        console.error("Error during authentication:", err);
        return done(err);
    }
}));

// Serialize user for session
passport.serializeUser ((user, done) => {
    done(null, user.id); // Store user ID in session
});

// Deserialize user from session
passport.deserializeUser (async (id, done) => {
    try {
        const user = await User.getUserById(id);
        done(null, user); // Attach user to request object
    } catch (err) {
        done(err, null);
    }
});