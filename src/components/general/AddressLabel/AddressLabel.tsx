
import { Box, Avatar, Typography } from '@mui/joy';
import './AddressLabel.scss'
import WalletIcon from '@mui/icons-material/Wallet';
import ShortText from '../../../hooks/ShortText';
import { SxProps } from '@mui/joy/styles/types';

interface IAddressLabelProps { address: string, short?: boolean, sx?: SxProps; }

export default function AddressLabel({ address, short = false, sx = {} }: IAddressLabelProps) {
    return (

        <Box sx={{ display: 'inline-flex', flexDirection: 'row', alignItems: "center", background: '#2f3132', borderRadius: '100px', ...sx }}>
            <Avatar>
                <WalletIcon></WalletIcon>
            </Avatar>
            <Typography sx={{ ml: 1, mr: 2 }} level="body-sm">
                {short
                    ? <ShortText text={address || ''} startChars={4} endChars={12}></ShortText>
                    : address}

            </Typography>
        </Box>
    );
}