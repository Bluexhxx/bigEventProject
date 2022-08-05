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
const form = layui.form
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

// 通过代理方式，为 btn-edit 按钮绑定点击事件
let indexEdit = null
$('#tb').on('click', '.btn-edit', function () {
  layer.open({
    type: 1,
    area: ['500px', '250px'],
    title: '添加文章分类',
    content: $('#dialog-edit').html(),
  })
  // 用attr 设置自定义属性
  let id = $(this).attr('data-id')
  // 发起请求获取对应分类的数据
  $.ajax({
    method: 'GET',
    url: '/my/article/cates/' + id, // 接口上显示的是冒号不是查询字符串 解释是url 参数 直接在后面+拼接
    success: res => {
      // console.log(res)
      const { status, message, data } = res
      if (status !== 0) return layer.msg(message)
      form.val('formEdit', data)
    },
  })
})
// 更新文章分类
$('body').on('submit', '#form-edit', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/my/article/updatecate',
    data: form.val('formEdit'),
    success: res => {
      if (res.status !== 0) {
        return layer.msg('更新分类数据失败！')
      }
      layer.msg('更新分类数据成功！')
      layer.close(indexEdit)
      initArtCateList()
    },
  })
})

$('#tb').on('click', '.btn-delete', function () {
  // console.log(1)
  const id = $(this).attr('data-id')
  $.ajax({
    method: 'GET',
    url: '/my/article/deletecate/' + id,
    data: null,
    success: res => {
      const { status, message } = res
      layer.msg(message)
      if (status !== 0) return
      initArtCateList()
    },
  })
})
