import passport from 'passport';
import { Strategy as LocalStrategies } from 'passport-local';
import users from '../Model/Users.js';

passport.use(new LocalStrategies({ usernameField: 'email' }, async(email, password, done) =>
{
     const user = await users.findOne({email});
     if(!user || user.password !== password)
        return done(null, false);
    return done(null, user);
}));

passport.serializeUser((user,done) =>
{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>
{
    const user = await users.findById(id);
    done(null, user);
});