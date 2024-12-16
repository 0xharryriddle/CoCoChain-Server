npx sequelize-cli --config ./src/config/config.ts --models-path ./src/models --migrations-path ./src/migrations --seeders-path ./src/seeders model:generate --name Role --attributes roleName:string,roleValue:enum:'{0,1,2}'

tsc ./src/migrations/ --outDir ./src/migrations/compiled
