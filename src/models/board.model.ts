import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';

const boardSchema = new Schema({
    name: String,
    color: String,
    readableId: String,
    lists: [{
        type: {type: Schema.Types.ObjectId, ref: 'List'},
    }],
    users: [{
        type: {type: Schema.Types.ObjectId, ref: 'User'},
    }],
});

boardSchema.statics.create = function(name: string, callback) {
    const board = new this({
        name,
        color: '#2666fe',
        readableId: name.substr(0, 10),
    });

    board.save(callback);
};

mongoose.model('Board', boardSchema);