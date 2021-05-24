export const send = async (command: string) => {

  const reqData = {
    action: "sendCommand",
    command: command
  }

  const data = await fetch(`/api/database/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData),
    credentials: 'include'
  })

  return await data.json()
}