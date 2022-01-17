# [解决使用git，ssh每次都要输入密码](https://www.cnblogs.com/dayang12525/p/12509053.html)

建议：生成ssh 公钥私钥的时候，不要输入密码。

解决方案：

1、修改密码：使用命令 ssh-keygen -p 然后修改密码的时候直接回车，也就是把密码置空。

2、重新生成ssh key, 用 `ssh-keygen -t rsa -C "your_email@example.com"`

其中，问你是否覆盖 输入y  ——  Overwrite (y/n)? y

其余全部回车，千万不要在Enter passphrase (empty for no passphrase)输入密码了。

再把公钥复制下放到github或者其他托管平台上。

