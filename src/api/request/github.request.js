import HttpRequest from "./index.js";

class GitHubRequest extends HttpRequest {
  constructor(options = {}) {
    super({
      baseURL: import.meta.env.VITE_GIT_HUB_API,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      ...options,
    });
  }
}

export default GitHubRequest;
