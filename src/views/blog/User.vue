<template>
  <div class="database">
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-divider></v-divider>

    <v-container fluid>
      <v-row dense align="center" justify="center">
        <v-col cols=12 align="center">
          <v-card class="max-auto" align="left">
            <v-form ref="form" lazy-validation>
              <v-card-text>
                <v-text-field dense solo v-model="name" :loading="loading" :rules="textRules" :label="i18n.t('dbc.demos.blog.user.name')" prepend-icon="mdi-database" type="text" />
                <v-file-input dense solo v-model="avatar" :loading="loading" :rules="textRules" :label="i18n.t('dbc.demos.blog.user.avatar')" />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :loading="loading" small @click="createUser">{{ i18n.t('dbc.actions.save') }}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import { insertRow, uploadFile, getMyName } from "dbchain-js-client"
import { i18n } from "../../plugins/vuetify.js"

export default {
  name: "DemoBlogIndex",

  data: () => ({
    appCode: "CTOGVQFVYE",
    name: null,
    avatar: null,
    i18n: i18n,
    items: [],
    loading: null,
    textRules: [
        v => !!v || i18n.t('dbc.validation.field_required'),
    ],

  }),

  async created () {
    this.name = getMyName()
    this.prepareItems();
  },

  methods: {
    async prepareItems() {
      this.items.push({ text: i18n.t('dbc.demos.blog.nav.home'), disabled: false, href: "/demos/blog" });
      this.items.push({ text: i18n.t('dbc.demos.blog.nav.user'), disabled: true, href: "/demos/blog/user" });
    },

    async createUser() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        var that = this;
        var record = {}
        var fileHash = await uploadFile(this.avatar)
        if (fileHash == null || fileHash == "") {
          this.loading = false
          return
        }
        record["avatar"] = fileHash
        record["name"] = this.name
        insertRow(this.appCode, "user", record, function() {
          that.$router.go();
        });
      }
    }
  }
};
</script>
