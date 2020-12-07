$(function() {
    //点击注册账号链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    //点击登录链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    //从layui中获取from对象
    var form = layui.form;
    var layer = layui.layer;
    //通过form.verify()函数自定义
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //效验密码
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link_login').click();
        })
    });

    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！');
                }
                layer.msg('登录成功！');
                // console.log(res.token);
                // location.href = 'www.4399.com';
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    });
})