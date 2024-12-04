
import { Box, Typography } from '@mui/joy';
import './AddressBalanceLabel.scss'
import { SxProps } from '@mui/joy/styles/types';
interface IAddressBalanceLabel { balance: bigint, decimals: number, symbol: string, sx?: SxProps; }
import { TokenIcon } from '@web3icons/react'
import BalanceNumber from '../../utils/BalanceNumber';

export default function AddressBalanceLabel({ balance, decimals, symbol, sx = {} }: IAddressBalanceLabel) {
    return (

        <Box sx={{ display: 'inline-flex', flexDirection: 'row', alignItems: "center", borderRadius: '100px', ...sx }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TokenIcon symbol={symbol} variant="mono" />
            </Box>
            <Typography noWrap sx={{ marginLeft: '2px', paddingRight: '12px' }} level="body-xs">
                <BalanceNumber balance={balance} decimals={decimals} symbol={symbol} /> 
            </Typography>
        </Box >
    );
}