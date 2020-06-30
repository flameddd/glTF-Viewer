<script>
  import DesktopLeft from './DesktopLeft.svelte';
  import ModelCard from './ModelCard.svelte';
  import TryOneOfThere from './TryOneOfThese.svelte';
  import models from './models.js';

  // Check that service workers are supported
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      // eslint-disable-next-line no-undef
      navigator.serviceWorker.register(`${process.env.swPath}sw.js`);
    });
  }

  const URL = window.URL;

  let files;

  let openLeft = true;
  let autoRotate = false;
  let exposure = 1;

  let skyboxImageSelected = '';

  let modelURL = '';
</script>

<style>
  .container {
    display: flex;
    height: 100%;
  }

  .left {
    background-color: #f6f8fa;
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
    align-items: center;
    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path d="M1 2V0h1v1H0v1z" fill-opacity=".025"/></svg>');
    background-size: 20px 20px;
    border: 1px solid #e1e4e8;
    display: flex;
    flex-flow: column;
    flex: 1;
    justify-content: center;
    position: relative;
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

  .appLogo {
    background-image: url('./assets/imgs/glTF_Viewer192x192.png');
    background-repeat: no-repeat;
    background-size: contain;
    height: 150px;
    margin: 60px 0;
    width: 150px;
  }

  .selectAnModelBtn {
    color: #0366d6;
    cursor: pointer;
    font-size: 4vw;
    font-weight: bold;
    margin: 0;
    text-align: center;
    white-space: nowrap;
  }

  .selectAnModelBtn:hover {
    text-decoration: underline;
  }

  .modelCards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
  }

  .modelViewer {
    display: block;
    height: 100%;
    width: 100%;
  }

  .closeLeftBtn {
    right: 0;
    padding: 0 12px;
    position: absolute;
    height: 100%;
    top: 0;
    color: grey;
    border: 0;
    background: transparent;
  }
  .closeLeftBtn::before {
    content: '<';
  }

  .closeLeftBtn:hover,
  .closeLeftBtn:active {
    background-color: lightblue;
  }

  @media (max-width: 600px) {
    .left,
    .closeLeftBtn,
    .openLeftBtn {
      display: none;
    }

    .selectAnModelBtn {
      font-size: 1.5rem;
    }

    .appLogo {
      height: 100px;
      margin: 40px 0;
      width: 100px;
    }
  }
</style>

<div class="container">
  <div class="left" class:openLeft>
    {#if openLeft}
      <button class="closeLeftBtn" on:click={() => (openLeft = false)} />
    {/if}
    <DesktopLeft
      bind:files
      handleOnChange={() => (modelURL = URL.createObjectURL(files[0]))}
      bind:modelURL
      bind:skyboxImageSelected
      bind:autoRotate
      bind:exposure />
  </div>

  <div class="right">
    {#if !openLeft}
      <button class="openLeftBtn" on:click={() => (openLeft = true)} />
    {/if}

    {#if !modelURL}
      <div class="appLogo" />
      <p
        class="selectAnModelBtn"
        on:click={() => document
            .querySelector('#placeholderSelectModelBtn')
            .click()}>
        Select glTF/GLB model
      </p>
      <input
        id="placeholderSelectModelBtn"
        type="file"
        bind:files
        style="display: none;"
        on:change={() => (modelURL = URL.createObjectURL(files[0]))} />
      <TryOneOfThere />
      <div class="modelCards">
        {#each models as { url, label, thumbnailUrl }, i}
          <ModelCard
            {label}
            {thumbnailUrl}
            handleOnClick={() => (modelURL = url)} />
        {/each}
      </div>
    {/if}

    {#if modelURL}
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
