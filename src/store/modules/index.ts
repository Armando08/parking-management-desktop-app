const files = require.context('.', true, /index.js$/);
const modules: any = {};

files.keys().forEach(key => {
  if (key === './index.js') return;
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default modules;