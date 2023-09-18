import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.VITE_PB_URL);
pb.autoCancellation(false);

// PocketBase SDK {}
export default pb;
