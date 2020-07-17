<script>
  import FolderIcon from './folderSVG.svelte';
  import RotateIcon from './rotateSVG.svelte';
  import BrightnessIcon from './brightnessSVG.svelte';
  import models from './models.js';
  import skyboxImages from './skyboxImages.js';

  export let onClose = function () {};
  export let modelURL = '';
  export let isOnline = false;
  export let skyboxImageSelected = '';
  export let autoRotate = false;
  export let exposure = 1;
</script>

<style>
  .container {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .itemSection {
    align-items: center;
    border: 1px solid;
    border-radius: 10px;
    display: inline-flex;
    margin-bottom: 4px;
    padding: 2px;
  }

  .item {
    align-items: center;
    border: 2px solid transparent;
    border-radius: 50%;
    display: inline-flex;
    margin: 5px 2px;
    padding: 5px;
  }

  .closeBtn {
    align-items: center;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 50%;
    display: flex;
    font-size: 1.5rem;
    font-weight: bold;
    height: 50px;
    position: absolute;
    justify-content: center;
    right: 30px;
    top: -35px;
    width: 50px;
  }

  .closeBtn::before {
    content: '↓';
  }

  .modelItem {
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 50%;
    height: 36px;
    width: 36px;
  }

  .skyBox {
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    height: 36px;
    width: 36px;
  }

  .exposure {
    padding: 18px 0;
    margin: 0;
    width: 140px;
  }
</style>

<div class="container">
  <span class="closeBtn" on:click={onClose} />
  <span class="itemSection">
    <span
      class="item"
      on:click={() => document
          .querySelector('#placeholderSelectModelBtn')
          .click()}>
      <FolderIcon props={{ width: '36', height: '36', fill: 'grey' }} />
    </span>
    {#if isOnline}
      {#each models as { url, thumbnailUrl, size }, i}
        <span
          class="item"
          on:click={() => (modelURL = url)}
          style={modelURL === url ? 'border-color: blue;' : ''}>
          <span
            class="modelItem"
            style="background-image: url({thumbnailUrl});" />
        </span>
      {/each}
    {/if}
  </span>
  <span class="itemSection">
    {#each skyboxImages as img}
      <span
        class="item"
        on:click={() => (skyboxImageSelected = img.url)}
        style={skyboxImageSelected === img.url ? 'border-color: blue;' : ''}>
        <span
          class="skyBox"
          style={`background-image: url('${img.backgroundImage}');`} />
      </span>
    {/each}
  </span>
  <span class="itemSection">
    <span
      class="item"
      on:click={() => (autoRotate = !autoRotate)}
      style={autoRotate ? 'border-color: blue;' : ''}>
      <RotateIcon props={{ width: '36', height: '36', fill: 'grey' }} />
    </span>
  </span>

  <span class="itemSection">
    <span class="item" style="border-color: transparent;">
      <BrightnessIcon props={{ width: '36', height: '36', fill: 'grey' }} />
    </span>
    <span class="item" style="border-color: transparent;">
      <input
        class="exposure"
        type="range"
        min="0"
        max="2"
        step="0.1"
        bind:value={exposure} />
    </span>
  </span>
</div>
