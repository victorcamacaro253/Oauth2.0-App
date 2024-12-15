import { Router } from "express";
import passport from "passport";

const router =  Router();

//Ruta para iniciar la autenticacion con Facebook
router.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}))

//Ruta de callbakc para la autenticacion
router.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/login'}),
(req,res) => {
    res.redirect('http://localhost:5173/profile')
}

);

router.get('/profile',(req,res)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/')
    }
    res.json({
        user:req.user
        

    })
})

export default router;