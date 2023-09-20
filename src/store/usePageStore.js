import createStore from './createStore';

const pageStore = (set) => ({
  page: 1,
  handlePage: (oldPage) =>
    set(
      (state) => {
        state.page = oldPage + 1;
      },
      false,
      'content/page'
    ),
});

export const usePageStore = createStore(pageStore);
