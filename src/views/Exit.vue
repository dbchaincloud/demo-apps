<template>
  <div class="exit">
  </div>
</template>

<script>
import {removePassphrase} from 'dbchain-js-client'

export default {
  created () {
    removePassphrase();
    this.$router.push({ name: "Home" });
  }
};
</script>
