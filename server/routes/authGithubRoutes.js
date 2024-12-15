import { Router } from "express";
import passport from "passport";


const router  = Router();

router.get('/auth/github',passport.authenticate('github',{scope:['user: email']}))

router.get('/auth/github/callback',passport.authenticate('github',{failureRedirect:'/'}),
    (req,res)=>{
        res.redirect('http://localhost:5173/profile')
    }
)

router.get('/profile',(req,res)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/')
    }
    res.json({
        user:req.user
        

    })
})

export default router