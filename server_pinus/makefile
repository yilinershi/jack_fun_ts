install:
	@npm install -d
	@echo '============   server_pinus npm installed ============'

rebuild:
	@rm -f ../dist/app
	@echo "清理文件夹success"
	@npm run build

start:
	@rm -f ../dist/app
	@echo "清理文件夹success"
	@npm run start 

## 启动测试服
start_test:
	@pinus start --directory dist --env test

## 启动开发服
start_dev:
	@pinus start --directory dist --env development

## 启动正式服
start_pro:
	@pinus start --directory dist --env production