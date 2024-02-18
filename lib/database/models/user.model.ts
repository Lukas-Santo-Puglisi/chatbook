import { Schema, models, model } from "mongoose";

/* Mongoose's Document is an interface that represents a MongoDB document. It provides type definitions for properties and methods that are added to documents by Mongoose. These include fields like _id and __v, as well as methods such as save(), remove(), populate(), and more. 
*/

export interface IUser extends Document  {
    clerkId: number;
    email: string,
    userName: string,
    photo: string,
    firstName: string,
    lastName: string,
    planId: number,
    creditBalance: number,
}

const userSchema = new Schema({
    clerkId: {type: Number, required: true},
    email: {type: String, required: true},
    userName: {type: String, required: true},
    photo: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    planId: {type: Number, required: true},
    creditBalance: {type: Number, required: true},

});

/* mongoose.models is just a look-up table or registry to store all the model definitions. If a model with the name 'Image' exists, we will use that collection. If it does not exist, we will create a new model with the name 'Image'. Conversely, mongoose.model(.,.) is a constructor for creating a new instance of a model. Once such a model is defined we can access these models using the mongoose.models object. Image corresponds to an images collection in the database. The database instance. Once the connection is established in mongoose.ts, we do not need to interact with the database instance directly. We can interact with the models/model directly.
*/
const User = models?.User || model('Image', userSchema);

export default User;
