$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // console.log(options);
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    // 全局统一挂载  complete  回调函数
    options.complete = function(res) {
        // console.log(res);
        //在complete回调函数中可以使用responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})