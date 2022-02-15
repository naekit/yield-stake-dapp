import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"

export const Main = () => {
    // show token amount from wallet

    // get addresses of tokens
    // get balance of user wallet

    // send brownie-config to src folder
    // send build folder (yiet token and mock addresses)
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    // const yietTokenAddress ???
    return (<div>Hi!</div>)
}