export default {
  $vuetify: {
    close: 'Close',
    dataIterator: {
      pageText: '{0}-{1} of {2}',
      noResultsText: 'No matching records found',
      loadingText: 'Loading items...',
    },
    dataTable: {
      itemsPerPageText: '每页行数:',
      ariaLabel: {
        sortDescending: ': Sorted descending. Activate to remove sorting.',
        sortAscending: ': Sorted ascending. Activate to sort descending.',
        sortNone: ': Not sorted. Activate to sort ascending.',
      },
      sortBy: '排序字段',
    },
    dataFooter: {
      pageText: '{0}-{1} 共{2}条记录 ',
      itemsPerPageText: '每页行数:',
      itemsPerPageAll: '全部',
      nextPage: '下一页',
      prevPage: '前一页',
      firstPage: '第一页',
      lastPage: '最后一页',
    },
    datePicker: {
      itemsSelected: '{0} selected',
    },
    noDataText: '没有数据',
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
      title: '库链云',
      footer_left: '库链',
      home: '主页',
      app: '应用',
      friends: '好友',
      account: '账号',
      exit: '退出',
    },
    validation: {
      field_required: '必填字段!',
      field_no_empty: '字段不能为空!',
      at_least_8: '至少8个字符',
      invalid_mnemonic: '非合格助记词!',
    },
    actions: {
      save: '保存',
      login: '登录',
      send: '发送',
    },
    account: {
      generate_account: '创建账号',
      please_select: '请选择:',
      radio_generate: '创建助记词',
      radio_import: '导入助记词',
      mnemonic_label: '助记词(12个空格隔开的英文单词)',
      generate_btn: '创建',
      password: '密码',
      password_again: '再次输入密码',
      login_title: '登录',
      name: '名字',
      balance: '余额',
      address: '密钥地址',
      mnemonic_prompt: '请把下面12个单词按照既有顺序写下来，保存好并注意保密。将来在你恢复账号的时候会用到。',
    },
    friends: {
      scan_qrcode: '扫描二维码',
      send_token: '发送积分',
      current_friends: '好友:',
      current_pending_friends: '待确认好友:',
      amount_to_send: '金额',
      friend_to_send: '接收者',
      pick_recipient: '请挑选一位接收者',
      pick_amount: '请选择金额',
      sending_confirm: '您确定发送{0}积分给{1}么？',
      adding_confirm: '您确定添加{1}的地址{0}么？',
    },
    demos: {
      demos_list: '演示应用列表:',
      blog: {
        nav: {
          home: '首页',
          post: '帖子',
          user: '用户',
        },
        index: {
          add_title: '添加标题',
          add_content: '添加内容',
          posts: '帖子列表',
        },
        user: {
          name: '名字',
          avatar: '头像',
        },
        post: {
          post: '帖子',
          comments: '回复',
        }
      }
    }
  },
}
