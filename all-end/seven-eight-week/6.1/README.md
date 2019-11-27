
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



3. cat /etc/passwd |grep docker
   cat /etc/group |grep docker
   ps aux | grep jenkins
   id
   docker exec -it jenkins-demo /bin/bash
   使用docker exec -it -uroot 容器名称 /bin/bash进入，这样就是管理员了。


   cd ~/software/docker-compose/jenkins
   cd /src/dokcer/jenkins_demo
   ls  -alh



   WARNING: Service "jenkins" is using volume "/var/jenkins_home" from the previous container. Host mapping "/src/docker/jenkins_demo" has no effect. Remove Recreating jenkins-demo ... done