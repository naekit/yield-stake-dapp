import { Token } from "../Main"
import { Box, Tab, makeStyles } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { useState } from "react"
import { WalletBalance } from "./WalletBalance"
import { StakeForm } from "./StakeForm"

interface YourWalletProps {
    supportedTokens: Array<Token>
}

const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4)
    },
    box: {
        backgroundColor: "#F8BBD0",
        borderRadius: "25px"
    },
    header: {
        color: "white"
    }
}))


export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const classes = useStyles()

    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue))
    }

    return (
        <Box>
            <h2 className={classes.header}> Your Wallet </h2>
            <Box className={classes.box}>
                <TabContext value={selectedTokenIndex.toString()}>
                    <TabList onChange={handleChange} aria-label="stake form tabs">
                        {supportedTokens.map((token, index) => {
                            return (
                                <Tab label={token.name}
                                    value={index.toString()}
                                    key={index}></Tab>
                            )
                        })}
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div className={classes.tabContent}>
                                    {/* 1. our wallet balance */}
                                    <WalletBalance token={supportedTokens[selectedTokenIndex]} />
                                    {/* 2. stake button */}
                                    <StakeForm token={supportedTokens[selectedTokenIndex]} />
                                </div>
                            </TabPanel>
                        )
                    })}
                </TabContext>
            </Box>
        </Box>
    )
}