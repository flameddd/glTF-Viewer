<script>
  import DesktopLeft from './DesktopLeft.svelte';
  import ModelCard from './ModelCard.svelte';
  import TryOneOfThere from './TryOneOfThese.svelte';
  import models from './models.js';
  import BottomDrawer from './BottomDrawer.svelte';

  // Check that service workers are supported
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      // eslint-disable-next-line no-undef
      navigator.serviceWorker.register(`${process.env.swPath}sw.js`);
    });
  }

  const URL = window.URL;

  let isOnline = navigator.onLine;
  window.addEventListener('online', () => (isOnline = true));
  window.addEventListener('offline', () => (isOnline = false));

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
    position: relative;
  }

  .left {
    background-color: #f6f8fa;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 0px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s;
  }

  .openLeft {
    flex-basis: 30%;
    padding: 15px;
    padding-right: 20px;
    max-width: 320px;
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
    transition: height 0.3s ease-in-out;
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
    flex: 0 0 150px;
    width: 150px;
  }

  .selectAnModelBtn {
    color: #0366d6;
    cursor: pointer;
    font-size: 4vw;
    font-weight: bold;
    margin: 1rem 0;
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
    margin: 0;
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

  .mobileBottomDrawer {
    display: none;
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
      flex-basis: 100px;
      width: 100px;
    }

    .mobileBottomDrawer {
      background-color: white;
      border: 1px solid;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      position: absolute;
      height: 90px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-height: 450px) {
    .modelCardTitle,
    .modelCards {
      display: none;
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
      bind:exposure
      bind:isOnline />
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
      {#if isOnline}
        <span class="modelCardTitle">
          <TryOneOfThere />
        </span>
        <div class="modelCards">
          {#each models as { url, label, thumbnailUrl }, i}
            <ModelCard
              {label}
              {thumbnailUrl}
              handleOnClick={() => (modelURL = url)} />
          {/each}
        </div>
      {/if}
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
  {#if modelURL}
    <div class="mobileBottomDrawer">
      <BottomDrawer
        bind:modelURL
        bind:isOnline
        bind:skyboxImageSelected
        bind:autoRotate
        bind:exposure />
    </div>
  {/if}
</div>
