import { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'

import db from '../../../models'

db.sequelize.sync()

const Sentencings = db.sentencings

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {

        const {
            name,
            incident,
            incident_type,
            basis,
            judgement,
            review,
            thumbnail
        } = _req.body

        const sentencing = await Sentencings.create({
            id: nanoid(10),
            name,
            incident,
            incident_type,
            basis,
            judgement,
            review,
            thumbnail
        })

        res.json({
            ...sentencing.dataValues
        })

    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler