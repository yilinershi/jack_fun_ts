

# docker安装mysql
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

# 流程
* 1、gate服务器：有且只有一个，客户端连接gate服务器完成登录，获取到token,同时gate服务器会指定客户端去连哪一个connector服务器（因为connecotr服务器可能会有多个）
* 2、connector服务器:用于建立了与多个客户端的映射连接。 客户端断开与gate的连接后，通过token连接connector服务器，这样，一个connector服务器就建立了与多个客户端的映射连接。connector仅持有客户端的连接，不作任何逻辑操作。
* 3、lobby服务器：用于排行榜，玩家信息修改，邮件等功能的
* 4、game服务器：用于具体的游戏逻辑业务


