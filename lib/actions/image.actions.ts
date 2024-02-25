"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";

const populateUser = (query: any) => query.populate({
    path: 'author', 
    model: User,  
    select: '_id firstName lastName'
});
// Add image to the database
export async function addImage({image, userId, path}: AddImageParams) {
    try{
        await connectToDatabase();
        const author = await User.findById({ userId });
        if (!author) throw new Error("User not found");

        const newImage = await Image.create({
            ...image,
            author: author._id 
        });
        // coming from next-cache allowing us to show the new image and not keep what was cached
        revalidatePath(path);
        // cleaned deep clone the image object without any memory references of the original object
        return JSON.parse(JSON.stringify(newImage));
    } catch (error) {
        handleError(error);
    }
}
export async function updateImage({image, userId, path}: UpdateImageParams) {
    try{
        await connectToDatabase();
        const imageToUpdate = await Image.findById( image._id );
        if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) throw new Error("Unauthorized or Image not found");
        const updatedImage = await Image.findByIdAndUpdate(imageToUpdate._id, image, { new: true });

        // coming from next-cache allowing us to show the new image and not keep what was cached
        revalidatePath(path);
        // cleaned deep clone the image object without any memory references of the original object
        return JSON.parse(JSON.stringify(updatedImage));
    } catch (error) {
        handleError(error);
    }
}
export async function deleteImage(imageId: string) {
    try{
        await connectToDatabase();
        await Image.findByIdAndDelete(imageId);

    } catch (error) {
        handleError(error);
    } finally {
        redirect('/');
    }   
}
export async function getImageByID(imageId: string) {
    try{
        await connectToDatabase();
        const image = await populateUser(Image.findById(imageId));
        if (!image) throw new Error("Image not found"); 
        return JSON.parse(JSON.stringify(image));
    } catch (error) {
        handleError(error);
    }
}