install:
	@npm install -d
	@echo '============   server_pinus npm installed ============'

start:
	@npm run build && npm run start 

## 启动测试服
start_test:
	@pinus start --directory dist --env test

## 启动开发服
start_dev:
	@pinus start --directory dist --env development

## 启动正式服
start_pro:
	@pinus start --directory dist --env production