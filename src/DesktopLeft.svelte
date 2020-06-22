<script>

  export let files;
  export let loadCorset;
  export let loadAstronaut;
  export let skyboxImageSelected;
  export let autoRotate;
  export let exposure;

  let isOnline = navigator.onLine;
  window.addEventListener('online', () => isOnline = true);
  window.addEventListener('offline', () => isOnline = false);

  const skyboxImages = [
    { text: "default", url: "" },
    {
      text: "spruit sunrise",
      url: "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr"
    },
    {
      text: "whipple creek regional park",
      url: "https://modelviewer.dev/assets/whipple_creek_regional_park_04_1k.hdr"
    }
  ];


</script>
<style>
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
    width: 100%;
  }
</style>

<div class="section">
  <div class="title">
    Load <b>glTF/GLB</b> model
  </div>
  <input class="file" type="file" name="load model" bind:files>
</div>
{#if isOnline}
  <div class="section">
    <div class="title">
      or load <b>demo</b> model
    </div>
    <button on:click={loadAstronaut}>load Astronaut (2.7MB)</button>
    <button on:click={loadCorset}>Corset (13MB)</button>
  </div>
{/if}

<div class="section">
  <div class="title"><b>skybox</b> image</div>
  <select bind:value={skyboxImageSelected}>
    {#each skyboxImages as img}
      <option value={img.url}>
        {img.text}
      </option>
    {/each}
  </select>
</div>

<div class="section">
  <div class="title">
    <label for="autorotate" style="display: inline;"><b>auto rotate</b></label>
    <input type=checkbox id="autorotate" bind:checked={autoRotate}>
  </div>
</div>

<div class="section">
  <div class="title">
    <b>exposure: {exposure}</b>
  </div>
  <input class="exposure" type="range" min="0" max="2" step="0.1" bind:value={exposure}>
</div>

