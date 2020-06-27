<script>
  export let label;
  export let thumbnailUrl;
  export let handleOnClick;
</script>

<style>
  .container {
    align-items: center;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    flex: 1 0 190px;
    margin: 6px 6px 0;
    max-width: 230px;
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
    flex: 0 0 50px;
    height: 50px;
  }

  .label {
    flex: 1;
    font-weight: bold;
    margin: 0 8px;
    text-align: center;
  }
</style>

<div class="container" on:click={handleOnClick}>
  <div class="thumbnail" style="background-image: url({thumbnailUrl});" />
  <div class="label">{label}</div>
</div>
