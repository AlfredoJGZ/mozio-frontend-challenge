import { useEffect, useState, useCallback } from "react";
import { cities } from "./useFetch";
import haversine from "haversine-distance";

type coordinatesType = {
  lat: number;
  lon: number;
};
type fakeHaversinePromise = {
  status: number;
  data: number;
};
const useHaversine = (
  a: string,
  b: string
): [number, number | undefined, (a: string, b: string) => void, boolean] => {
  const [data, setData] = useState<number>(0);
  const [status, setStatus] = useState<number>();
  const [loading, setLoading] = useState(false);

  const getCoordinates = (a: string, b: string): coordinatesType[] => {
    const origin = cities.find((citie) => citie[0] === a);
    const destination = cities.find((citie) => citie[0] === b);
    return [
      { lat: Number(origin![1]), lon: Number(origin![2]) },
      { lat: Number(destination![1]), lon: Number(destination![2]) },
    ];
  };

  const fakeApi = useCallback((a: string, b: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (a === "Dijon" || b === "Dijon") {
          reject({ status: 500, data: 0 });
        }
        const [origin, destination] = getCoordinates(a, b);
        resolve({
          status: 200,
          data: Number.parseInt(
            (haversine(origin, destination) / 1000).toFixed(2)
          ),
        });
      }, 500);
    });
  }, []);

  const fakeFetch = useCallback(
    async (a: string, b: string) => {
      try {
        setLoading(true);
        const response = (await fakeApi(a, b)) as fakeHaversinePromise;
        const { status, data } = response;
        setLoading(false);
        setStatus(status);
        setData(data);
      } catch (e) {
        setLoading(false);
        setStatus(500);
        setData(0);
      }
    },
    [fakeApi]
  );

  useEffect(() => {
    fakeFetch(a, b);
  }, [a, b, fakeFetch]);
  return [data, status, fakeFetch, loading];
};

export default useHaversine;
