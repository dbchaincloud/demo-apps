<template>
  <div class="addfriend">
    <h1>This is adding friend page</h1>
  </div>
</template>

<script>
import { addLocalFriend } from "dbchain-js-client"
import { i18n } from "../plugins/vuetify.js"

export default {

  data: () => ({
  }),

  created () {
    var name    = this.$route.params.name;
    var address = this.$route.params.address;
    if (confirm(i18n.t('dbc.friends.adding_confirm', [address, name]))) {
      addLocalFriend(address, name);
      this.$router.push({ name: "Friends" });
    } else {
      this.$router.push({ name: "Home" });
    }
  },

  methods: {

  },
}

</script>

