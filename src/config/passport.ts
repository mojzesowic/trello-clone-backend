import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';

import * as mongoose from 'mongoose';
const User = mongoose.model('User');

passport.use(new BasicStrategy((username: string, password: string, done) => {
    User.findOne({ email: username }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user || !user.validatePassword(password)) {
            return done(null, false);
        }
        done(null, user);
    });
}));
