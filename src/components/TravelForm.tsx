import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import useMinDate from "../hooks/useMinDate";
import useHandleSearch from "../hooks/useHandleSearch";
import AutocompleteCity from "./AutocompleteCity";

export interface Values {
  origin: string;
  destination: string;
  passengers: number | string;
  date: string;
  intermediate: string[];
}

const TravelForm = () => {
  const [minDate] = useMinDate();
  let [searchParams] = useSearchParams();
  const handleSearch = useHandleSearch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        origin: searchParams.get("origin") || "",
        destination: searchParams.get("destination") || "",
        passengers: searchParams.get("passengers") || 1,
        date: searchParams.get("date") || "",
        intermediate: searchParams.getAll("intermediate") || [],
      }}
      validate={(values) => {
        const errors: Partial<Values> = {};
        if (!values.origin) {
          errors.origin = "Required";
        }
        if (!values.destination) {
          errors.destination = "Required";
        }
        if (values.passengers < 1) {
          errors.passengers = "Must be min 1 passenger";
        }
        const userDate = new Date(values.date);
        const minRequiredDate = new Date();
        if (minRequiredDate > userDate) {
          errors.date = "Invalid date";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({
        submitForm,
        isSubmitting,
        errors,
        values,
        touched,
        initialValues,
        handleChange,
      }) => (
        <Card sx={{ width: `min(90%, 30rem)` }}>
          <CardContent>
            <Typography variant="h1" gutterBottom>
              Let's travel
            </Typography>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Fill the details of your travel below
            </Typography>
            <Link to={"results"}>Results</Link>
            <Form>
              <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item xs={12}>
                  <Field
                    component={AutocompleteCity}
                    name="origin"
                    label="Origin"
                    defaultValue={initialValues.origin}
                    fullWidth
                    onChange
                    error={errors.origin ? true : false}
                    helperText={errors.origin ? errors.origin : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={AutocompleteCity}
                    name="destination"
                    label="Destination"
                    defaultValue={initialValues.destination}
                    fullWidth
                    onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);

                      console.log(e.target.value);
                    }}
                    error={errors.destination ? true : false}
                    helperText={errors.destination ? errors.destination : ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    fullWidth
                    name="passengers"
                    type="number"
                    label="Passengers"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      handleSearch("passengers", e.target.value);
                    }}
                    inputProps={{ min: 1 }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    fullWidth
                    type="date"
                    label="Date"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      handleSearch("date", e.target.value);
                    }}
                    name="date"
                    inputProps={{ min: minDate }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={AutocompleteCity}
                    multiple
                    name="intermediate"
                    label="Intermediate"
                    fullWidth
                    error={errors.intermediate ? true : false}
                    helperText={errors.intermediate ? errors.intermediate : ""}
                  />
                </Grid>
                <Button
                  sx={{ width: "100%", marginTop: "1.8rem" }}
                  variant="contained"
                  color="primary"
                  disabled={
                    !values.origin ||
                    !values.destination ||
                    !values.date ||
                    Object.keys(errors).length > 0
                  }
                  onClick={() => {
                    console.log(errors, values, touched);
                    // console.log(params);
                    // setSubmitted(true);
                    console.log(searchParams.toString());
                    handleSearch("passengers", String(values.passengers));
                    navigate(`/results/?${searchParams}`, { replace: true });
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
};

export default TravelForm;
