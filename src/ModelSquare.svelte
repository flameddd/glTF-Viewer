<script>
  export let thumbnailUrl;
  export let handleOnClick;
  export let size;
</script>

<style>
  .container {
    background-color: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    margin: 0 6px;
    padding: 7px;
  }

  .container:hover {
    background-color: #f5f5f5;
  }

  .thumbnail {
    background-color: #fff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 3px;
    height: 50px;
    width: 50px;
  }

  .size {
    text-align: center;
    font-weight: bold;
  }
</style>

<div class="container" on:click={handleOnClick}>
  <div class="thumbnail" style="background-image: url({thumbnailUrl});" />
  <div class="size">{size}</div>
</div>
