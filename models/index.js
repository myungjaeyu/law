import Sequelize from 'sequelize'

import sentencing from './sentencing'

const sequelize = new Sequelize(process.env.DB_NAME || 'test_db', process.env.DB_USER || 'testuser', process.env.DB_PASSWORD || 'Test1234@', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'sqlite',
    storage: './law.db',
    operatorAliases: false,
    logging: false
})

const db = {}

db.sentencings = sentencing(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) db[modelName].associate(db)
})

db.Sequelize = Sequelize
db.sequelize = sequelize

export default db