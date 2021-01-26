<template>
  <div class="hello">
    <p>{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  // eslint-disable-next-line class-methods-use-this
  mounted() {
    console.log('Log from component!');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
