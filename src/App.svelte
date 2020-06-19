<script>
  let files;
</script>



<style>
	h1 {
		color: purple;
	}

  .test {
    display: block;
    height: 400px;
    width: auto;
  }
  .mousemove {
    height: 50%;
    background: pink;
  }
</style>
<input type="file" name="load model" bind:files>

{#if files && files[0]}
	<p>
		{files[0].name}
  </p>
  <div>
<model-viewer
  class="test"
  src={URL.createObjectURL(files[0])}
  alt="A 3D model of an astronaut"
  auto-rotate
  camera-controls
/>

	</div>
{/if}
<div>
  <model-viewer
    class="test"
    src="https://tdalapi.culture.tw/preview_model/f89e8e7b-5b97-4271-9b80-d0c4adb94bf8/8b0e7d46-e1d4-4c83-9fe5-16b8572fdb2e/preview_model.glb"
  />

</div>

