
import { Box, Typography } from "@mui/joy";
import "./Home.scss"
export default function Home() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }} className="home">
            <Typography level="h2">Home</Typography>
            <Typography sx={{mb: 2}} component="p">
                Lucky Chain is a decentralized lottery built on Ethereum that supports execution with both the native token and an ERC20 token.
                <br></br>
                <br></br>
                It leverages smart contracts and Chainlink VRF to ensure transparency and randomness in winner selection.
                <br></br>
                <br></br>
                Participants can join by sending a small amount of ETH, and the contract will randomly select a winner to receive all the accumulated funds.

            </Typography>
        </Box>

    );
}