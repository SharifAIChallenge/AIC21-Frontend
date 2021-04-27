<template>
  <div class="live">
    <style>
      .h_iframe-aparat_embed_frame {
        position: relative;
      }
      .h_iframe-aparat_embed_frame .ratio {
        display: block;
        width: 100%;
        height: auto;
      }
      .h_iframe-aparat_embed_frame iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    </style>
    <div class="h_iframe-aparat_embed_frame">
      <span style="display: block;padding-top: 57%"></span>
      <iframe
        scrolling="no"
        allowFullScreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        src="https://www.aparat.com/embed/live/aichallenge"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.live {
  margin-top: 100px;
  position: relative;
}
</style>
