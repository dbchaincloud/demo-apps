<template>
  <div class="Home">

    <v-container fluid>
      <v-row dense align="center" justify="center">
        <v-col cols=12 align="center">
          <div v-html="rawHtml"></div>

          <v-card class="max-auto" align="left">
            <v-list three-line subheader>
              <v-subheader >
                {{ i18n.t('dbc.demos.demos_list') }}
              </v-subheader>
              <v-divider />

              <v-list-item v-for="(app, i) in apps" :key="i" @click="goToApp(app.routeName)">
                <v-list-item-avatar>
                  <v-icon>mdi-movie-open</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ app.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{ app.description}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                </v-list-item-action>
              </v-list-item>

            </v-list>
          </v-card>
        </v-col>
      </v-row>

    </v-container>




  </div>
</template>

<script>
import { i18n } from "../plugins/vuetify.js"

export default {
  name: "BlogIndex",

  data: () => ({
    apps: null,
    i18n: i18n,
    items: [],
    rawHtml: null,
    rawHtmlEn: null,
    rawHtmlCh: null,
  }),

  async created () {
    this.init();
    this.populateContent();
    if (i18n.locale == 'en') {
      this.rawHtml = this.rawHtmlEn
    } else {
      this.rawHtml = this.rawHtmlCh
    }
  },

  methods: {
    async init() {
      this.apps = [
        { name: "西方博客平台",
          routeName: "BlogIndex",
          description: "测试项目",
        },
      ]
    },

    populateContent() {
      this.rawHtmlEn = `
        <p>This is dbChain's demo site. All the code can be found at <a href="https://github.com/dbchaincloud/demo-apps">github.com</a></p>
        <p>For information about dbChain, please visit <a href="https://www.dbchain.cloud">www.dbchain.cloud</a></p>`

      this.rawHtmlCh = `
        <p>这里是库链云演示网站。本网站所有代码都可以在这里获得 <a href="https://github.com/dbchaincloud/demo-apps">github.com</a></p>
        <p>如果您希望了解更多关于库链云的信息，请访问 <a href="https://www.dbchain.cloud">www.dbchain.cloud</a></p>`
    },

    myRouterPush(tableName) {
      var routeName = this.adminMode ? "Table" : "TableData";
      this.$router.push({ name: routeName, params: { appCode: this.$route.params.appCode, tableName: tableName } });
    },

    goToApp(routeName) {
      this.$router.push({name: routeName })
    }
  }
};
</script>
