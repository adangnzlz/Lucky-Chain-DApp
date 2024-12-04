
import { Box, Typography } from '@mui/joy';
import './AddressLabel.scss'
import WalletIcon from '@mui/icons-material/Wallet';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShortText from '../../../hooks/ShortText';
import { SxProps } from '@mui/joy/styles/types';
import { useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';

interface IAddressLabelProps { address: string, short?: boolean, sx?: SxProps; }

export default function AddressLabel({ address, short = false, sx = {} }: IAddressLabelProps) {
    const { openChainModal } = useChainModal();
    const { openAccountModal } = useAccountModal();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Box onClick={openChainModal} className="AddressLabel pointer" sx={{ ...sx }}>
                <WalletIcon sx={{ marginLeft: '3px' }}></WalletIcon>
                <Typography sx={{ mx: 1 }} level="body-sm">
                    {short
                        ? <ShortText text={address || ''} startChars={6} endChars={12}></ShortText>
                        : address}

                </Typography>
            </Box >
            <ExitToAppIcon className='pointer' onClick={openAccountModal} sx={{ marginLeft: '4px' }}></ExitToAppIcon>
        </Box>
    );
}