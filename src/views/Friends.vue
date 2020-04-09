<template>
  <div class="friends">
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-divider></v-divider>

    <v-container fluid>
      <v-row dense align="center" justify="center">
        <v-col cols=12 align="center">
          <v-expansion-panels focusable>

            <v-expansion-panel>
              <v-expansion-panel-header>
                {{ i18n.t('dbc.friends.scan_qrcode') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="max-auto" max-width="720" align="left">
                  <qrcode-stream @decode="onDecode" />
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                {{ i18n.t('dbc.friends.send_token') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="max-auto" max-width="720" align="left">
                  <v-card-text >
                    <v-form ref="form" lazy-validation>
                      <v-select :items="amounts" dense solo v-model="amountToSend" :loading="loading" required :label="i18n.t('dbc.friends.amount_to_send')"
                                prepend-icon="mdi-cash"  type="text" />
                      <v-select :items="friends" item-text="display" item-value="address" dense solo v-model="friendToSend" :loading="loading" required :label="i18n.t('dbc.friends.friend_to_send')"
                                prepend-icon="mdi-account"  type="text" />
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" :loading="loading" small @click="uiSendToken">{{ i18n.t('dbc.actions.send') }}</v-btn>
                  </v-card-actions>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>
        </v-col>
      </v-row>

      <v-row dense align="center" justify="center">
        <v-col cols=12 align="center">
          <v-card class="max-auto" v-show="showFriends" align="left">
            <v-list three-line subheader>
              <v-subheader >
                {{ i18n.t('dbc.friends.current_friends') }}
              </v-subheader>
              <v-divider />
              <v-list-item v-for="(friend, i) in friends" :key="i">
                <v-list-item-avatar>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ friend.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ friend.address }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="deleteFriend(friend.address)">
                    <v-icon>mdi-thumb-down</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-row dense align="center" justify="center">
        <v-col cols=12 align="center">
          <v-card class="max-auto" v-show="showPending" max-width="720" align="left">
            <v-list three-line >
              <v-subheader >
                {{ i18n.t('dbc.friends.current_pending_friends') }}
              </v-subheader>
              <v-divider />
              <v-list-item v-for="(friend, i) in pendingFriends" :key="i">
                <v-list-item-avatar>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ friend.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ friend.address }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="acceptFriend(friend.address)">
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn>
                  <v-btn icon @click="rejectFriend(friend.address)">
                    <v-icon>mdi-thumb-down</v-icon>
                  </v-btn>
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
import {QrcodeStream} from "vue-qrcode-reader"
import { i18n } from "../plugins/vuetify.js"
import { getLocalFriends, getLocalFriendName, removeLocalFriend, getAddress, getFriends,
         getPendingFriends, addFriend, respondFriend, sendToken, getMyName
       } from 'dbchain-js-client'

export default {
  components: { QrcodeStream },
  data: () => ({
    i18n: i18n,
    scanned_name: '',
    scanned_address: '',
    amountToSend: null,
    amounts: [10, 50, 100, 500, 1000, 5000],
    friendToSend: null,
    friends: null,
    pendingFriends: null,
    showFriends: false,
    showPending: false,
    loading: false,
    items: null,
  }),

  created () {
    this.init()
  },

  watch: {
    friends: function (newValue) {
      if (newValue.length > 0) {
        this.showFriends = true
      } else {
        this.showFriends = false
      }
    },

    pendingFriends: function (newValue) {
      if (newValue.length > 0) {
        this.showPending = true
      } else {
        this.showPending = false
      }
    }
  },

  methods: {
    init() {
      this.populateFriends()
      this.prepareItems()
      this.populatePendingFriends()
    },

    populatePendingFriends: async function() {
      var friends = await getPendingFriends()
      this.pendingFriends = []
      for(var i = 0; i < friends.length; i++) {
        var friend = friends[i]
        var addr = friend.address
        var name = friend.name
        let partialAddress = addr.slice(addr.length - 10)
        this.pendingFriends.push({ address: addr, name: name, display: `${name} (${partialAddress})`})
      }
    },

    populateFriends: async function() {
      var friends = await getFriends()
      this.friends = []
      for(var i = 0; i < friends.length; i++) {
        var friend = friends[i]
        var addr = friend.address
        var name = friend.name
        let partialAddress = addr.slice(addr.length - 10)
        this.friends.push({ address: addr, name: name, display: `${name} (${partialAddress})`})
      }

      // add local friends if there is any
      this.tryAddLocalFriends()
    },

    async prepareItems() {
      this.items = [];
      this.items.push({ text: i18n.t('dbc.nav.home'), disabled: false, href: "/" });
      this.items.push({ text: i18n.t('dbc.nav.friends'), disabled: true, href: `/friends` });
    },

    addressExisted (addr) {
      for(var i = 0; i < this.friends.length; i++) {
          var friend = this.friends[i]
          if (friend.address == addr) {
            return true
          }
      }
      return false
    },

    async tryAddLocalFriends () {
      var localFriends = getLocalFriends();
      var myAddress = getAddress();
      for(var i = 0; i < localFriends.length; i++) {
        var addr = localFriends[i]
        if (addr == myAddress) {
          // for now the user name is stored in the friend list
          // and the getMyName of profile.js would migrate the owner name to a new/better place
          getMyName()
          removeLocalFriend(addr)
          continue
        }
        if (this.addressExisted(addr)) {
          continue
        }
        var name = getLocalFriendName(addr)
        addFriend(getMyName(), addr, name, function() {
          removeLocalFriend(addr)
        })
      }
    },

    onDecode: function (decodedString) {
        try {
            if(this.parse(decodedString)) {
                window.location = decodedString
            }
        }catch(err) {
            // do nothing
        }
    },

    parse: function(url) {
      // a sample url: http://192.168.3.100:3001/addfriend/ethan%20apple/cosmos1jyqjtjsagdd0gxykp9xp7szu0v8857739wrtud
      var parts = url.split("/")
      this.scanned_name    = parts[4]
      this.scanned_address = parts[5]

      if (parts[1] == "" && parts[3] == "addfriend" && this.scanned_name && this.scanned_address && this.scanned_address.length > 40) {
          return true
      } else {
          return false
      }
    },

    getFriendName: function(addr) {
      for(var i = 0; i < this.friends.length; i++) {
          let friend = this.friends[i]
          if (friend.address == addr) {
            return friend.name
          }
      }
      return "Unknown" // this is impossible
    },

    uiSendToken: async function() {
      if(!this.friendToSend) {
        alert(i18n.t('dbc.friends.pick_recipient'))
        return
      }
      if(!this.amountToSend) {
        alert(i18n.t('dbc.friends.pick_amount'))
        return
      }
      let address = this.friendToSend
      let name = this.getFriendName(address)
      let shortAddress = address.slice(address.length - 10)
      let amount = this.amountToSend

      if(confirm(i18n.t('dbc.friends.sending_confirm', [amount, `${name} (${shortAddress})`]))) {
        this.loading = true
        var that = this
        await sendToken(address, amount.toString(), function() {
          that.loading = false
          that.init()
        })
      }
    },

    deleteFriend: async function(address) {
      var that = this;
      respondFriend(address, "delete", function() {
        that.init()
      })
    },

    acceptFriend: async function(address) {
      var that = this;
      respondFriend(address, "accept", function() {
        that.init()
      })
    },

    rejectFriend: async function(address) {
      var that = this;
      respondFriend(address, "reject", function() {
        that.init()
      })
    },
  },
}
</script>
