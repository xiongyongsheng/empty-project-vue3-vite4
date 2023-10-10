import GitHubRequest from "../request/github.request";

const gitHubRequest = new GitHubRequest();

export const getRepoList = (params, callBack) => {
  return gitHubRequest.create(
    {
      url: "/users/xiongyongsheng/repos",
      params,
      method: "get",
    },
    callBack
  );
};
