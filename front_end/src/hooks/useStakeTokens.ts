import { useEthers } from "@usedapp/core"
import { constants, utils } from "ethers"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/Mock.json"
import networkMapping from "../chain-info/deployments/map.json"
import { Contract } from "@ethersproject/contracts"

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

    const erc20ABI = 
    const erc20Interface = new utils.Interface()
    // approve
    // stake tokens
}