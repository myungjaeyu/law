import { nanoid } from 'nanoid'

const sentencing = (sequelize, Sequelize) => {
    const Sentencing = sequelize.define('sentencing', {
        id: {
            type: Sequelize.STRING,
            defaultValue: nanoid(10),
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        incident: {
            type: Sequelize.STRING,
            allowNull: false
        },
        incident_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        basis: {
            type: Sequelize.STRING,
            allowNull: false
        },
        judgement: {
            type: Sequelize.STRING,
            allowNull: false
        },
        review: {
            type: Sequelize.STRING,
            allowNull: false
        },
        thumbnail: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Sentencing
}

export default sentencing