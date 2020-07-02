<p align="center">
  <video width="auto" height="600" src="./demo.mp4">
</p>

# PWA glTF/GLB models viewer
- desktop/mobile
- PWA install/support offline
- load local file
- drawer wit control panel(desktop/mobile version)

## layout
- desktop flexbox
  - left fix, right flex: 1, center content
- mobile
  - hide left
  - empty right, show load button
  - scroll up 1px when load file for hide URL bar
  - icon on the top, click show drawer
- lint, hooks (done)
- PWA manifest file (done)
- Service worker
  - re-think cache file (demo model?, skybox?) strategy
  - add npm script ? workbox-cli create SW.js (done)
- CI/CD deploy to github page (done)
- open left button's > set to css before content, not use string (done)

## feature
- environment-image: (done)
  - dropdown list
  - https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr
- exposure (done)
- shadow-intensity (效果不明顯，先 pass)
- shadow-softness (效果不明顯，先 pass)
- auto-rotate: true/false (done)

## pick colors
- https://learnui.design/tools/accessible-color-generator.html


*Psst — looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*


---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.


## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
cd public
now
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public
```
