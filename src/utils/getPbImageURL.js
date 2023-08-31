export const getPbImageURL = (item, fileName = 'photo') =>
  `https://react-mission.pockethost.io/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
