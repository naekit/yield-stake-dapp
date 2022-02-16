import { formatUnits } from "@ethersproject/units"
import { Button, CircularProgress, Input, Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useEthers, useNotifications, useTokenBalance } from "@usedapp/core"
import { utils } from "@usedapp/core/node_modules/ethers"
import { useEffect, useState } from "react"
import { useStakeTokens } from "../../hooks/useStakeTokens"
import { Token } from "../Main"



export interface StakeFormProps {
    token: Token
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const { notifications } = useNotifications()


    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
        console.log(newAmount)
    }

    const { approveAndStake, state: approveAndStakeErc20State } = useStakeTokens(tokenAddress)
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndStake(amountAsWei.toString())
    }

    const isMining = approveAndStakeErc20State.status === "Mining"

    // state hook to check if erc20 is approved for our snackbar alerts
    const [showErc20ApprovalSuccess, setShowErc20approvalSuccess] = useState(false)
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false)

    // handle close for snackbar alerts
    const handleClose = () => {
        setShowErc20approvalSuccess(false)
        setShowStakeTokenSuccess(false)
    }

    useEffect(() => {
        if (notifications.filter((notification) =>
            notification.type === "transactionSucceed" &&
            notification.transactionName === "Approve ERC20 transfer").length > 0) {
            setShowErc20approvalSuccess(true)
            setShowStakeTokenSuccess(false)
        }
        if (notifications.filter((notification) =>
            notification.type === "transactionSucceed" &&
            notification.transactionName === "Stake Tokens").length > 0) {
            setShowErc20approvalSuccess(false)
            setShowStakeTokenSuccess(true)
        }
    }, [notifications, showErc20ApprovalSuccess, showStakeTokenSuccess])

    return (
        <>
            <div>
                <Input
                    onChange={handleInputChange}
                />
                <Button onClick={handleStakeSubmit} color="primary" size="large" disabled={isMining}>
                    {isMining ? <CircularProgress size={26} /> : "Stake!"}
                </Button>
                <Snackbar
                    open={showErc20ApprovalSuccess}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message="Staking Approved"
                >
                    <Alert onClose={handleClose} severity="success">
                        ERC20 token transfer approved! Now approve the 2nd transaction
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={showStakeTokenSuccess}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message="Tokens Staked"
                >
                    <Alert onClose={handleClose} severity="success">
                        Tokens Staked!
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}