<script>
  let files;
  let openLeft = true;

  const skyboxImages = [
    { text: "No Image", url: "" },
    {
      text: "spruit sunrise",
      url: "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr"
    },
    {
      text: "whipple creek regional park",
      url: "https://modelviewer.dev/assets/whipple_creek_regional_park_04_1k.hdr"
    }
  ];

  let skyboxImageSelected = "";


  const test0 = `https://tdalapi.culture.tw/preview_model/f89e8e7b-5b97-4271-9b80-d0c4adb94bf8/8b0e7d46-e1d4-4c83-9fe5-16b8572fdb2e/preview_model.glb`
  const test1 = `https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Corset/glTF-Binary/Corset.glb`
  const test2 = `https://github.com/google/model-viewer/raw/master/packages/shared-assets/models/shishkebab.glb`;

  let modelURL = test0;
  function loadDemoModel () {
    modelURL = test1;
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
    position: relative;
    overflow: hidden;
    transition: flex-basis 0.3s;
  }

  .openLeft {
    flex-basis: 320px;
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
  }

  .openLeftBtn:hover, .openLeftBtn:active {
    background-color: lightblue;
  }

  .modelViewer {
    display: block;
    height: 100%;
    width: 100%;
  }

  .closeLeft {
    border: 1px solid;
  }
</style>

<div class="container">
  <div class="left" class:openLeft>
    <button class="closeLeft" on:click={() => openLeft = false}>close</button>
    <input type="file" name="load model" bind:files>
    <button on:click={loadDemoModel}>load Demo Model</button>
    <div><b>skybox image:</b> {skyboxImages.filter(img => img.url === skyboxImageSelected)[0].text}</div>
    <div>
    <select bind:value={skyboxImageSelected}>
      {#each skyboxImages as img}
        <option value={img.url}>
          {img.text}
        </option>
      {/each}
    </select>
    </div>
  </div>

  <div class="right">
    {#if !openLeft}
      <button class="openLeftBtn" on:click={() => openLeft = true}>></button>
    {/if}

    {#if files && files[0]}
      <model-viewer
        class="modelViewer"
        src={URL.createObjectURL(files[0])}
        alt="A 3D model of an astronaut"
        auto-rotate
        camera-controls
      />
    {:else}
      <model-viewer
        class="modelViewer"
        src={modelURL}
        skybox-image={skyboxImageSelected || undefined}
        auto-rotate
        camera-controls
      />

    {/if}
  </div>
</div>

