@echo off
start cmd /k mongod
cd src/server && start cmd /k node app.js
cd ../../src/webapp && grunt