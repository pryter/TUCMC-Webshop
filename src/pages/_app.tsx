import React, {useEffect} from 'react'
import {AppProps} from 'next/app'
import "../styles/tailwind.css"
import Head from "next/head";

const App = ({Component, pageProps}: AppProps) => {

  return (
    <div className="antialiased">
      <Head>
        <title>TUCMC Official Minecraft Shop</title>
      </Head>
      <Component {...pageProps} />
    </div>)

}

export default App