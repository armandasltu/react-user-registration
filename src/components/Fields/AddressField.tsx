import React from "react";
import {
  CircularProgress,
  ClickAwayListener,
  TextField,
  Link,
} from "@material-ui/core";
import usePlacesAutocomplete from "hooks/usePlacesAutocomplete";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { fieldToTextField } from "formik-material-ui";
import { FieldProps } from "formik";
import { Suggestion } from "types";

const useStyles = makeStyles((theme: Theme) => ({
  suggestionSpan: {
    color: theme.palette.primary.light,
    opacity: 0.5
  },
}));

const AddressField: React.FC<FieldProps> = (props) => {
  const classes = useStyles();
  const { form } = props;
  const { setTouched, setFieldValue } = form;
  const { error, disabled, helperText, name, value, label } = fieldToTextField(props);

  const {
    loading,
    suggestions,
    actions: { setValue, clearSuggestions },
  } = usePlacesAutocomplete();

  const handleChange = (event: any) => {
    const value = event.target.value;
    name && setFieldValue(name, value);
    setValue(value);
  };

  return (
    <ClickAwayListener onClickAway={clearSuggestions}>
      <div>
        <TextField
          value={value}
          label={label}
          onChange={handleChange}
          onBlur={() => name && setTouched({ [name]: true })}
          helperText={helperText}
          error={error}
          disabled={disabled}
          fullWidth
        />
        {loading && <CircularProgress />}
        {suggestions.map(({ title, subTitle }: Suggestion, index: number) => (
          <div key={index}>
            <Link
              href="#"
              onClick={() => {
                name && setFieldValue(name, title);
                clearSuggestions();
              }}
            >
              {title}
              <span className={classes.suggestionSpan}>, {subTitle}</span>
            </Link>
          </div>
        ))}
      </div>
    </ClickAwayListener>
  );
};

export default AddressField;
