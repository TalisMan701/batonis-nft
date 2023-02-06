### Запуск
1. Переименовать .env.dist в .env и заполнить поля под сеть в которую будем деплоить (для локального запуска можно не заполнять)
2. Установить зависимости `npm install`
3. Запустить локальный провайдер `npm run local_node`. Отобразит адрес для общения по JSON-RPC и выдаст все аккаунты для тестов (адреса и приват ключи)
4. Запустить сборку `npm run compile`
5. Прогнать тесты `npm run test` (сеть hardhat, для тестов в реальных сетях в hardhat.config должны быть прописаны 5 аккаунтов и на них должны быть балансы)
6. Локальный деплой `npm run deploy -- hardhat` или в тестовую сеть `npm run deploy -- rinkeby`, `npm run deploy -- polygonMumbai`, в продакшн `npm run deploy -- mainnet`, `npm run deploy -- polygon`

Скрипты по желанию правим в `package.json`
