import { ICategory } from '@vrhood/shared';

import { Application, ModelName } from '../declarations';

export default function (app: Application) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;

    const schema = new Schema<ICategory>({
        name: { type: String, required: true },
        icon: { type: String, required: true },
        color: { type: String }
    }, {
        timestamps: true
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    /*if (mongooseClient.modelNames().includes(ModelName.CATEGORY)) {
        mongooseClient.deleteModel(ModelName.CATEGORY);
    }*/

    return mongooseClient.model(ModelName.CATEGORY, schema);
}
