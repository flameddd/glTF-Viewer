import App from './App.svelte';
import './ModelViewer.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
