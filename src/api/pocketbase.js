import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

// PocketBase SDK {}
export default pb;