import { ethers } from 'ethers'
import { useEffect, useState } from 'react';
import QRCode from "react-qr-code";

const index = () => {

    const [address, setAddress] = useState<any>()
    const [mnemonic, setMnemonic] = useState<any>('')
    const [privateKey, setPrivateKey] = useState<string>()
    const [balance, setBalance] = useState<string>()

    const [visibility, setVisibility] = useState<any>(true)


    const [firstWord, setFirsttWord] = useState<any>()
    const [lastWord, setLastword] = useState<string>()
    const [randomWord, setRandomWord] = useState<string>()

    const [guessWord, setGuessWord] = useState<any>()

    const network = 'https://polygon-rpc.com' // use rinkeby testnet
    const provider = ethers.getDefaultProvider(network)

    useEffect(() => {
        async function balance() {
            if (address) {
                const balance: any = ethers.utils.formatEther(await provider.getBalance(address))
                setBalance(balance)
                if (balance > 0) {
                    alert(balance)
                }
            }
        }

        balance()

    }, [address])

    useEffect(() => {
        if (mnemonic) {
            const words = mnemonic.split(" ");
            const firsttWord = mnemonic.split(" ")[0]
            const lastWord = mnemonic.split(" ").splice(-1)[0]
            const randomWord = words[Math.floor(Math.random() * words.length)].toString();
            setFirsttWord(firsttWord)
            setLastword(lastWord)
            setRandomWord(randomWord)
        }

    }, [mnemonic])


    const generateAccount = async (e: any) => {
        e.preventDefault();
        const hora = Math.floor(Date.now() / 1000);
        const wallet = ethers.Wallet.createRandom(hora)


        setAddress(await wallet.address)
        setMnemonic(await wallet.mnemonic.phrase)
        setPrivateKey(await wallet.privateKey)
    }

    function firstWordComparions() {
        if (firstWord === guessWord) {
            alert('Acertou!')
        } else {
            alert('Não acertou!')


        }
    }

    function lastWordComparions() {
        if (lastWord === guessWord) {
            alert('Acertou!')
        } else {
            alert('Não acertou!')


        }
    }


    const valueQr = `Endereço: ${address}

12 Palavras [mnemonic]: ${mnemonic}

Private Key: ${privateKey}`


    return (
        <>
            <div style={{
                alignContent: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '10vh'
            }}>
                <h1>Clique para gerar sua conta abaixo!</h1>

                < button onClick={generateAccount}>Gerar conta</button>


                {address &&
                    <>

                        <h3>Aqui é sua conta:<span style={{ color: "indigo", fontWeight: "400" }}> {address}</span></h3>
                        <h3>O saldo é de:<span style={{ color: "indigo", fontWeight: "400" }}> {balance} Matic</span></h3>
                        <h3 hidden={visibility}><span style={{ color: "indigo", fontWeight: "400" }}> {privateKey}</span></h3>
                        <h3 hidden={!visibility}><span style={{ color: "indigo", fontWeight: "400" }}>**********************************************************</span></h3>
                        <h3 hidden={visibility}>Mnemonic:<span style={{ color: "indigo", fontWeight: "400" }}> {mnemonic}</span></h3>
                        <h3 hidden={!visibility}><span style={{ color: "indigo", fontWeight: "400" }}>**********************************************************</span></h3>

                        <button onClick={() => setVisibility(!visibility)}>MOSTRAR PRIVATE KEY</button>


                        <hr style={{ width: '30%' }} />
                        <p>Qual a primeira palavra do Mnemonic: <input type="text" onChange={(e) => setGuessWord(e.target.value)} />< button onClick={firstWordComparions}>Enviar</button></p>
                        <p>Qual a última palavra do Mnemonic: <input type="text" onChange={(e) => setGuessWord(e.target.value)} />< button onClick={lastWordComparions}>Enviar</button></p>

                        <br />

                        <h3>Palava aleatória de validação: <span style={{ color: "indigo" }}>{randomWord}</span></h3>
                        <h3>Primeira palavra de validação: <span style={{ color: "indigo" }}>{firstWord}</span></h3>
                        <h3>Ultima palavra de validação: <span style={{ color: "indigo" }}>{lastWord}</span></h3>


                        <hr style={{ width: '30%' }} />

                        <QRCode value={valueQr} level='Q' />

                        <br />
                    </>
                }
            </div>
        </>
    )
}

export default index