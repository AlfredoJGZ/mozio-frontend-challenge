import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import {
  AccessAlarm,
  ThreeDRotation,
  LocationCity,
  Person,
  Event,
} from "@mui/icons-material";

import { useSearchParams } from "react-router-dom";
import useParamsFormat from "../hooks/useParamsFormat";

const RouteDistance = () => {
  return (
    <>
      <Grid item xs={4} sx={{ textAlign: "center" }}>
        <LocationCity color="primary" fontSize={"large"} />
        <Typography fontSize={"1rem"}>Paris</Typography>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: "center" }} alignItems="center">
        <Typography fontSize={"1.5rem"}>120 KM</Typography>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: "center" }}>
        <LocationCity color="primary" fontSize={"large"} />
        <Typography fontSize={"1rem"}>Dijon</Typography>
      </Grid>
    </>
  );
};

const Results = () => {
  const [searchParams] = useSearchParams();
  const formatParams = useParamsFormat();
  const travelDetails = formatParams(searchParams);

  return (
    <Card sx={{ width: `min(90%, 30rem)` }}>
      <CardContent>
        <Typography textAlign="center" variant="h4" gutterBottom>
          Your Travel
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Person color="primary" fontSize={"large"} />
            <Typography color="primary" fontSize={"1.5rem"}>
              {travelDetails.passengers ? travelDetails.passengers : 1}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Event color="primary" fontSize={"large"} />
            <Typography color="primary" fontSize={"1.5rem"}>
              {travelDetails.date}
            </Typography>
          </Grid>
          <Grid container item xs={12} rowSpacing={2}>
            <RouteDistance />
            <RouteDistance />
            <RouteDistance />
          </Grid>
        </Grid>
      </CardContent>

      <Link to={`/`}>Home</Link>
    </Card>
  );
};

export default Results;
