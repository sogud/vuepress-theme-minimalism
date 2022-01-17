---
title: Mac下配置ngxin
tags:
  - ngxin
  - Mac
category:
  - Mac
  - ngxin
---

# Mac 系统如何使用 Nginx

1. 使用 brew 安装

```shell
<!-- 更新brew-->
brew update

<!-- 查看安装信息-->
brew -v

<!-- 查看是否安装了nginx-->
brew info nginx

```

2. 安装 nginx

```
brew install nginx
```

3. 启动 nginx

```
<!--启动nginx-->
nginx
<!--重启nginx-->
nginx -s reload
<!--停止nginx-->
nginx -s stop

```
