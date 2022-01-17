---
title: Terminal下的一些配置
date: 2018-01-13 16:07:32
tags:
  - JavaScript
  - git
category: git
---

# mac下修改hosts文件
```vim
sudo vim /private/etc/hosts
```

# Git 配置用户信息与 SSH 密钥
### mac下使用homebrew

查看用 brew 安装的文件

`brew list`

`brew list`软件名 可以查看路径

使用`vscode` 在`terminal`打开文件 `code ./`

需要在`vscode`中安装`code`命令

### 安装完 Git 第一件事要配置自己的信息

查看
```git
    $ git config user.name 
    $ git config user.email
```
设置
```git
    $ git config --global user.name "John Doe"
    $ git config --global user.email "johndoe@example.com"
```

### 连接远程仓库要配置自己的 ssh 秘钥

默认情况下，用户的 SSH 私钥存储在其 ~/.ssh 目录下。 进入该目录并列出其中内容，你便可以快速确认自己是否已拥有私钥：

```git
    $ cd ~/.ssh
    $ ls
    authorized_keys2  id_dsa       known_hosts
    config            id_dsa.pub

    cat id_dsa.pub
```

### 如果没有 SSH 私钥则需要创建一个私钥来放到 Github 上面使用

```git
    $ ssh-keygen
    Generating public/private rsa key pair.
    Enter file in which to save the key (/home/schacon/.ssh/id_rsa):
    Created directory '/home/schacon/.ssh'.
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /home/schacon/.ssh/id_rsa.
    Your public key has been saved in /home/schacon/.ssh/id_rsa.pub.
    The key fingerprint is:
    d0:82:24:8e:d7:f1:bb:9b:33:53:96:93:49:da:9b:e3 schacon@mylaptop.local
```
### 查看全局安装过的包
```
npm list -g --depth 0
```