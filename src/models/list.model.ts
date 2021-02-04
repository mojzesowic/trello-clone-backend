import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';

const listSchema = new Schema({
    title: String,
    cards: {
        type: [
            {
                title: String,
            },
        ],
    },
});

listSchema.statics.create = function(title: string, callback) {
    const list = new this({
        title,
    });

    list.save(callback);
};

mongoose.model('List', listSchema);