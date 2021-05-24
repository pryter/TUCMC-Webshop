import Cookies from "cookies"
import {initialiseDB} from "./firebase-admin";
import {use} from "ast-types";
import bcrypt from "bcryptjs"

async function getId(playername) {
  try {
    const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${playername}`)
    if (!res.status) return ""
    const json = await res.json()
    return json.id
  }catch (e) {
    return ""
  }
}

export const login = async (req, res) => {

  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
  const expiresTime = (new Date().getTime()) + 24 * 60 * 60 * 1000;

  if (req.body.username === "") return {status: false, data: {}}

  const user = await initialiseDB().collection("users").where("username","==", req.body.username).get()

  if (user.empty) {
    await initialiseDB().collection("users").add({username: req.body.username, credits: 500, password: bcrypt.hashSync(req.body.password, 8)})
  }else{
    if (!bcrypt.compareSync(req.body.password, user.docs[0].get("password"))) {return {status: false, data: {}}}
  }

  const data = {username: req.body.username, uuid: await getId(req.body.username)}

  const jsonData = JSON.stringify(data)

  cookies.set('userData', jsonData, {
    httpOnly: true,
    sameSite: 'lax',
    signed: true,
    expires: new Date(expiresTime)
  })

  return {status: true, data: {}}
}