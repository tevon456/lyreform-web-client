const config = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? "https://lyreform-api.herokuapp.com/v1/"
      : "http://localhost:8000/v1/",
};
export default config;
