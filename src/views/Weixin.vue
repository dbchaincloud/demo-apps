<template>
   <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols=12 align="center">
          <v-card class="max-auto" max-width="720" align="left">
            <v-card-title>
              {{ this.message1 }}
            </v-card-title>
            <v-card-text>
              {{ this.message2 }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { i18n } from "../plugins/vuetify.js"

export default {

  data: () => ({
    i18n: i18n,
    message1 : '',
    message2 : '',
  }),

  created () {
    this.init();
  },

  methods: {
    init() {
      if (i18n.locale == 'zhHans') {
        this.message1 = "亲爱的用户:"
        this.message2 = "由于微信浏览器不能支持库链的一些功能，请点击屏幕右上面按钮，选择系统浏览器。欢迎使用库链云!"
      } else {
        this.message1 = "Dear user:"
        this.message2 = "Since wechat does not support some features of dbChain Cloud Service, please click the button at top right corner of the screen, and then choose browser. Welcome to dbChain Cloud!"
      }
    }
  },
}

</script>

