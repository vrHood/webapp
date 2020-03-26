import { IUser, UserRole } from '@vrhood/shared';

import { Application, ModelName } from '../declarations';

export default function (app: Application) {
    const mongooseClient = app.get('mongooseClient');

    const userSchema = new mongooseClient.Schema<IUser>({
        email: { type: String, unique: true, lowercase: true },
        password: { type: String },
        role: { type: String },
        retailerId: {
            type: String,
            ref: ModelName.RETAILER,
            required() {
                return UserRole.RETAILER === (this as IUser).role;
            }
        }
    }, {
        timestamps: true
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    /*if (mongooseClient.modelNames().includes(ModelName.USER)) {
        mongooseClient.deleteModel(ModelName.USER);
    }*/

    return mongooseClient.model(ModelName.USER, userSchema);
}
