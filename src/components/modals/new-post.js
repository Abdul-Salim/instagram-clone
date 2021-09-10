import React, { useCallback, useEffect, useState } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "reactstrap";
import { isArray } from "lodash";
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'

import CropPortraitIcon from "@material-ui/icons/CropPortrait";
import CropLandscapeIcon from "@material-ui/icons/CropLandscape";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import CropSquareOutlinedIcon from "@material-ui/icons/CropSquareOutlined";

import FileUploader from "../shared/file-uploader";
import CustomRadio from "../shared/custom-radio";
import "./new-post.css";


const schema = Yup.object().shape({});

const NewPost = ({ isOpen, toggle }) => {
  const methods = useForm({
    mode: "all",
    defaultValues: {
      selectedSize: 1 / 1, 
    },
    resolver: yupResolver(schema),
  });

  // const [show, setShow] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState({width: '520px', height: '580px'});
  const [sliderPosition, setSliderPosition] = useState(selectedStyle?.height);
  const [sliderValue, setSliderValue] = useState(30);
  const [image, setImage] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedAspect, setSelectedAspect] = useState([1/1]);
  const [selectedFit, setSelectedFit] = useState('');

  const { watch, setValue } = methods;
  const { selectedSize } = watch();
  const { newPost } = watch();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const onSubmit = (formData) => {
    console.log("submitted:", formData);
  };

  useEffect(() => {
    console.log(selectedSize)
    setSelectedStyle({
      width: selectedSize?.width,
      height: selectedSize?.height,
    })  
    setSelectedAspect(selectedSize?.aspect)
    setSelectedFit(selectedSize?.fit)
  }, [selectedSize])

  useEffect(() => {
    if (isArray(newPost)) {
      setImage(URL.createObjectURL(newPost[0]));
    }
  }, [newPost]);

  // useEffect(() => {
  //   setSelectedAspect('1 / 1')
  // }, [])

  useEffect(() => {
    const x = selectedStyle?.height?.slice(0,3);
    setSliderPosition(Number(x) - 40)
  }, [selectedStyle])

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} centered className="new-post-modal">
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
      </Modal>
      <Modal
        isOpen={newPost?.length > 0 && isOpen}
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
        <ModalBody>
          <div className="post-preview">
            <div className="image-section mt-5">
              <div className="crop-container" style={selectedStyle}>
                {console.log(selectedAspect)}
                <Cropper
                  image={image}
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
                    <h6 className="p-3">Choose Size</h6>
                  <div className="size-selector" onClick={() => setValue('selectedSize', {width: '520px', height: '580px', aspect: [1], fit: "horizontal-cover"})}>
                    <CropOriginalOutlinedIcon />
                    <label className="">Original</label>
                    <CustomRadio
                      name="selectedSize"
                      value="original"
                      id="sizeSelector1"
                      checked={selectedSize==="original"}
                    />
                  </div>
                  <div className="size-selector" onClick={() => setValue('selectedSize', {width: '516px', height: '516px',aspect: [4/4], fit: "horizontal-cover"})}>
                    <CropSquareOutlinedIcon />
                    <label className="">Square</label>
                    <CustomRadio
                      name="selectedSize"
                      value="Square"
                      id="sizeSelector2"
                      checked={selectedSize==="Square"}
                    />
                  </div>
                  <div className="size-selector" onClick={() => setValue('selectedSize', {width: '400px', height: '500px',aspect: [4/5], fit: "vertical-cover"})}>
                    <CropPortraitIcon />
                    <label className="">Portrait</label>
                    <CustomRadio
                      name="selectedSize"
                      value="Portrait"
                      id="sizeSelector3"
                      checked={selectedSize==="Portrait"}
                    />
                  </div>
                  <div className="size-selector" onClick={() => setValue('selectedSize', {width: '860px', height: '450px',aspect: 1.91/1,  fit: "horizontal-cover"})}>
                    <CropLandscapeIcon />
                    <label className="">Landscape</label>
                    <CustomRadio
                      name="selectedSize"
                      value="Landscape"
                      id="sizeSelector4"
                      checked={selectedSize==="Landscape"}
                    />
                  </div>
                </FormProvider>
              </Form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default NewPost;
