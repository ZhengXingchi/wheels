
# 1. docker build read/write on closed pipe 
```
docker  build -t web:1.0 .
docker build read/write on closed pipe 
Error response from daemon: mkdir /var/lib/docker/tmp/docker-builder431720135: read-only file system
```

参考[on building docker image level=error msg=“Can't close tar writer: io: read/write on closed pipe”](https://stackoverflow.com/questions/46971182/on-building-docker-image-level-error-msg-cant-close-tar-writer-io-read-write)
I had this problem in Ubuntu and sudo service docker restart fixed it





# 2. Jenkins failure during trigger

You might be using multi-configuration job.

If this is the case try to configure "a free-style software project" first. The log will look like the following:

Started by an SCM change
Checkout:...
Using strategy: Default
Last Built Revision: Revision ...
Fetching changes from 1 remote Git repository
Fetching upstream changes from ...
Commencing build of Revision ...
Checking out Revision ...
[job-name] $ /bin/sh -xe /tmp/hudson7227596484536996852.sh



## 3. 
   cat /etc/passwd |grep docker
   cat /etc/group |grep docker
   ps aux | grep jenkins
   id



   cd ~/software/docker-compose/jenkins
   cd /src/docker/jenkins_demo
   ls  -alh



#### 3.1   WARNING: Service "jenkins" is using volume "/var/jenkins_home" from the previous container. Host mapping "/src/docker/jenkins_demo" has no effect. Remove Recreating jenkins-demo ... done

   chmod -R 777 /src/dokcer/jenkins_demo


#### 3.2 /usr/bin/docker: 2: .: Can't open /etc/sysconfig/docker
在docker-compose.yml增加映射，完整文件如下
```
version: '3'
services:
  jenkins:
    container_name: 'jenkins-demo'
    image: jenkins/jenkins:lts
    restart: always
    user: jenkins:990
    ports: 
    - "10006:8080"
    - "50001:50000"
    - "10052:10051"
    volumes:
      - /etc/sysconfig/docker:/etc/sysconfig/docker
      - /src/docker/jenkins_demo:/var/jenkins_home
      - $(which docker):/usr/bin/docker:ro
      - /var/run/docker.sock:/var/run/docker.sock
```

#### 3.3 You don't have either docker-client or docker-client-latest installed. Please install either one and retry.
参考[docker-in-docker出现docker: command not found的终极解决方案](https://zhuanlan.zhihu.com/p/69337819)
参考[CentOS Docker 安装](https://www.runoob.com/docker/centos-docker-install.html)
```
[root@centos ~]# rpm -qa |grep docker
docker-common-1.13.1-103.git7f2769b.el7.centos.x86_64
docker-client-1.13.1-103.git7f2769b.el7.centos.x86_64
docker-1.13.1-103.git7f2769b.el7.centos.x86_64
[root@centos ~]# yum remove docker-common-1.13.1-103.git7f2769b.el7.centos.x86_64
[root@centos ~]# yum remove docker-client-1.13.1-103.git7f2769b.el7.centos.x86_64
[root@centos ~]# yum remove docker-1.13.1-103.git7f2769b.el7.centos.x86_64


[root@centos ~]# yum install -y yum-utils \
                 device-mapper-persistent-data \
                 lvm2
[root@centos ~]# yum-config-manager \
                 --add-repo \
                 https://download.docker.com/linux/centos/docker-ce.repo
[root@centos ~]# yum install docker-ce docker-ce-cli containerd.io
如果提示您接受 GPG 密钥，请选是。

[root@centos ~]# systemctl start docker
```

#### 3.4 
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.40/version: dial unix /var/run/docker.sock: connect: permission denied

```
[root@centos ~]# cat /etc/group |grep docker
dockerroot:x:991:
docker:x:990:

取docker-compose.yml的user: jenkins:990
docker exec -it jenkins-demo /bin/bash
使用docker exec -it -uroot 容器名称 /bin/bash进入，这样就是管理员了。
jenkins@d43e0cb773f8:/$ docker version
jenkins@d43e0cb773f8:/$ docker ps
进行测试，看看jenkins-demo容器中能不能运行docker
```


#### 3.5 
Error response from daemon: Unknown runtime specified docker-runc
Error: failed to start containers: 73b1ee0ef25a


原来有docker进程在，重启docker会报错：进入
/var/lib/docker/containers/2d515c435eb99c6b4f2e4beded6e765158294d457048356a380812200/
vim hostconfig.json
找到docker-runc ，删除掉这条
重启docker 就可以了systemctl restart docker



#### 3.6 关于docker目录挂载不错的两篇文章
[关于Docker目录挂载的总结](https://www.cnblogs.com/ivictor/p/4834864.html)
[docker挂载volume的用户权限问题,理解docker容器的uid](https://www.cnblogs.com/woshimrf/p/understand-docker-uid.html)


 









