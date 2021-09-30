import React, { useEffect, useState } from 'react'
import * as firebase from 'firebase/app'
// import ImageCropper from './ImageCropper'
import NewPost from './new-post'
import { Form, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { isArray } from "lodash";
import FileUploader from '../shared/file-uploader';
import { storage } from '../../firebase';
import { useHistory } from 'react-router-dom';

const schema = Yup.object().shape({});

const ImageUpload = ({isOpen, toggle}) => {

    const [blob, setBlob] = useState(null)
    const [inputImg, setInputImg] = useState('')
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [imagePresent, setImagePresent] = useState();
    const history = useHistory();
    const methods = useForm({
        mode: "all",
        defaultValues: {
        },
        resolver: yupResolver(schema),
    });
    const { watch, setValue } = methods;

    const { newPost } = watch();

    const getBlob = (blob) => {
        // pass blob up from the ImageCropper component
        setBlob(blob)
    }

    // const onInputChange = (e) => {
    //     // convert image file to base64 string
    //     const file = e.target.files[0]
    //     const reader = new FileReader()

    //     reader.addEventListener('load', () => {
    //         setInputImg(reader.result)
    //     }, false)

    //     if (file) {
    //         reader.readAsDataURL(file)
    //     }
    // }

    // const handleSubmitImage = () => {
    // // upload blob to firebase 'images' folder with filename 'image'
    //     // e.preventDefault()
    //     console.log('eee',blob);
    //     storage.ref('images').child('image').put(blob, { contentType: blob.type }).then(() => {
    //         history.push('/home');
    //     })
    //     // firebase
    //     //     .storage()
    //     //     .ref('images')
    //     //     .child('image')
    //     //     .put(blob, { contentType: blob.type })
    //     //     .then(() => {
    //     //         // redirect user 
    //     //     })
    // }

    const onSubmit = (formData) => {
        // console.log("submitted:", croppedImage);
        // const payload = {
        //   resize_options: {
        //     height: croppedImage?.croppedArea?.height,
        //     width: croppedImage?.croppedArea?.width,
        //     x: croppedImage?.croppedArea?.x,
        //     y: croppedImage?.croppedArea?.y,
        //   },
        // }
        console.log(formData);
      };
    

    useEffect(() => {
        if (isArray(newPost)) {
        //   setImage(URL.createObjectURL(newPost[0]));
          const file = newPost[0]

          const reader = new FileReader()

          reader.addEventListener('load', () => {
              setImage(reader.result)
              setImagePresent(true);
          }, false)
  
          if (file) {
              reader.readAsDataURL(file)
          }
        }
      }, [newPost]);

    return (
        <React.Fragment>
            <Modal isOpen={isOpen} centered className="new-post-modal">
                <ModalHeader toggle={toggle} className="">
                <h5 className="text-center">New Post</h5>
                </ModalHeader>
                <ModalBody>
                {!imagePresent ?  (
                    <Form onSubmit={methods.handleSubmit(onSubmit)} className="h-100">
                        <FormProvider {...methods}>
                            <FileUploader
                                name="newPost"
                                uploadBoundary={
                                <div className="d-flex justify-content-center align-items-center h-100 w-100">
                                    <React.Fragment>
                                        <Button color="primary" type="button">
                                        Drag photos and videos here
                                        </Button>
                                    </React.Fragment>
                                </div>
                                }
                            />
                        </FormProvider>
                    </Form>
                ):(
                    <NewPost
                    getBlob={getBlob}
                    inputImg={image}
                    isOpen={isOpen && imagePresent}
                    toggle={toggle}
                    // handleSubmit={(e) =>handleSubmitImage(e)}
                />
                )}
                    {/* <form onSubmit={handleSubmitImage}>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={onInputChange}
                        />
                        {
                            inputImg && (
                                <NewPost
                                    getBlob={getBlob}
                                    inputImg={inputImg}
                                    isOpen={isOpen}
                                    toggle={toggle}
                                />
                            )
                        }
                        <button type='submit'>Submit</button>
                    </form> */}
                                    {/* {
                image ? (
                    <NewPost
                        getBlob={getBlob}
                        inputImg={image}
                        isOpen={isOpen}
                        toggle={toggle}
                        // handleSubmit={(e) =>handleSubmitImage(e)}
                    />
                )
                : ''
            } */}
                </ModalBody>
            </Modal>

        </React.Fragment>

    )
}

export default ImageUpload;