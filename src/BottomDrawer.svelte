<script>
  import FolderIcon from './folderSVG.svelte';
  import RotateIcon from './rotateSVG.svelte';
  import BrightnessIcon from './brightnessSVG.svelte';
  import models from './models.js';
  import skyboxImages from './skyboxImages.js';
  import BottomListDivider from './BottomListDivider.svelte';

  export let modelURL = '';
  export let isOnline = false;
  export let skyboxImageSelected = '';
  export let autoRotate = false;
  export let exposure = 1;
</script>

<style>
  .container {
    display: flex;
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    width: 100%;
  }

  .item {
    align-items: center;
    border: 2px solid transparent;
    border-radius: 50%;
    display: inline-flex;
    margin: 2px;
    padding: 5px;
    scroll-snap-align: center;
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
  <BottomListDivider />
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
  <BottomListDivider />
  <span
    class="item"
    on:click={() => (autoRotate = !autoRotate)}
    style={autoRotate ? 'border-color: blue;' : ''}>
    <RotateIcon props={{ width: '36', height: '36', fill: 'grey' }} />
  </span>
  <BottomListDivider />
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
</div>
