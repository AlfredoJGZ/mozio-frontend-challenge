import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { TextFieldProps, AutocompleteRenderInputParams } from "formik-mui";
import useFetch from "../hooks/useFetch";
import { Values } from "./TravelForm";
import useHandleSearch from "../hooks/useHandleSearch";

interface AutocompleteCityType extends TextFieldProps {
  multiple: boolean;
  errors: Values;
  error: boolean;
}

const AutocompleteCity = (props: AutocompleteCityType) => {
  const {
    form: { setFieldValue },
    field: { name },
    label,
    multiple,
    defaultValue,
    error,
    helperText,
  } = props;
  const [options, status, fakeFetch, loading] = useFetch();
  const [touched, setTouched] = useState(false);
  const handleSearch = useHandleSearch();
  const onInputChange = (newValue: string) => {
    setFieldValue(name, newValue);
    fakeFetch(newValue);
  };

  const onChange = (newValue: string | string[] | null) => {
    if (newValue) {
      setFieldValue(name, newValue);
      handleSearch(name, newValue);
    }
  };

  const handleError = (touched: boolean) => {
    if (touched) {
      return status === 500 ? true : error;
    }
  };

  const handleLabel = (touched: boolean) => {
    if (touched) {
      return status === 500 ? "Error, try again" : label;
    }
    return label;
  };

  return (
    <Autocomplete
      disablePortal
      multiple={multiple}
      options={options}
      loading={loading}
      defaultValue={defaultValue}
      onBlur={() => setTouched(true)}
      onChange={(e, newValue) => onChange(newValue as string | string[])}
      onInputChange={(e, newValue) => onInputChange(newValue)}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          label={handleLabel(touched)}
          error={handleError(touched)}
          helperText={touched && error ? helperText : ""}
        />
      )}
    />
  );
};

export default AutocompleteCity;
