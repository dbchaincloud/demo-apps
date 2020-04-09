<template>
  <div class="apps">
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field prepend-icon="mdi-account" v-model="name" :label="i18n.t('dbc.account.name')" dense outlined readonly ></v-text-field>
          <v-text-field prepend-icon="mdi-bank" v-model="accountBalance" :label="i18n.t('dbc.account.balance')" dense outlined readonly ></v-text-field>
          <v-text-field prepend-icon="mdi-key" v-model="address" :label="i18n.t('dbc.account.address')" dense outlined readonly ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" sm="1">
          <v-icon>mdi-qrcode</v-icon>
        </v-col>
        <v-col cols="11" sm="11" style="padding:0px">
          <canvas id="canvas"></canvas>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import { i18n } from "../plugins/vuetify.js"
var QRCode = require('qrcode')
import { hasKey, hasPassphrase, getAddress, getAccount, getMyName } from 'dbchain-js-client'

export default {

  data: () => ({
    i18n: i18n,
    name: null,
    accountBalance: 0,
    address: null,
    items: []
  }),

  async created () {
    if(!hasKey()) {
      this.$router.push({ name: "AccountNew" });
      return
    }

    if(!hasPassphrase()) {
      this.$router.push({ name: "AccountSignin" });
      return
    }

    this.prepareItems();

    this.address = getAddress();
    this.name = getMyName()
    var account = await getAccount(this.address)
    if(account != null) {
      if (account.coins.length > 0) {
        this.accountBalance = account.coins[0].amount
      }
    }

    // load qr code
    var canvas = document.getElementById('canvas')
    var name = encodeURIComponent(this.name)
    var qrMessage = `${window.location.origin}/addfriend/${name}/${this.address}`

    QRCode.toCanvas(canvas, qrMessage, function (error) {
      if (error) console.error(error)
    })
  },

  methods: {
    myRouterPush(appCode) {
      this.$router.push({ name: "Database", params: { appCode: appCode } });
    },
    async prepareItems() {
      this.items.push({ text: i18n.t('dbc.nav.home'), disabled: false, href: "/" });
      this.items.push({ text: i18n.t('dbc.nav.account'), disabled: true, href: `/account` });
    },
  }
};
</script>
