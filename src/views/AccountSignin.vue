<template>
  <div class="apps">
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-divider></v-divider>

    <v-container class="fill-height" fluid >
      <v-row align="center" justify="center" >
        <v-col cols="12" sm="8" md="4" >
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat >
                <v-toolbar-title>{{ i18n.t('dbc.account.login_title') }}</v-toolbar-title>
                <v-spacer />
                </v-toolbar>

              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="passphrase" :rules="passphraseRules" required :label="i18n.t('dbc.account.password')" prepend-icon="mdi-lock" type="password" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="savePassphrase">{{ i18n.t('dbc.actions.login') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

  </div>
</template>

<script>
import { hasPassphrase, savePassphrase } from 'dbchain-js-client'
import { i18n } from "../plugins/vuetify.js"

export default {
  name: "Accounts",

  data: () => ({
    i18n: i18n,
    passphrase: null,
    valid: true,
    passphraseRules: [
        v => !!v || i18n.t('dbc.validation.field_required'),
        v => (v && v.length >= 8) || i18n.t('dbc.validation.at_least_8'),
    ],
    items: []
  }),

  created () {
    // make the app bulletproof
    if(hasPassphrase()) {
      this.$router.push({ name: "Account" });
      return
    }

    this.prepareItems();
  },

  methods: {
    async prepareItems() {
      this.items.push({ text: i18n.t('dbc.nav.home'), disabled: false, href: "/" });
      this.items.push({ text: i18n.t('dbc.nav.account'), disabled: true, href: `/account` });

    },
    login () {
      if (this.$refs.form.validate()) {
        alert("Bingo");
      }
    },
    savePassphrase: function() {
      if (this.$refs.form.validate()) {
        var pp = this.passphrase;
        if(!savePassphrase(pp)) {
          this.passphrase = "";
        } else {
          this.$router.push({ name: "Account" });
        }
      }
    }
  }
};
</script>
