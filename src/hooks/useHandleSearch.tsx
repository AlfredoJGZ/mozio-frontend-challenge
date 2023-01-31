import { useSearchParams } from "react-router-dom";

type SearchParams = {
  [key: string]: string | string[];
};

const useHandleSearch = (): ((newKey: string, newValue: string) => void) => {
  const [params, setParams] = useSearchParams();
  const handleSearch = (newKey: string, newValue: string | string[]) => {
    const currentParams = new URLSearchParams(window.location.search);
    const newParams: SearchParams = {};
    currentParams.forEach((value, key) => {
      newParams[key]
        ? (newParams[key] = Array<string>().concat(newParams[key], value))
        : (newParams[key] = value);
    });
    setParams(Object.assign(newParams, { [newKey]: newValue }));
  };
  return handleSearch;
};

export default useHandleSearch;
