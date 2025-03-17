/** @type {import('vite').UserConfig} */
export default {
  server: {
    port: 2345,
  },
  build: {
    sourcemap: true,
    assetsDir: "code",
  },
  publicDir: "static",
};
