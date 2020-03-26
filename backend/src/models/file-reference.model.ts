import { IFileReference } from '@vrhood/shared';
import { Schema } from 'mongoose';

export const fileReferenceSchema = new Schema<IFileReference>({
    name: { type: String, required: true },
    mimeType: { type: String, required: true }
}, {
    timestamps: true
});
