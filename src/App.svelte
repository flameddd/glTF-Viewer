<script>

  import 'model-viewer';
	export let name;

  export let file = ''

	function handleClick() {
    console.log(file)
	}
</script>



<style>
	h1 {
		color: purple;
	}

  .test {
    display: block;
    height: 400px;
  }
</style>

<h1>Hello {name}!</h1>
<div>
  <input type="file" name="select modal" bind:value={file} />
</div>
<div>
  <button on:click={handleClick}>
	  Click me
  </button>
</div>


<model-viewer
  class="test"
  src="https://tdalapi.culture.tw/preview_model/f89e8e7b-5b97-4271-9b80-d0c4adb94bf8/8b0e7d46-e1d4-4c83-9fe5-16b8572fdb2e/preview_model.glb" alt="A 3D model of an astronaut" auto-rotate camera-controls></model-viewer>
<model-viewer
  class="test"
  src={file} alt="A 3D model of an astronaut" auto-rotate camera-controls></model-viewer>

