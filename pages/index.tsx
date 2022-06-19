import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Ethgen from './Ethgen'
import Torus from './Torus'

const Home: NextPage = () => {
  return (
    // <Torus></Torus>
    <Ethgen></Ethgen>
  )
}

export default Home
