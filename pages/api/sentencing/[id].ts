import { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../models'

db.sequelize.sync()

const Sentencings = db.sentencings

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {

        const { id } = _req.query

        const sentencing = await Sentencings.findOne({ where: { id } })

        res.json({
            ...sentencing.dataValues
        })

    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler