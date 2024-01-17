const config = {
  env: "development",
  isDevModeEnabled: true,
  axiosRequestsTimeout: 5000,
  backendApiEndPoint: "http://localhost:5000/",
  backendSecretKey: "MAReTqRkP9D5g4BQ3gARz6HhU6h2Gsd8HMHfqXjFpf8Xhf3VA2",
  hmacSecretPacketKey: "bgLkjKcXC8Zkgsfr4ftDxxgEnKbj4ZBUjTk6GCqjA6HvQ2eTZT",
};

config.isDevModeEnabled = config.env === "development";
export default config;
