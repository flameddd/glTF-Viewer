<script>
  import TryOneOfThere from './TryOneOfThese.svelte';
  import ModelSquare from './ModelSquare.svelte';
  import models from './models.js';
  import skyboxImages from './skyboxImages.js';

  export let files;
  export let handleOnChange;
  export let modelURL;
  export let skyboxImageSelected;
  export let autoRotate;
  export let exposure;
  export let isOnline;

  function handleOnClick(url) {
    modelURL = url;
  }
</script>

<style>
  .container {
    height: 100%;
    overflow-y: auto;
  }

  .section {
    margin-bottom: 12px;
  }

  .title {
    margin-bottom: 5px;
  }

  .exposure {
    width: 100%;
  }

  .file {
    margin: 0;
    width: 100%;
  }

  .modelsSection {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .skyboxSelect {
    width: 100%;
  }
</style>

<div class="container">
  <div class="section">
    <div class="title">
      Select
      <b>glTF/GLB</b>
      model
    </div>
    <input
      id="placeholderSelectModelBtn"
      class="file"
      type="file"
      name="load model"
      bind:files
      on:change={handleOnChange} />
  </div>
  {#if isOnline}
    <div class="section">
      <TryOneOfThere />
      <div class="modelsSection">
        {#each models as { url, thumbnailUrl, size }, i}
          <ModelSquare
            {thumbnailUrl}
            {size}
            handleOnClick={() => handleOnClick(url)} />
        {/each}
      </div>
    </div>
  {/if}

  <div class="section">
    <div class="title">
      <b>skybox</b>
      image
    </div>
    <select class="skyboxSelect" bind:value={skyboxImageSelected}>
      {#each skyboxImages as img}
        <option value={img.url}>{img.text}</option>
      {/each}
    </select>
  </div>

  <div class="section">
    <div class="title">
      <label for="autorotate" style="display: inline;">
        <b>auto rotate</b>
      </label>
      <input type="checkbox" id="autorotate" bind:checked={autoRotate} />
    </div>
  </div>

  <div class="section">
    <div class="title">
      <b>exposure: {exposure}</b>
    </div>
    <input
      class="exposure"
      type="range"
      min="0"
      max="2"
      step="0.1"
      bind:value={exposure} />
  </div>
</div>
