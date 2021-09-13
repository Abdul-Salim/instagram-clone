import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

const DropZone = (props) => {
  const { onChange, uploadBoundary } = props;
  const onDrop = (acceptedFiles) => {
    onChange(acceptedFiles);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <React.Fragment>
      <div className="h-100" {...getRootProps()}>
        <input {...getInputProps({ onChange })} />
        {uploadBoundary}
      </div>
    </React.Fragment>
  );
};

const FileUploader = ({ name: propName, uploadBoundary }) => {
  const { control } = useFormContext();
  return (
    <React.Fragment>
      <Controller
        control={control}
        name={propName}
        render={({field: {onChange}}) => (
          <DropZone
            onChange={onChange}
            uploadBoundary={uploadBoundary}
          />
        )}
      />
    </React.Fragment>
  );
};
export default FileUploader;