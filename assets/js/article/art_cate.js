// 获取 表格数据
const initArtCateList = () => {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    data: null,
    success: res => {
      console.log(res)
      const { status, message, data } = res

      if (status !== 0) return layer.msg(message)
      const htmlStr = template('tpl-table', data)
      $('#tb').empty().html(htmlStr)
    },
  })
}

initArtCateList()

const layer = layui.layer

$('#btnAddCate').click(() => {
  layer.open({
    type: 1,
    area: ['500px', '250px'],
    title: '添加文章分类',
    content: $('#dialog-add').html(),
  })
})

// 通过代理监听 submit 事件
$('body').on('submit', '#form-add', function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/my/article/addcates',
    data: $(this).serialize(),
    success: res => {
      if (res.status !== 0) return layer.msg('新增分类失败！')
      initArtCateList()
      layer.msg('新增分类成功！')
      layer.close(indexAdd)
    },
  })
})

$('body').on('submit', '#form-add', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: "/my/article/addcates",
    data: $(this).serialize(),
    success: res => {
      console.log(res)
    },
  })
})
