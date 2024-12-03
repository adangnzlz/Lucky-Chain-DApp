
import { Box, Typography } from "@mui/joy";
import './LotteryETH.scss'
import { useReadContracts } from "wagmi";
import LotteryEther from '../../assets/ABIs/LotteryEther.json'

export default function LotteryETH() {
    const { data } = useReadContracts({
        contracts: [
            {
                address: '0x41a8758411B412c864ddB42AEe6B4094D33735Cc',
                abi: LotteryEther.abi,
                functionName: 'lotteryTicket',
                // args: [], // Opcional si la función no tiene argumentos
            },
            {
                address: '0x41a8758411B412c864ddB42AEe6B4094D33735Cc',
                abi: LotteryEther.abi,
                functionName: 'maxTotalFunds',
                // args: [], // Opcional si la función no tiene argumentos
            }
        ]
    });
    console.log(data)
    let ticketPrice: bigint | undefined;
    if (data) {
        ticketPrice = data[0].result as bigint;
    }
    return (
        <Box>
            <Typography level="h2" >
                {ticketPrice ? ticketPrice.toString() : ''}
            </Typography>

        </Box>

    );
}