import {NextApiRequest, NextApiResponse} from "next";
import {request} from "../../util/request";
import {login} from "../../util/auth";
import Cookies from "cookies"
import {initialiseDB} from "../../util/firebase-admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "login": {
          const output = await login(req, res)
          res.json(output)
        }break
        case "getData": {
          const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
          const rawData = cookies.get("userData", {signed: true})
          let data

          if (rawData) {
            data = JSON.parse(cookies.get("userData", {signed: true}))
            const res = await initialiseDB().collection("users").where("username" , "==", data.username).get()
            data = {...data, ...{credits: res.docs[0].get("credits") || 0}}
          }else{
            data = {}
          }

          res.json({status: true, data: data})
        }break
        case "logout": {
          const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
          cookies.set("userData")
          res.json({status: true, data: {}})
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}