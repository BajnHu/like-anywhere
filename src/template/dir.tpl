<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
  <style type="text/css">
    *{margin:0;padding:0;}
    .clear-fix:after {
      content: "";
      height: 0;
      display: block;
      visibility: hidden;
      clear: both;
    }
    .file-box{
      width: 100%;
      margin: 50px;
    }
    .file{
      color: cadetblue;
      display: block;
      height: 20px;
      line-height: 20px;
      float: left;
      margin:10px 5px;
      min-width: 200px;
      text-decoration: none;
    }
    .icon{
      color: #333;
      font-weight: bold;
      text-decoration: none;
      padding: 0 5px;
    }
    .file-name{
      text-decoration: underline;
    }
    .path-group{
      margin: 20px 50px;
      height: 20px;
    }
    .path-group .path-url{
      float: left;
      width: 100px;
      padding: 0 5px;
      line-height: 20px;
      color: cadetblue;
      text-decoration: none;
    }
  </style>
</head>
<body>
<body>
<div class="path-group clear-fix">
  <a class="path-url" href="{{rootPath}}">~</a>
  <a class="path-url" href="{{prevPath}}">../</a>
</div>
<div class="file-box clear-fix">
  {{#each files}}
  <a class="file" href="{{../dir}}/{{file}}" title="{{file}}">
    <span class="icon"> [{{icon}}]</span>
    <span class="file-name">{{file}}</span>
  </a>
  {{/each}}
</div>

</body>
</html>
