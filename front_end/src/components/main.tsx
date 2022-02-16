import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import yiet from "../YIET.png"
import eth from "../eth.png"
import dai from "../dai.png"
import { YourWallet } from "./yourWallet/YourWallet"


export type Token = {
    img: string
    address: string
    name: string
}

export const Main = () => {
    // show token amount from wallet

    // get addresses of tokens
    // get balance of user wallet

    // send brownie-config to src folder
    // send build folder (yiet token and mock addresses)
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"

    const yietTokenAddress = chainId ? networkMapping[String(chainId)]["YietToken"][0] : constants.AddressZero// look into mapping : 000
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero // brownie config
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero

    const supportedTokens: Array<Token> = [
        {
            img: yiet,
            address: yietTokenAddress,
            name: "YIET"
        },
        {
            img: eth,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            img: dai,
            address: fauTokenAddress,
            name: "DAI"
        }

    ]

    return (<YourWallet supportedTokens={supportedTokens} />)
}