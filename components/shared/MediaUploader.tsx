import React from 'react'
import { useToast } from '../ui/use-toast'
import {CldUploadWidget} from 'next-cloudinary'
import Image from 'next/image'

type MediaUploaderProps = {
    onValueChange: (value: string) => void,
    setImage: React.Dispatch<any>,
    image: any,
    publicId: string,
    type: string
}

const   MediaUploader = ({
    onValueChange, 
    setImage, 
    image, 
    publicId, 
    type} : MediaUploaderProps) => {
        const { toast } = useToast()
        const onUploadSuccessHandler = (result: any) => {
            toast({
                title: "Image uploaded successfully",
                description: "You can now use it in your chatbook. 1 credit has been deducted from your account.",
                duration: 5000,
                className: "error-dash-toast"
            })
        }
        const onUploadErrorHandler = () =>{
            toast({
                title: "There was an error uploading the image",
                description: "Please try again.",
                duration: 5000,
                className: "error-dash-toast"
            })
        }    
        
        return (
            <CldUploadWidget
                uploadPreset="chatbook"
                options={{
                    multiple: false,
                    resourceType: "image",
                }}
                onSuccess={onUploadSuccessHandler}
                onError={onUploadErrorHandler}
                >
                {({ open }) => 
                    (
                    <div className='flex flex-col gap-4'>
                        <h3 className="h3-bold text-dark-600">
                            Original
                        </h3>
                        { publicId ? (
                            <>
                            Here is the image
                            </>
                        ) : (
                            // call to action to upload the images
                            <div className='media-uploader_cta' onClick={() => open()}>
                                <div className='media-uploader_cta-image'>
                                    <Image src="/assets/icons/add.svg" alt='Add Image' width={24} height={24}>
                                    </Image>
                                    
                                </div>
                                <p className='p-14-medium'> Upload Image</p>
                            </div>
                        )}
                    </div>
                    )
                }
            </CldUploadWidget>
    )
    }

    export default MediaUploader
