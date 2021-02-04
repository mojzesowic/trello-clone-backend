import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as passport from 'passport';
import * as jwt from 'express-jwt';

import './db';
import v1Router from './routes/api.v1';

import './config/passport';
import { register } from './controllers/user.cotroller';
import { loggedIn } from './config/access';

const auth = jwt({
    secret: 'DO NOT SAVE YOUR SECRET HERE',
    userProperty: 'payload',
});

const app = express();

if (app.get('env') === 'development') {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Expose-Headers', 'set-cookie');
        next();
    });
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', auth, loggedIn, v1Router);
app.get('/login', (req, res, next) => passport.authenticate('basic', (err, user) => {
    if (!err && user) {
        res.json({ token: user.generateJwt() });
    }

    res.sendStatus(401);
})(req, res, next));
app.post('/register', register);

export default app;
