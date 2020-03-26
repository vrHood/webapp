import { IRetailer } from '@vrhood/shared';

import { Application, ModelName } from '../declarations';

import { fileReferenceSchema } from './file-reference.model';

export default function (app: Application) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;

    const locationSchema = new Schema({
        name: { type: String },
        houseNumber: { type: Number },
        additionalAddress: { type: String },
        zip: { type: String },
        city: { type: String },
        latitude: { type: Number },
        longitude: { type: Number }
    });

    const retailerSchema = new Schema<IRetailer>({
        name: { type: String, required: true },
        location: { type: locationSchema },
        mainCategory: { type: Schema.Types.ObjectId, ref: ModelName.CATEGORY },
        additionalCategories: [ { type: Schema.Types.ObjectId, ref: ModelName.CATEGORY } ],
        tags: [ { type: String } ],
        email: { type: String },
        phone: { type: String },
        mobile: { type: String },
        fax: { type: String },
        website: { type: String },
        facebook: { type: String },
        instagram: { type: String },
        youtube: { type: String },
        offer: { type: String },
        description: { type: String },
        logo: { type: fileReferenceSchema },
        introVideo: { type: fileReferenceSchema }
    }, {
        timestamps: true
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    /*if (mongooseClient.modelNames().includes(ModelName.RETAILER)) {
        mongooseClient.deleteModel(ModelName.RETAILER);
    }*/

    return mongooseClient.model(ModelName.RETAILER, retailerSchema);
}
