import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { CircularProgress, TextField, Link } from "@material-ui/core";
import { fieldToTextField } from "formik-material-ui";

const AddressField = (props) => {
  const { form } = props;
  const { setTouched, setFieldValue, setFieldError } = form;
  const { error, disabled, helperText, name, value } = fieldToTextField(props);

  const handleError = (error) => {
    setFieldError(name, error);
  };

  const handleChange = (address) => {
    setFieldValue(name, address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(() => {
        setFieldValue(name, address);
      })
      .catch((error) => setFieldError(name, error));
  };

  return (
    <PlacesAutocomplete
      name={name}
      id={name}
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}
      onError={handleError}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            {...getInputProps({
              label: "Address",
            })}
            onBlur={() => setTouched({ [name]: true })}
            helperText={helperText}
            error={error}
            disabled={disabled}
            fullWidth
          />
          {loading && <CircularProgress />}
          {suggestions.map((suggestion) => (
            <div>
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
