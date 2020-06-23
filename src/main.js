import App from './App.svelte';
import '@google/model-viewer';

const app = new App({
  target: document.body,
  props: {
    name: 'world',
  },
});

export default app;
