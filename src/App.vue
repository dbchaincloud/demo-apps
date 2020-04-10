<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
      <v-list>

        <v-list-item @click.stop="$router.push('/')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ i18n.t("dbc.nav.home") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.stop="$router.push('/friends')">
          <v-list-item-action>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ i18n.t("dbc.nav.friends") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.stop="$router.push('/account')">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ i18n.t("dbc.nav.account") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.stop="$router.push('/exit')">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ i18n.t("dbc.nav.exit") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      color="blue-grey"
      dark
    >
      <v-img class="mx-2" :src="require('./assets/logo.png')" max-width="60" max-height="60" contain></v-img>
      <v-toolbar-title>{{ i18n.t("dbc.nav.title") }}</v-toolbar-title>
      <v-spacer />
      <v-chip class="ma-2" color="dark" small text-color="white" @click="switchLang"> {{ language }}  </v-chip>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" />
    </v-app-bar>


    <v-content>
      <router-view :key="i18n.locale" />
    </v-content>

    <v-navigation-drawer
      v-model="right"
      fixed
      right
      temporary
    />

    <v-footer
      app
      color="blue-grey"
      class="white--text"
    >
      <span>{{ i18n.t('dbc.nav.footer_left') }}</span>
      <v-spacer />
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { i18n } from "./plugins/vuetify.js"
  import { setBaseUrl } from "dbchain-js-client"

  export default {
    props: {
      source: String,
    },

    data: () => ({
      i18n: i18n,
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
      language: "中文",
    }),

    created() {
      setBaseUrl("https://www.dbchain.cloud/relay");
      this.initLang();
    },

    methods: {
      initLang () {
        var lang = navigator.language;
        if (lang == 'zh-CN') {
          this.language = 'English';
          i18n.locale = 'zhHans';
        } else {
          this.language = '中文';
          i18n.locale = 'en';
        }
      },

      switchLang () {
        if (this.language == 'English') {
          this.language = '中文';
          i18n.locale = 'en';
        } else {
          this.language = 'English';
          i18n.locale = 'zhHans';
        }
      }
    }
  }
</script>
