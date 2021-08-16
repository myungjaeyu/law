import { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
            return cb(null, file.originalname)
        },
    }),
})

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {

        if (_req.method !== 'POST') {
            res.status(400).send({ message: 'Only POST requests allowed' })
            return
        }

        const uploadMiddleware = upload.array('theFiles')

        uploadMiddleware(_req, res, (err, e) => {

            if (err) {

                res.json({
                    done: false
                })

                return
            }

            res.json({
                done: true
            })

        })

    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler

export const config = {
    api: {
        bodyParser: false
    }
}