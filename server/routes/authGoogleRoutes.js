import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)


router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req,res)=>{
        res.redirect('http://localhost:3009/index')
    }
)

/*
router.get('/profile',(req,res)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/')
    }
    res.json({
        user:req.user
        

    })
})

*/
router.get('/logout', (req, res) => {
    req.logout(() => {
      res.redirect('http://localhost:3009');
    });
  });

  export default router