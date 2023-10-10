import ApiRequest from "../request/api.request";

const apiRequest = new ApiRequest();

export const getBannerList = (data, callBack) => {
  return apiRequest.create(
    {
      data,
      method: "post",
      transformRequest: [
        function (data, headers) {
          return JSON.stringify({ cmd: "/banner/list", parameters: data });
        },
      ],
    },
    callBack
  );
};
