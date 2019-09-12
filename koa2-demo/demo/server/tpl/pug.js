module.exports=`
doctype html
html
  head
    meta(charset='utf-8')
    meta(name='viewport' content='width=device-width,initial-scale=1')
    title demo
    link(href='https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css' rel='stylesheet')
    script(src='https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js')
    script(src='https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.min.js')
  body
    .container
      .row
        .col-md-8
          h1 标题#{title}
          p 文字#{content}
        .col-md-4  
          p 测试动态pug模板引擎
` 