import { useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { LocationCity } from "@mui/icons-material";

import useHaversine from "../hooks/useHaversine";

type RouteDistanceType = {
  a: string;
  b: string;
  addDistance: (distance: number) => void;
};
const RouteDistance = ({ a, b, addDistance }: RouteDistanceType) => {
  const [data, status, fakeFetch, loading] = useHaversine(a, b);

  useEffect(() => {
    addDistance(data);
  }, [data, addDistance]);

  return (
    <>
      <Grid item xs={4} sx={{ textAlign: "center" }}>
        <LocationCity color="primary" fontSize={"large"} />
        <Typography fontSize={"1rem"}>{a}</Typography>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: "center" }} alignItems="center">
        <Typography fontSize={"1.5rem"}>
          {loading && status !== 500 ? "Loading" : `${data} KM`}
          {status === 500 && "Error! try again"}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: "center" }}>
        <LocationCity color="primary" fontSize={"large"} />
        <Typography fontSize={"1rem"}>{b}</Typography>
      </Grid>
    </>
  );
};

export default RouteDistance;
