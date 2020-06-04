import React from "react";
import PlacesAutocomplete, { Suggestion } from "react-places-autocomplete";
import { CircularProgress, TextField, Link } from "@material-ui/core";
import { fieldToTextField } from "formik-material-ui";
import { FieldProps } from "formik";

const AddressField: React.FC<FieldProps> = (props) => {
  const { form } = props;
  const { setTouched, setFieldValue, setFieldError } = form;
  const { error, disabled, helperText, name, value } = fieldToTextField(props);

  const handleError = (error: string) => {
    name && setFieldError(name, error);
  };

  const handleChange = (address: string) => {
    name && setFieldValue(name, address);
  };

  return (
    <PlacesAutocomplete
      value={value as string}
      onChange={handleChange}
      onSelect={handleChange}
      onError={handleError}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            {...getInputProps({
              label: "Address",
            })}
            onBlur={() => name && setTouched({ [name]: true })}
            helperText={helperText}
            error={error}
            disabled={disabled}
            fullWidth
          />
          {loading && <CircularProgress />}
          {suggestions.map((suggestion: Suggestion, index: number) => (
            <div key={index}>
              <Link href="#" {...getSuggestionItemProps(suggestion)}>
                {suggestion.description}
              </Link>
            </div>
          ))}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressField;
