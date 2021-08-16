import { NextApiRequest, NextApiResponse } from 'next'

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
            name,
            incident,
            incident_type,
            basis,
            judgement,
            review,
            thumbnail
        })

        res.json({
            sentencing
        })

    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler