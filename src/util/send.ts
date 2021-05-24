import FormData from "form-data";
import Cookies from "cookies"

export const pushCMD = async (req, res) => {

  try {
    const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})
    const data = JSON.parse(cookies.get("userData", {signed: true}))

    if (data.username !== "Drpassword" && data.username !== "TonZZ") {throw "not Allowed"}

    let form = new FormData();

    form.append('API_KEY', process.env.API_KEY);
    form.append('command', `${req.body.command}`);
    form.submit("http://api.shop.mc.triamudom.club/api/index.php")


    return {status: true, data: {}}
  } catch (_) {
    return {status: false, data: {}}
  }
}