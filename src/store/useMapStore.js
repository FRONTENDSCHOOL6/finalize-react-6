import createStore from './createStore';

const mapStore = (set) => ({
  name: '',
  address: '',
  handleName: (newName) =>
    set(
      (state) => {
        state.name = newName;
      },
      false,
      'mapName/change'
    ),
  handleAddress: (newAddress) =>
    set(
      (state) => {
        state.address = newAddress;
      },
      false,
      'mapAddress/change'
    ),
});

export const useMapStore = createStore(mapStore);
