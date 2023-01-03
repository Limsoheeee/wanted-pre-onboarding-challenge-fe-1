export const getAccessToken = () => {
    const accessToken = localStorage.getItem("token");
    return accessToken;
  };