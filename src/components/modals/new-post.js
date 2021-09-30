import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { isArray } from "lodash";
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'

import CropPortraitIcon from "@material-ui/icons/CropPortrait";
import CropLandscapeIcon from "@material-ui/icons/CropLandscape";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import CropSquareOutlinedIcon from "@material-ui/icons/CropSquareOutlined";

import CustomRadio from "../shared/custom-radio";
import "./new-post.css";

import { getCroppedImg } from './CropImage'
import { db, storage } from "../../firebase";
import { StateContext } from "../../context/StateProvider";

const schema = Yup.object().shape({});

const NewPost = ({ isOpen, toggle, getBlob, inputImg, handleSubmit }) => {
  const methods = useForm({
    mode: "all",
    defaultValues: {
    },
    resolver: yupResolver(schema),
  });

  // const [show, setShow] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState({ width: '520px', height: '580px' });
  const [sliderPosition, setSliderPosition] = useState(selectedStyle?.height);
  const [sliderValue, setSliderValue] = useState(30);
  const [image, setImage] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedAspect, setSelectedAspect] = useState(4/4);
  const [selectedFit, setSelectedFit] = useState('');
  const [croppedImage, setCroppedImage] = useState({});
  const [user, dispatch] = useContext(StateContext)
  const { watch, setValue } = methods;
  const { selectedSize, currentSize } = watch();
  const { newPost } = watch();

  // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
  //   setCroppedImage({
  //     croppedArea,
  //     croppedAreaPixels
  //   })
  //   // console.log(croppedArea, croppedAreaPixels);
  // }, []);

  const onCropComplete = async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(
        inputImg,
        croppedAreaPixels
    )
    setCroppedImage(croppedImage)
}

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const uploadUrl = (url) => {
    const time = new Date();
    db.collection("image-urls")
    .doc(user?.uid)
    .collection("posts")
    .doc(user?.uid)
    .set({
      name: user?.user?.displayName,
      url: url,
      date: time.toLocaleString(),
    })
  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
  }
  const onSubmit = (formData) => {
    console.log("submitted:", croppedImage);
    console.log('formData: ', formData);
    const filename = user?.user?.displayName + '-' + new Date().getTime();
    console.log('filename: ', filename);
    const uploadTask = storage.ref('images/' + filename).put(croppedImage);
    uploadTask
    .then((uploadTaskSnapshot) => {
        return uploadTaskSnapshot.ref.getDownloadURL();
    })
    .then((url)  => {
      uploadUrl(url);
    });
    // storage.ref
    // const payload = {
    //   resize_options: {
    //     height: croppedImage?.croppedArea?.height,
    //     width: croppedImage?.croppedArea?.width,
    //     x: croppedImage?.croppedArea?.x,
    //     y: croppedImage?.croppedArea?.y,
    //   },
    // }
    // console.log(payload);
    // getBlob(croppedImage)
    // handleSubmit();

  };

  useEffect(() => {
    setSelectedStyle({
      width: currentSize?.width,
      height: currentSize?.height,
    })  
    setSelectedAspect(currentSize?.aspect)
    setSelectedFit(currentSize?.fit)
  }, [currentSize])

  useEffect(() => {
    if (isArray(newPost)) {
      setImage(URL.createObjectURL(newPost[0]));
    }
  }, [newPost]);

  useEffect(()=> {
    setSelectedStyle({
      width: '520px',
      height: '580px',
    })
    setSelectedAspect(520/580)
    setSelectedFit('contain')
  }, []);

  useEffect(() => {
    const x = selectedStyle?.height?.slice(0,3);
    setSliderPosition(Number(x) - 40)
  }, [selectedStyle])

  return (
    <React.Fragment>
      {/* <Modal isOpen={isOpen} centered className="new-post-modal">
        <ModalHeader toggle={toggle} className="">
          <h5 className="text-center">New Post</h5>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={methods.handleSubmit(onSubmit)} className="h-100">
            <FormProvider {...methods}>
              <FileUploader
                name="newPost"
                uploadBoundary={
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    {isLoading ? (
                      <p>jfskjfhskf</p>
                    ) : (
                      // <Loader />
                      <React.Fragment>
                        <Button color="primary" type="button">
                          Drag photos and videos here
                        </Button>
                      </React.Fragment>
                    )}
                  </div>
                }
              />
            </FormProvider>
          </Form>
        </ModalBody>
      </Modal> */}
      {/* <Modal
        isOpen={isOpen}
        fade={false}
        centered
        className="new-post-modal"
      >
        <ModalHeader className="w-100">
            <div className="d-flex w-100 justify-content-between">
                <h6>Crop</h6>
                <small onClick={toggle} className="close">X</small>
            </div>
        </ModalHeader>
        <ModalBody> */}
          <div className="post-preview">
            <div className="image-section mt-5">
              <div className="crop-container" style={{width: selectedStyle?.width, height: selectedStyle?.height}}>
                <Cropper
                  image={inputImg}
                  crop={crop}
                  aspect={selectedAspect}
                  // aspect={16/9}
                  showGrid={false}
                  zoom={zoom}
                  objectFit={selectedFit}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => setZoom(zoom)}
                  classes={{ root: 'slider' }}
                  style={{ position: "absolute", top: `${sliderPosition}px`, right: "58%" }}
                />
              </div>
            </div>
            <div className="size-section">
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormProvider {...methods}>
                  <div>
                    <h6 className="p-3">Choose Size</h6>
                    <div className="size-selector" onClick={() => setValue('currentSize', {width: '520px', height: '580px', aspect: [1], fit: "horizontal-cover", label: "original"})}>
                      <CropOriginalOutlinedIcon />
                      <label className="">Original</label>
                      <CustomRadio
                        name="selectedSize"
                        value="original"
                        id="sizeSelector1"
                        checked={currentSize?.label==="original"}
                      />
                    </div>
                    <div className="size-selector" onClick={() => setValue('currentSize', {width: '516px', height: '516px',aspect: [4/4], fit: "horizontal-cover", label: "square"})}>
                      <CropSquareOutlinedIcon />
                      <label className="">Square</label>
                      <CustomRadio
                        name="selectedSize"
                        value="Square"
                        id="sizeSelector2"
                        checked={currentSize?.label==="square"}
                      />
                    </div>
                    <div className="size-selector" onClick={() => setValue('currentSize', {width: '400px', height: '500px',aspect: [4/5], fit: "vertical-cover", label: "portrait"})}>
                      <CropPortraitIcon />
                      <label className="">Portrait</label>
                      <CustomRadio
                        name="selectedSize"
                        value="Portrait"
                        id="sizeSelector3"
                        checked={currentSize?.label==="portrait"}
                      />
                    </div>
                    <div className="size-selector" onClick={() => setValue('currentSize', {width: '860px', height: '450px',aspect: 1.91/1,  fit: "horizontal-cover", label: "landscape"})}>
                      <CropLandscapeIcon />
                      <label className="">Landscape</label>
                      <CustomRadio
                        name="selectedSize"
                        value="Landscape"
                        id="sizeSelector4"
                        checked={currentSize?.label==="landscape"}
                      />
                    </div>
                  </div>
                  <div className="w-100">
                    <Button size="lg" color="primary" type="submit" block>NEXT</Button>
                  </div>
                </FormProvider>
              </Form>
            </div>
          </div>
        {/* </ModalBody>
      </Modal> */}
    </React.Fragment>
  );
};
export default NewPost;
