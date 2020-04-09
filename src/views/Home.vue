<template>
  <div class="Home">

    <v-container fluid>
      <v-row dense align="center" justify="center">
        <v-col cols=12 align="center">
          <p>This is dbChain's demo site. All the code can be found at <a href="https://github.com/dbchaincloud/demo-apps">github.com</a></p>
          <p>For information about dbChain, please visit <a href="https://www.dbchain.cloud">www.dbchain.cloud</a></p>
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
  name: "DemoBlogIndex",

  data: () => ({
    apps: null,
    i18n: i18n,
    items: [],
  }),

  async created () {
    this.init();
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
