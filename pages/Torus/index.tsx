import React from 'react'
import FetchNodeDetails from '@toruslabs/fetch-node-details'
import TorusUtils from '@toruslabs/torus.js'
import { generateIdToken } from "./helpers";

const torus = new TorusUtils({
    enableOneKey: true,
    network: "testnet",
});

const TORUS_NODE_MANAGER = new FetchNodeDetails({
    network: "ropsten",
    proxyAddress: "0x6258c9d6c12ed3edda59a1a6527e469517744aa7",
});
const TORUS_TEST_EMAIL = "hello@tor.us";
const TORUS_TEST_VERIFIER = "torus-test-health";
const TORUS_TEST_AGGREGATE_VERIFIER = "torus-test-health-aggregate";

const getPublicAddress = async () => {
    const verifier = "google-lrc"; // any verifier
    const verifierDetails = { verifier, verifierId: TORUS_TEST_EMAIL };
    const { torusNodeEndpoints, torusNodePub } = await TORUS_NODE_MANAGER.getNodeDetails(verifierDetails);
    const publicAddress = await torus.getPublicAddress(torusNodeEndpoints, torusNodePub, verifierDetails, true);
    uiConsole(publicAddress);

    console.log(publicAddress)
}

const getPrivateKey = async () => {
    const token = generateIdToken(TORUS_TEST_EMAIL, "ES256");
    const verifierDetails = { verifier: TORUS_TEST_VERIFIER, verifierId: TORUS_TEST_EMAIL };
    const { torusNodeEndpoints, torusIndexes } = await TORUS_NODE_MANAGER.getNodeDetails(verifierDetails);
    const retrieveSharesResponse = await torus.retrieveShares(
        torusNodeEndpoints,
        torusIndexes,
        TORUS_TEST_VERIFIER,
        { verifier_id: TORUS_TEST_EMAIL },
        token
    );
    uiConsole(retrieveSharesResponse.privKey);
    console.log('PrivateKey', retrieveSharesResponse.privKey)
}

const uiConsole = (...args: unknown[]): void => {
    const conteudo = document.querySelector("#console");
    if (conteudo) {
        conteudo.innerHTML = JSON.stringify(args || {}, null, 2);
    }
};


const index = () => {
    return (
        <div style={{
            alignContent: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '30vh'
        }}>
            < button onClick={getPublicAddress} > getPublicAddress</button>
            <br />
            <button onClick={getPrivateKey}>getPrivateKey</button>
            <div id="console" style={{ fontSize: '16px', color: 'black' }}></div>
        </div >
    )
}

export default index