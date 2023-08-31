export const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log('  적용', args);
      set(args);
      console.log('  새로운 상태', get());
    },
    get,
    api
  );
