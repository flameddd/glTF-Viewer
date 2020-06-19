<script>
  let files;
  export let openLeft = true;

  function handleOnCloseLeft () {
    openLeft = !openLeft;
    console.log('test')
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
    border: 1px solid red;
    position: relative;
    overflow: hidden;
    transition: flex-basis 0.3s;
  }

  .openLeft {
    flex-basis: 320px;
  }

  .right {
    border: 1px solid blue;
    display: relative;
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

  .openLeftBtn:hover {
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
    <span>open 嗎？ {openLeft}</span>  
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
        src="https://tdalapi.culture.tw/preview_model/f89e8e7b-5b97-4271-9b80-d0c4adb94bf8/8b0e7d46-e1d4-4c83-9fe5-16b8572fdb2e/preview_model.glb"
        auto-rotate
        camera-controls
      />

    {/if}
  </div>
</div>

