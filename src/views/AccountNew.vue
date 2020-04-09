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
            <v-toolbar-title>{{ i18n.t('dbc.account.generate_account') }}</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>

                <v-radio-group v-model="radios">
                  <template v-slot:label>
                    <div>{{ i18n.t('dbc.account.please_select') }}</div>
                  </template>
                  <v-radio value="generate">
                    <template v-slot:label>
                      <div>{{ i18n.t('dbc.account.radio_generate') }}</div>
                    </template>
                  </v-radio>
                  <v-radio value="import">
                    <template v-slot:label>
                      <div>{{ i18n.t('dbc.account.radio_import') }}</div>
                    </template>
                  </v-radio>
                </v-radio-group>

                <v-textarea v-model="importedMnemonic" v-show="showTextarea" :rules="mnemonicRules" rows="3" outlined :label="i18n.t('dbc.account.mnemonic_label')" prepend-icon="mdi-head-question" type="text">
                </v-textarea>

                <v-divider />
                <br />

                <v-text-field v-model="name" :rules="nameRules" required :label="i18n.t('dbc.account.name')" prepend-icon="mdi-account" type="text" />
                <v-text-field v-model="passphrase1" :rules="passphraseRules" required :label="i18n.t('dbc.account.password')" prepend-icon="mdi-lock" type="password" />
                <v-text-field v-model="passphrase2" :rules="passphraseRules" required :label="i18n.t('dbc.account.password_again')" prepend-icon="mdi-lock" type="password" />
              </v-form>
              <div>
                <p> <span style="color:red">{{ i18n.t('dbc.account.mnemonic_prompt') }} </span>
                  <br/>
                  <br/>
                  {{ resultMnemonic }}
                </p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="createKey">{{ i18n.t('dbc.account.generate_btn') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { validateMnemonic, newMnemonic, createAndStoreKey, setMyName } from 'dbchain-js-client'
import { i18n } from "../plugins/vuetify.js"

export default {

  data: () => ({
    i18n: i18n,
    radios: "generate",
    showTextarea: false,
    generatedMnemonic: null,
    importedMnemonic: null,
    resultMnemonic: null,
    name: null,
    passphrase1: null,
    passphrase2: null,
    valid: true,
    mnRulesSrc1: [
        v => !!v || i18n.t('dbc.validation.field_required'),
        w => validateMnemonic(w) || i18n.t('dbc.validation.invalid_mnemonic'),
    ],
    mnRulesSrc2: [],
    mnemonicRules: [],
    nameRules: [
        v => !!v || i18n.t('dbc.validation.field_required'),
    ],
    passphraseRules: [
        v => !!v || i18n.t('dbc.validation.field_required'),
        v => (v && v.length >= 8) || i18n.t('dbc.validation.at_least_8'),
    ],
    items: []
  }),

  created () {
    this.prepareItems();
    this.generatedMnemonic = newMnemonic();
    this.resultMnemonic = this.generatedMnemonic;
  },

  watch: {
    radios: function (newValue) {
      if (newValue == "generate") {
        this.showTextarea = false;
        this.resultMnemonic = this.generatedMnemonic;
        this.mnemonicRules = this.mnRulesSrc2;
      }
      if (newValue == "import") {
        this.showTextarea = true;
        this.resultMnemonic = this.importedMnemonic;
        this.mnemonicRules = this.mnRulesSrc1;
      }
    },

    importedMnemonic: function(newValue) {
      if (this.radios == "import") {
        this.resultMnemonic = newValue;
      }
    },
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
    createKey: function() {
      if (this.$refs.form.validate()) {
        var pp1 = this.passphrase1;
        var pp2 = this.passphrase2;
        if(pp1 == pp2) {
          createAndStoreKey(this.resultMnemonic, pp1);
          if(this.name) { setMyName(this.name) }
          this.$router.push({ name: "Account" });
        } else {
          this.passphrase1 = "";
          this.passphrase2 = "";
        }
      }
    },
  }
};
</script>
