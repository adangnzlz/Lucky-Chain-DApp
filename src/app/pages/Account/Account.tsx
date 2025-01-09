import { useAccount, useBalance } from 'wagmi';
import AddressLabel from '../../components/general/AddressLabel/AddressLabel';
import AddressBalanceLabel from '../../components/general/AddressBalanceLabel/AddressBalanceLabel';
import { Box, Typography } from '@mui/joy';

export default function Account() {
    const { address, isConnected } = useAccount();

    let content;
    const { data: balance, isLoading, isError } = useBalance({
        address,
    });
    // const { data: balanceLink } = useBalance({
    //     address,
    //     token: import.meta.env.VITE_LINK_TOKEN_ADDRESS as `0x${string}`
    // });
    if (!isConnected) {
        content = <Typography level='body-sm'>Connect your wallet to view the balance.</Typography>;
    }

    if (isLoading) {
        content = <Typography level='body-sm'>Loading balances...</Typography>;
    }

    if (isError) {
        content = <Typography level='body-sm'>Error loading balances.</Typography>;
    }

    return (
        <Box sx={{ display: 'inline-flex', gap: 2, flexDirection: 'column' }}>
            {content}
            {isConnected && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                <AddressLabel short={true} address={address || ''}></AddressLabel>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
                    {balance && <AddressBalanceLabel balance={balance?.value} decimals={balance?.decimals} symbol={balance?.symbol} ></AddressBalanceLabel>}
                    {/* {balanceLink && <AddressBalanceLabel balance={balanceLink?.value} decimals={balanceLink?.decimals} symbol={balanceLink?.symbol} ></AddressBalanceLabel>} */}
                </Box>
            </Box>

            }
        </Box>
    );
};
