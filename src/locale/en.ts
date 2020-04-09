export default {
  $vuetify: {
    close: 'Close',
    dataIterator: {
      pageText: '{0}-{1} of {2}',
      noResultsText: 'No matching records found',
      loadingText: 'Loading items...',
    },
    dataTable: {
      itemsPerPageText: 'Rows per page:',
      ariaLabel: {
        sortDescending: ': Sorted descending. Activate to remove sorting.',
        sortAscending: ': Sorted ascending. Activate to sort descending.',
        sortNone: ': Not sorted. Activate to sort ascending.',
      },
      sortBy: 'Sort by',
    },
    dataFooter: {
      pageText: '{0}-{1} of {2}',
      itemsPerPageText: 'Items per page:',
      itemsPerPageAll: 'All',
      nextPage: 'Next page',
      prevPage: 'Previous page',
      firstPage: 'First page',
      lastPage: 'Last page',
    },
    datePicker: {
      itemsSelected: '{0} selected',
    },
    noDataText: 'No data available',
    carousel: {
      prev: 'Previous visual',
      next: 'Next visual',
    },
    calendar: {
      moreEvents: '{0} more',
    },
  },

  dbc: {
    nav: {
      title: 'dbChain Cloud Service',
      footer_left: 'dbChain',
      home: 'Home',
      app: 'Application',
      friends: 'Friends',
      account: 'Account',
      exit: 'Exit',
    },
    validation: {
      field_required: 'Field is required!',
      field_no_empty: 'Field must not be empty!',
      at_least_8: 'At least 8 characters!',
      invalid_mnemonic: 'Invalid mnemonic words!',
    },
    actions: {
      save: 'Save',
      login: 'Login',
      send: 'Send',
    },
    account: {
      generate_account: 'Generate account',
      please_select: 'Please select:',
      radio_generate: 'Generate mnemonic words',
      radio_import: 'Import mnemonic words',
      mnemonic_label: 'Mnemonic words (12 words)',
      generate_btn: 'Generate',
      password: 'Password',
      password_again: 'Password again',
      login_title: 'Login',
      name: 'Name',
      balance: 'Balance',
      address: 'Address',
      mnemonic_prompt: 'Please write down the follow 12 words in the exact order and keep them safe. They are required when you recover the keys: '
    },
    friends: {
      scan_qrcode: 'Scan qrcode',
      send_token: 'Send token',
      current_friends: 'Friends:',
      current_pending_friends: 'Pending friends:',
      amount_to_send: 'Amount',
      friend_to_send: 'Recipient',
      pick_recipient: 'Please pick a recipient',
      pick_amount: 'Please pick an amount',
      sending_confirm: 'Please confirm you are sending {0} token to {1}.',
      adding_confirm: 'Please confirm adding address {0} of {1}.',
    },
    demos: {
      demos_list: 'Demo list:',
      blog: {
        nav: {
          home: 'Home',
          post: 'Post',
          user: 'User',
        },
        index: {
          add_title: 'add post',
          add_content: 'add content',
          posts: 'Posts',
        },
        user: {
          name: 'Name',
          avatar: 'Avatar',
        },
        post: {
          post: 'Post',
          comments: 'Comments',
        }
      },
    },
  },
}
