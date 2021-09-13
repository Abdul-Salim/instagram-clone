import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import CustomInput from 'reactstrap/lib/CustomInput';
import { generateRandomString } from '/home/flock/usr/salim/instagram/src/helpers/utils.js';

const CustomInputField = (props) => {
  const {
    control, formState: { errors }, clearErrors,
  } = useFormContext();
  const {
    children,
    label,
    name: propsName,
    placeholder,
    type,
    defaultValue,
    clearError,
    ...inputProps
  } = props;

  const { message: errorMessage = false } = get(errors, propsName, {});
  return (
    <React.Fragment>
      <Controller
        control={control}
        name={propsName}
        defaultValue={defaultValue}
        render={({
          field: {
            onChange, onBlur, value, name,
          },
        }) => (
          <CustomInput
            autoComplete="off"
            invalid={!!errorMessage}
            name={name}
            onBlur={onBlur}
            onChange={(event) => {
              if (props.type === 'checkbox') {
                onChange(event.target.checked);
              } else {
                onChange(event);
              }
              if (clearError) {
                clearErrors();
              }
            }}
            placeholder={placeholder}
            type={type || 'text'}
            label={label}
            value={value || ''}
            id={generateRandomString()}
            {...inputProps}
          >
            {children}
          </CustomInput>
        )}
      />
      {/* {
      !clearError ? (
        <React.Fragment>
          {errorMessage ? (
            <FormFeedback>{errorMessage}</FormFeedback>
          ) : ''}
        </React.Fragment>
      ) : ''
    } */}
    </React.Fragment>
  );
};

export default CustomInputField;
