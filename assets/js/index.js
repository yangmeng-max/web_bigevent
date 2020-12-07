$(function() {
    //调用getUserInfo获取用户基本信息
    getUserInfo();
    //弹窗
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function(index) {
                //清空本地储存
                localStorage.removeItem('token');
                //跳转至登陆页面
                location.href = '/login.html';
                layer.close(index);

            })
    })
});

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data);
        }
    })
};

//渲染用户头像
function renderAvatar(user) {
    //获取用户昵称
    var name = user.nickname || user.username;
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        //转成大写
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}