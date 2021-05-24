import {request} from "./api";
import {itemAction, itemPrice} from "../config/items";
import Cookies from "cookies"
import FormData from "form-data";
import http from "http"
import {initialiseDB} from "./firebase-admin";

export const transaction = async (req, res, id: number) => {

  try {
    const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
    const data = JSON.parse(cookies.get("userData", {signed: true}))

    const user = await initialiseDB().collection("users").where("username","==", data.username).get()

    if (user.docs[0].get("credits") < (itemPrice[req.body.id] * parseInt(req.body.amount))) {throw "inssuf"}

    await user.docs[0].ref.update({credits: user.docs[0].get("credits") - (itemPrice[req.body.id] * parseInt(req.body.amount))})

    let form = new FormData();

    form.append('API_KEY', process.env.API_KEY);
    form.append('command', itemAction(req.body.id, data.username, req.body.amount, req.body.sendto));
    form.submit("http://api.shop.mc.triamudom.club/api/index.php")


    return {status: true, data: {}}
  } catch (_) {
    return {status: false, data: {}}
  }

}

export const pushCMD = async (req, res) => {

  try {
    const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
    const data = JSON.parse(cookies.get("userData", {signed: true}))

    if (data.username !== "Drpassword" && data.username !== "TonZZ") {throw "not Allowed"}

    let form = new FormData();

    form.append('API_KEY', process.env.API_KEY);
    form.append('command', req.body.cmd);
    form.submit("http://api.shop.mc.triamudom.club/api/index.php")


    return {status: true, data: {}}
  } catch (_) {
    return {status: false, data: {}}
  }
}
