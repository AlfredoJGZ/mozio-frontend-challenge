import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { Person, Event, Flag, ArrowBack } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import useParamsFormat from "../hooks/useParamsFormat";
import { useCallback, useEffect, useState } from "react";
import RouteDistance from "./RouteDistance";

const Results = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formatParams = useParamsFormat();
  const travelDetails = formatParams(searchParams);
  const [totalDistance, setTotalDistance] = useState(0);
  let citiesList: string[] = [];
  citiesList.push(travelDetails.origin as string);
  if (travelDetails.intermediate) {
    citiesList = citiesList.concat(travelDetails.intermediate) as string[];
  }
  citiesList.push(travelDetails.destination as string);
  const addDistance = useCallback((distance: number) => {
    setTotalDistance((prev) => Number(prev + distance));
  }, []);

  useEffect(() => {
    if (
      !travelDetails.origin ||
      !travelDetails.destination ||
      !travelDetails.date
    ) {
      navigate("/");
    }
  });

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
            {citiesList.map((citie, index, array) => {
              if (index < array.length - 1) {
                return (
                  <RouteDistance
                    key={index}
                    a={citie}
                    b={array[index + 1]}
                    addDistance={addDistance}
                  />
                );
              }
              return null;
            })}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Flag color="primary" fontSize={"large"} />
            <Typography color="primary" fontSize={"1.5rem"}>
              {`${totalDistance} KM`}
            </Typography>
            <Typography fontSize={"1rem"}>Total distance</Typography>
          </Grid>
        </Grid>
        <Link style={{ textDecoration: "none" }} to={`/`}>
          <Button startIcon={<ArrowBack />} sx={{ margin: "0 auto" }}>
            Home
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Results;
