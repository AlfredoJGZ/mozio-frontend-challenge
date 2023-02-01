import { useSearchParams } from "react-router-dom";
import useParamsFormat from "./useParamsFormat";

const useHandleSearch = (): ((
  newKey: string,
  newValue: string | string[]
) => void) => {
  const [params, setParams] = useSearchParams();
  const formatParams = useParamsFormat();

  const handleSearch = (newKey: string, newValue: string | string[]) => {
    console.log(`calling with ${newKey} and value ${newValue}`);
    const paramsObj = formatParams(params);
    setParams(Object.assign(paramsObj, { [newKey]: newValue }));
  };
  return handleSearch;
};

export default useHandleSearch;
