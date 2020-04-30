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
                <v-text-field dense solo v-model="title" :loading="loading" :rules="textRules" :label="i18n.t('dbc.demos.blog.index.add_title')" prepend-icon="mdi-database" type="text" />
                <v-textarea dense solo rows="3" v-model="content" :loading="loading" :rules="textRules" :label="i18n.t('dbc.demos.blog.index.add_content')" prepend-icon="mdi-database" type="text" />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :loading="loading" small @click="createPost">{{ i18n.t('dbc.actions.save') }}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
          <v-card class="max-auto" align="left">
            <v-list three-line subheader>
              <v-subheader >
                {{ i18n.t('dbc.demos.blog.index.posts') }}
              </v-subheader>
              <v-divider />

              <v-list-item v-for="(post, i) in posts" :key="i" @click="showPost(post.id)">
                <v-list-item-avatar>
                  <v-img v-if="post.avatarUri" :src="post.avatarUri"></v-img>
                  <v-icon v-else >mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ post.title}}</v-list-item-title>
                  <v-list-item-subtitle>{{ post.content }}</v-list-item-subtitle>
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
import { Querier, getIpfsUrl, getIdsBy, insertRow, getAddress } from "dbchain-js-client"
import { i18n } from "../../plugins/vuetify.js"

export default {
  name: "BlogIndex",

  data: () => ({
    appCode: "2RJJXWWJCY",
    posts : null,
    title: null,
    content: null,
    i18n: i18n,
    items: [],
    loading: null,
    textRules: [
        v => !!v || i18n.t('dbc.validation.field_required'),
    ],

  }),

  async created () {
    this.makeSureUserExists();
    this.prepareItems();
    this.init();
  },

  methods: {
    async init() {
      this.fetchData();
    },

    async makeSureUserExists() {
      var ids = await getIdsBy(this.appCode, "user", "created_by", getAddress()) || []
      if (ids.length < 1) {
        this.$router.push({name: "BlogUser" })
      }
    },

    async getAvatarUri(addr) {
      var Q = Querier(this.appCode)
      var user = await Q.user.equal("created_by", addr).select('avatar').first.val()
      if (user == null) {
        return null
      }
      return getIpfsUrl(user.avatar)
    },

    myRouterPush(tableName) {
      var routeName = this.adminMode ? "Table" : "TableData";
      this.$router.push({ name: routeName, params: { appCode: this.$route.params.appCode, tableName: tableName } });
    },

    async prepareItems() {
      this.items.push({ text: i18n.t('dbc.demos.blog.nav.home'), disabled: true, href: "/" });
    },

    async fetchData() {
      var Q = Querier(this.appCode);
      var posts = await Q.post.val();
      for(var j=0; j<posts.length; j++) {
        posts[j].avatarUri = await this.getAvatarUri(posts[j].created_by)
      }
      this.posts = posts
    },

    showPost(id) {
      this.$router.push({name: "BlogPost", params: { id: id } });
    },

    createPost() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        var that = this;
        var record = {}
        record["title"] = this.title
        record["content"] = this.content
        insertRow(this.appCode, "post", record, function() {
          that.$router.go();
        });
      }
    }
  }
};
</script>
