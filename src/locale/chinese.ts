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
