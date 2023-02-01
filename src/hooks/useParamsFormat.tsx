type SearchParams = {
  [key: string]: string | string[];
};

const useParamsFormat = (): ((params: URLSearchParams) => SearchParams) => {
  const formatParams = (params: URLSearchParams) => {
    const currentParams = new URLSearchParams(params);
    const paramsJSON: SearchParams = {};
    currentParams.forEach((value, key) => {
      paramsJSON[key]
        ? (paramsJSON[key] = Array<string>().concat(paramsJSON[key], value))
        : (paramsJSON[key] = value);
    });
    return paramsJSON;
  };

  return formatParams;
};

export default useParamsFormat;
