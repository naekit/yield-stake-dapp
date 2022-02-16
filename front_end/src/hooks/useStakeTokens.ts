import { useContractFunction, useEthers } from "@usedapp/core"
import { constants, utils } from "ethers"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import networkMapping from "../chain-info/deployments/map.json"
import { Contract } from "@ethersproject/contracts"
import { useState } from "react"

export const useStakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    // const yietTokenAddress = chainId ? networkMapping[String(chainId)]["YietToken"][0] : constants.AddressZero// look into mapping : 000
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)
    // approve
    // stake tokens
    const { send: approveErc20Send, state: approveErc20State } =
        useContractFunction(erc20Contract, "approve", { transactionName: "Approve ERC20 Transfer" })
    const approve = (amount: string) => {
        return approveErc20Send(tokenFarmAddress, amount)
    }
    const [state, setState] = useState(approveErc20State)
    return { approve, approveErc20State }
}