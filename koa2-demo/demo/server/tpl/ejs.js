module.exports=`
<DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>demo</title>
    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
  </head>
  <body>
  <div class='container'>
    <div class="row">
	  <div class="col-md-8">
	    <h1>标题<%= title%></h1>
	    <p>文字<%=content%></p>
	  </div>
	  <div class="col-md-4">  
	    <p>测试静态页面</p>
	   </div>
	</div>
  </div>
  </body>
` 