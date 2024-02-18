import { Schema, models, model } from "mongoose";

/* Mongoose's Document is an interface that represents a MongoDB document. It provides type definitions for properties and methods that are added to documents by Mongoose. These include fields like _id and __v, as well as methods such as save(), remove(), populate(), and more. 
*/

export interface IImage extends Document  {
    title: string;
    transformationType: string;
    publicId: string;
    secureUrl: string; 
    width?: number; 
    height?: number; 
    config?: Object; // 
    transformationURL?: string; 
    aspectRatio?: string; 
    color?: string; 
    prompt?: string; 
    author: {
        _id: string; 
        firstName: string;
        lastName: string;
    }; 
    createdAt?: Date;
    updatedAt?: Date;
}

const imageSchema = new Schema({
    title : {type: String, required: true},
    transformationType : {type: String, required: true},
    publicId: {type: String, required: true},
    secureUrl: {type: URL, required: true},
    width: {type: Number},
    height: {type: Number},
    config: {type: Object},
    transformationURL: {type: URL},
    aspectRatio: {type: String},
    color: {type: String},
    prompt: {type: String},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type : Date, default: Date.now},
    updatedAt: {type : Date, default: Date.now},
});

/* mongoose.models is just a look-up table or registry to store all the model definitions. If a model with the name 'Image' exists, we will use that collection. If it does not exist, we will create a new model with the name 'Image'. Conversely, mongoose.model(.,.) is a constructor for creating a new instance of a model. Once such a model is defined we can access these models using the mongoose.models object. Image corresponds to an images collection in the database. The database instance. Once the connection is established in mongoose.ts, we do not need to interact with the database instance directly. We can interact with the models/model directly.
*/
const Image = models?.Image || model('Image', imageSchema);

export default Image;
