
* m1的mac电脑docker安装mysql:[Mac m1 docker 安装mysql](https://www.jianshu.com/p/eb3d9129d880)

* docker 挂载
```
    docker run -d  --name mysql-docker \
    -v /Users/even/workspace/docker-v/mysql/data:/var/lib/mysql \
    -v /Users/even/workspace/docker-v/mysql/conf:/etc/mysql \
    -v /Users/even/workspace/docker-v/mysql/log:/var/log/mysql \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=123456 \
    mysql/mysql-server \
    --character-set-server=utf8mb4 \
    --collation-server=utf8mb4_general_ci
```

