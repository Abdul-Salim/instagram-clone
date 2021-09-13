import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from 'reactstrap/lib/FormGroup';
import { CustomInput } from 'reactstrap';

const CustomRadio = (props) => {
  const { control, setValue } = useFormContext();
  const { label, name: propsName, ...inputProps } = props;

  return (
    <FormGroup>
      <Controller
        control={control}
        name={propsName}
        render={({ field: { onBlur, name } }) => (
          <div className="custom-radio custom-control w-100 mb-0">
            <CustomInput
              className="custom-control-input"
              type="radio"
              name={name}
              onBlur={onBlur}
              onChange={(event) => {
                setValue(name, event.target.value);
              }}
              label={label}
              {...inputProps}
            />
          </div>
        )}
      />
    </FormGroup>
  );
};

export default CustomRadio;
