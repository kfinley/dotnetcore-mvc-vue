<template>
  <footer class="border-top footer text-muted">
    <div class="container">
      &copy; 2021 - dotnetcore_mvc_vue -
      <a :href="privacyUrl">{{ privacyText }}</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LayoutFooter extends Vue {
  @Prop() private privacyUrl!: string;

  @Prop() private privacyText!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  white-space: nowrap;
  line-height: 60px; /* Vertically center the text there */
}
</style>
