
export const request = async (path: string, data: {}, action: string = ""): Promise<{status: boolean, data: any}> => {

  const reqData = {
    action: action,
    ...data
  }

  try {
    const res = await fetch(`${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
      credentials: 'include'
    })

    return await res.json()
  } catch (e) {
    return {status: false, data: {}}
  }

}