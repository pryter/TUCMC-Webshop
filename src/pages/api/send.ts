import {NextApiRequest, NextApiResponse} from "next";
import {request} from "../../util/request";
import {pushCMD, transaction} from "../../util/transaction";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "buy": {
          const output = await transaction(req, res, req.body.id)
          res.json(output)
        }break
        case "pushCMD": {
          const output = await pushCMD(req, res)
          res.json(output)
        }break
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}