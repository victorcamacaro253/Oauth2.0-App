import { Router } from "express";
import passport from "passport";

const router= Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/user',  // Redirige a la ruta protegida después de la autenticación
    failureRedirect: '/login',      // Redirige a la página de login en caso de error
}));

router.get('/auth/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        //Redirigir a inicion despyues de cerrar sesion
        res.redirect('http://localhost:3009/')
    })
})


export default router