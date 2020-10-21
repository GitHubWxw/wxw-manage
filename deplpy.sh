###
 # @Descripttion: 
 # @version: V 1.0
 # @Author: wxw
 # @Date: 2020-10-22 00:09:56
### 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd wxw-manage

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:GitHubWxw/wxw-manage.git main:gh-pages

cd -