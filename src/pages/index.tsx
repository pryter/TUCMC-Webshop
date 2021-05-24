import {send} from "../util/send";
import {useEffect, useState} from "react";
import {ArchiveIcon, CashIcon, MailIcon, PhoneIcon} from "@heroicons/react/solid";
import {LoginIcon, LogoutIcon} from "@heroicons/react/outline"
import {request} from "../util/api";

const fetchData = async (setData) => {
  const res = await request("/api/auth", {}, "getData")
  if (res.status) {
    setData({...res.data, ...{profileURL: `https://crafatar.com/avatars/${res.data.uuid}.png`}})
  }
}

const Index = () => {

  const [amount, setAmount] = useState("")
  const [sendTo, setSendTo] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState({username: "", profileURL: "", credits: 0})
  const [username, setUsername] = useState("")
  const [buying, setBuying] = useState({
    id: 0,
    name: '',
    title: '',
    price: 0,
    imageUrl:
      '',
  })

  useEffect(() => {
    fetchData(setUserData)
  }, [])

  const login = async (e) => {
    e.preventDefault()

    const res = await request("/api/auth", {
      username: username,
      password: password
    }, "login")

    if (res.status) {
      fetchData(setUserData)
    }
  }

  const signout = async (e) => {
    e.preventDefault()

    await request("/api/auth", {}, "logout")

    fetchData(setUserData)
  }

  const closeMod = () => {
    setBuying({
      id: 0,
      name: '',
      title: '',
      price: 0,
      imageUrl:
        '',
    })
  }

  const buy = async (e) => {
    e.preventDefault()

    const res = await request("/api/send", {
      id: buying.id,
      sendto: sendTo,
      amount: amount
    }, "buy")

    closeMod()
    fetchData(setUserData)
  }
  const items = [
    {
      id: 1000531,
      name: 'Glowing Potion',
      title: 'Potion of Glowing 1 min',
      price: 10,
      imageUrl:
        'https://4.bp.blogspot.com/-5tKlHV5nSFM/WUGNWBIMZCI/AAAAAAAAWOw/oI_tGikp1HsKnYrNw5Tv02_uWgMgD0YewCLcBGAs/s1600/Light-Up-Potion-Bottle-1.jpg',
    },
    {
      id: 1000532,
      name: 'Glowing Potion',
      title: 'Potion of Glowing 20 mins',
      price: 25,
      imageUrl:
        'https://4.bp.blogspot.com/-5tKlHV5nSFM/WUGNWBIMZCI/AAAAAAAAWOw/oI_tGikp1HsKnYrNw5Tv02_uWgMgD0YewCLcBGAs/s1600/Light-Up-Potion-Bottle-1.jpg',
    },
    {
      id: 1000533,
      name: 'Uranium',
      title: 'Be careful ! Its very radioactive.',
      price: 35,
      imageUrl:
        '  https://minecraft-heads.com/media/k2/items/cache/3d7e7965c998ec08b348a17830ff3be5_XS.jpg',
    }
  ]

  return (
    <div className="font-display px-6">
      {buying.name !== "" && <div className="flex justify-center items-center absolute top-0 left-0 min-h-screen w-full bg-gray-600 bg-opacity-50 z-20 px-4">
          <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                      <div>
                          <h3 className="flex items-center text-lg leading-6 font-medium text-gray-900">{buying.name} <span
                              className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 ml-2 rounded-full">
                  {buying.price} THB
                </span></h3>
                          <div className="mt-1 max-w-xl text-sm text-gray-500">
                              <p>{buying.title}</p>
                          </div>
                      </div>
                      <img className="w-10 h-10 bg-gray-300 flex-shrink-0 mx-4" src={buying.imageUrl} alt=""/>
                  </div>
                  <form className="mt-4">
                      <div className="flex space-x-2 mb-2">
                          <div className="w-8/12">
                              <label htmlFor="email" className="sr-only">
                                  Send to (optional)
                              </label>
                              <input
                                  type="text"
                                  name="to"
                                  id="to"
                                  onChange={event => {setSendTo(event.target.value)}}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Send to (optional)"
                              />
                          </div>
                          <div className="w-4/12">
                              <label htmlFor="email" className="sr-only">
                                  Amount
                              </label>
                              <input
                                  type="text"
                                  name="amount"
                                  id="amount"
                                  onChange={event => {setAmount(event.target.value)}}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Amount"
                                  required
                              />
                          </div>
                      </div>
                      <div className="flex w-full space-x-2">
                          <button
                              type="button"
                              onClick={closeMod}
                              className="mt-3 w-1/2 flex items-center justify-center px-4 py-2 border border-gray-300 hover:bg-gray-100 shadow-sm font-medium rounded-md text-black sm:mt-0 sm:text-sm"
                          >
                              Cancel
                          </button>
                          <button
                              type="button"
                              onClick={buy}
                              className="mt-3 w-1/2 flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
                          >
                              Buy
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>}
      <h1 className="text-center my-10 text-2xl font-semibold">TUCMC Official Minecraft Shop</h1>
      <div className="flex flex-col-reverse md:flex-row md:space-x-6 justify-between items-start max-w-7xl mx-auto ">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 mx-auto">
          {items.map((person, index) => (
            <li key={index} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
              <div className="w-full flex items-center justify-between p-6">
                <div className="flex-shrink-0 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">{person.name}</h3>
                    <span
                      className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {person.price} THB
                </span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">{person.title}</p>
                </div>
                <div className="flex justify-end w-[160px]">
                  <img className="w-10 h-10 bg-gray-300 flex-shrink-0" src={person.imageUrl} alt=""/>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex items-center justify-center text-sm">
                    <a
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <ArchiveIcon className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                      <span className="ml-3">999 left</span>
                    </a>
                  </div>
                  <div onClick={() => {userData.credits >= person.price && userData.username && setBuying(person)}} className="-ml-px w-0 flex-1 flex hover:bg-gray-100 cursor-pointer">
                    <a
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <CashIcon className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                      <span className="ml-3">Buy</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-white px-8 py-5 rounded-md shadow-md mx-auto mb-6">
          {userData.username ? <div>
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-nowrap">
              <div className="ml-4 mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={userData.profileURL}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{userData.username}</h3>
                    <p className="text-sm text-gray-500">
                      <a href="#">Credits: {userData.credits}</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0 flex ml-16">
                <button
                  type="button"
                  onClick={signout}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogoutIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>: <div className="flex flex-col w-full sm:w-[300px]">
            <form onSubmit={login}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 space-y-2">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={event => {setUsername(event.target.value)}}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Username"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={event => {setPassword(event.target.value)}}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Password (For the first time, type anything)"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LoginIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                  <span>Login</span>
                </button>
              </div>
            </form>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Index