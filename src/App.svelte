<script>
  import DesktopLeft from './DesktopLeft.svelte';

  // Check that service workers are supported
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }

  let files;

  let openLeft = true;
  let autoRotate = false;
  let exposure = 1;

  let skyboxImageSelected = '';

  let modelURL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
  function loadCorset() {
    modelURL =
      'https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Corset/glTF-Binary/Corset.glb';
  }
  function loadAstronaut() {
    modelURL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
  }
</script>

<style>
  .container {
    display: flex;
    height: 100%;
  }

  .left {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 0px;
    padding: 0px;
    position: relative;
    overflow: hidden;
    transition: flex-basis 0.3s;
  }

  .openLeft {
    flex-basis: 320px;
    padding: 15px;
    padding-right: 20px;
  }

  .right {
    border: 1px solid blue;
    position: relative;
    flex: 1;
  }

  .openLeftBtn {
    background-color: transparent;
    border: 0;
    display: inline-block;
    height: 100%;
    left: 0;
    margin: 0;
    padding: 15px;
    position: absolute;
    transition: background-color 0.3s;
    z-index: 1;
    color: grey;
  }

  .openLeftBtn:hover,
  .openLeftBtn:active {
    background-color: lightblue;
  }
  .openLeftBtn::before {
    content: '>';
  }

  .modelViewer {
    display: block;
    height: 100%;
    width: 100%;
  }

  .closeLeft {
    right: 0;
    padding: 0 12px;
    position: absolute;
    height: 100%;
    top: 0;
    color: grey;
    border: 0;
    background: transparent;
  }
  .closeLeft::before {
    content: '<';
  }

  .closeLeft:hover,
  .closeLeft:active {
    background-color: lightblue;
  }
</style>

<div class="container">
  <div class="left" class:openLeft>
    {#if openLeft}
      <button class="closeLeft" on:click={() => (openLeft = false)} />
    {/if}
    <DesktopLeft
      bind:files
      {loadCorset}
      {loadAstronaut}
      bind:skyboxImageSelected
      bind:autoRotate
      bind:exposure />
  </div>

  <div class="right">
    {#if !openLeft}
      <button class="openLeftBtn" on:click={() => (openLeft = true)} />
    {/if}

    {#if files && files[0]}
      <model-viewer
        class="modelViewer"
        src={URL.createObjectURL(files[0])}
        alt="A 3D model of an astronaut"
        auto-rotate={autoRotate || undefined}
        camera-controls />
    {:else}
      <model-viewer
        class="modelViewer"
        src={modelURL}
        skybox-image={skyboxImageSelected || undefined}
        auto-rotate={autoRotate || undefined}
        camera-controls
        {exposure} />
    {/if}
  </div>
</div>
