import * as mongoose from 'mongoose';

const databaseUrl = 'mongodb://localhost/trello';

mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + databaseUrl);
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error ', err);
    process.exit(1);
});

mongoose.connection.on('disconnected', () => {
    console.error('No connection to database');
    process.exit(1);
});

import './models/user.model';
import './models/board.model';
import './models/list.model';
