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
            <v-list three-line subheader>
              <v-subheader >
                {{ i18n.t('dbc.demos.blog.post.post') }}
              </v-subheader>
              <v-divider />

              <v-list-item>
                <v-list-item-avatar>
                  <v-img v-if="post.avatarUri" :src="post.avatarUri"></v-img>
                  <v-icon v-else >mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ post.title}}</v-list-item-title>
                  <p>{{ post.content}}</p>
                </v-list-item-content>
                <v-list-item-action>
                </v-list-item-action>
              </v-list-item>

            </v-list>
          </v-card>

          <v-card class="max-auto" align="left">
            <v-form ref="form" lazy-validation>
              <v-card-text>
                <v-textarea dense solo rows="3" v-model="content" :loading="loading" :rules="textRules" :label="i18n.t('dbc.demos.blog.index.add_content')" prepend-icon="mdi-comment" type="text" />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :loading="loading" small @click="createComment">{{ i18n.t('dbc.actions.save') }}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>

          <v-card class="max-auto" align="left">
            <v-list three-line subheader>
              <v-subheader >
                {{ i18n.t('dbc.demos.blog.post.comments') }}
              </v-subheader>
              <v-divider />

              <v-list-item v-for="(comment, i) in comments" :key="i">
                <v-list-item-avatar>
                  <v-img v-if="comment.avatarUri" :src="comment.avatarUri"></v-img>
                  <v-icon v-else >mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <p> {{ comment.content }} </p>
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
import { Querier, getIpfsUrl, insertRow } from "dbchain-js-client"
import { i18n } from "../../plugins/vuetify.js"

export default {
  name: "BlogPost",

  data: () => ({
    appCode: "2RJJXWWJCY",
    post: {},
    content: null,
    loading: null,
    comments: [],
    i18n: i18n,
    items: [],
    textRules: [
        v => !!v || i18n.t('dbc.validation.field_required'),
    ],

  }),

  async created () {
    this.prepareItems();
    this.init();
  },

  methods: {
    async init() {
      this.fetchData();
    },

    async prepareItems() {
      this.items.push({ text: i18n.t('dbc.demos.blog.nav.home'), disabled: false, href: "/blog" });
      this.items.push({ text: i18n.t('dbc.demos.blog.nav.post'), disabled: true, href: "/" });
    },

    async getAvatarUri(addr) {
      var Q = Querier(this.appCode)
      var user = await Q.user.equal("created_by", addr).select('avatar').first.val()
      if (user == null) {
        return null
      }
      return getIpfsUrl(user.avatar)
    },

    async fetchData() {
      var id = this.$route.params.id;
      var p = Querier(this.appCode).post.find(id);
      this.post = await p.first.val();
      this.post.avatarUri = await this.getAvatarUri(this.post.created_by);
      var comments = await p.comment.val();
      for(var i=0; i < comments.length; i++) {
        var comment = comments[i];
        comment.avatarUri = await this.getAvatarUri(comment.created_by)
      }
      this.comments = comments
    },

    createComment() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        var that = this;
        var record = {}
        record["post_id"] = this.post.id
        record["content"] = this.content
        insertRow(this.appCode, "comment", record, function() {
          that.$router.go();
        });
      }
    }
  }
};
</script>
