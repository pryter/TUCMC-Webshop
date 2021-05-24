
export const itemPrice = {
  1000531: 10,
  1000532: 25,
  1000533: 35,
  1000534: 0
}

export const itemAction = (id: number, username: string, amount: string, sendTo: string) => {

  const recipient = sendTo && sendTo !== "" ? sendTo : username

  switch (id) {
    case 1000531:
      return `give ${recipient} potion ${amount} effect:glowing duration:1200 power:1 name:Potion_of_Glowing`
    case 1000532:
      return `give ${recipient} potion ${amount} effect:glowing duration:36000 power:1 name:Potion_of_Glowing`
    case 1000533:
      return `sf give ${recipient} URANIUM ${amount}`
    case 1000534:
      return `sf give ${recipient} TOMATO_SOUP ${amount}`
  }
}