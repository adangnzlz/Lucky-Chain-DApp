
import { Box, Typography } from '@mui/joy';
import './AddressBalanceLabel.scss'
import { SxProps } from '@mui/joy/styles/types';
interface IAddressBalanceLabel { balance: bigint, decimals: number, symbol: string, sx?: SxProps; }
import { TokenIcon } from '@web3icons/react'
import { ethers } from "ethers";

export default function AddressBalanceLabel({ balance, decimals, symbol, sx = {} }: IAddressBalanceLabel) {
    // Convertir balance a unidades
    const balanceInUnits = ethers.formatUnits(balance.toString(), decimals);
    const parsedBalance = parseFloat(balanceInUnits);
    const formattedBalance = parsedBalance
        .toFixed(4) // Limitar a 4 decimales
        .replace(/\.?0+$/, '');
    return (

        <Box sx={{ display: 'inline-flex', flexDirection: 'row', alignItems: "center", background: '#2f3132', borderRadius: '100px', ...sx }}>
            <Box sx={{ padding: '2px', pl: 1, display: 'flex', alignItems: 'center' }}>
                <TokenIcon symbol={symbol} variant="mono" />
            </Box>
            <Typography noWrap sx={{ marginLeft: '2px', paddingRight: '12px' }} level="body-xs">
                {formattedBalance.toString()} {symbol}
            </Typography>
        </Box >
    );
}