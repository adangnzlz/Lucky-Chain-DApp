import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/Dashboard';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import CasinoIcon from '@mui/icons-material/CasinoOutlined';
import ColorSchemeToggle from '../../components/utils/ColorSchemeToggle';
import { closeSidebar } from '../../utils/sidebar-utils';
import { NavLink } from 'react-router-dom';
import { Modal, ModalClose } from '@mui/joy';
import React, { useEffect } from 'react';
import "./Sidebar.scss"
import UseWallet from '../../hooks/UseWallet';
import ShortText from '../../hooks/ShortText';



export default function Sidebar() {
    const { isConnected, walletAddress, connectWallet, providers } = UseWallet();
    const [open, setOpen] = React.useState<boolean>(false);



    useEffect(() => {
        if (isConnected) setOpen(false);
    }, [isConnected]);

    return (
        <Sheet className="Sidebar"        >
            <Box
                className="Sidebar-overlay"
                onClick={() => closeSidebar()}
            />
            <Box className="sidebar-header">
                <IconButton variant="soft" size="sm">
                    <CasinoIcon />
                </IconButton>
                <Typography level="title-lg">Lucky Chain</Typography>
                <ColorSchemeToggle sx={{ ml: 'auto' }} />
            </Box>
            <Box className="sidebar-content">
                <List
                    size="sm"
                    className="sidebar-list"
                >
                    <ListItem>
                        <ListItemButton>
                            <HomeRoundedIcon />
                            <ListItemContent>
                                <NavLink to="/"><Typography level="title-sm">Home</Typography></NavLink>

                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <DashboardRoundedIcon />
                            <ListItemContent>
                                <NavLink to="/Dashboard"><Typography level="title-sm">Dashboard</Typography></NavLink>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
                <List
                    size="sm"
                    className="sidebar-support-list"
                >
                    <a href="https://github.com/adangnzlz/lucky-chain" target="_blank" rel="noopener noreferrer">
                        <ListItem>
                            <ListItemButton>
                                <SupportRoundedIcon />
                                Support
                            </ListItemButton>
                        </ListItem>
                    </a>
                </List>
            </Box>
            <Divider />
            {!isConnected && <Button
                color="primary"
                size="sm"
                onClick={() => setOpen(true)}
            >
                Connect wallet
            </Button>}
            {isConnected &&
                <Box className="connected-address">
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography level="title-sm">Connected Address</Typography>
                        <Typography level="body-xs"><ShortText text={walletAddress || ''} startChars={5} endChars={20} /></Typography>

                    </Box>
                </Box>}

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                className="wallet-modal"
            >
                <Sheet className="wallet-modal-content">
                    <ModalClose className="modal-close" />
                    <Typography level="h4" component="h2" >
                        Choose your preferred method
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'center'
                    }}>
                        {Object.values(providers).map(x =>
                            <Box key={x.info.uuid} onClick={() => connectWallet(x.info.name)} className="wallet-connect-button text-center pointer" sx={{ m: 3, p: 2, display: 'flex', flexDirection: 'column' }}>
                                <img className="mx-auto" width="75px" src={x.info.icon} alt="" />
                                <Typography className="no-wrap" level="title-sm">
                                    {x.info.name}
                                </Typography>
                            </Box>

                        )}
                        {/* <Box onClick={() => connectWallet('MetaMask')} className="wallet-connect-button text-center pointer" sx={{ m: 3, p: 2, display: 'flex', flexDirection: 'column' }}>
                            <img className="mx-auto" width="75px" src="/public/images/logos/walletconnect.svg" alt="" />
                            <Typography className="no-wrap" level="title-sm">
                                Wallet Connect
                            </Typography>
                        </Box> */}
                    </Box>
                    <Typography sx={{ mb: 2 }} level='body-sm'>Many 3rd party wallet applications do not currently have stable support for WalletConnect. If you are unable to connect, please contact your wallet provider for support before reaching out to Chainlink Labs.</Typography>
                </Sheet>
            </Modal>
        </Sheet>
    );
}