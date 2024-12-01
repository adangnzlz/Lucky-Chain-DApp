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
import { Eip1193Provider, ethers } from "ethers";
import { useWalletContext } from '../../context/WalletContext';
import ShortText from '../../hooks/shortText';
import { NavLink } from 'react-router-dom';
import { Modal, ModalClose } from '@mui/joy';
import React from 'react';
import "./Sidebar.scss"

interface ExtendedEip1193Provider extends Eip1193Provider {
    on?: (event: string, listener: (...args: any[]) => void) => void;
    removeListener?: (event: string, listener: (...args: any[]) => void) => void;
}

declare global {
    interface Window {
        ethereum?: ExtendedEip1193Provider;
    }
}

export default function Sidebar() {
    const { isConnected, walletAddress } = useWalletContext();
    const [open, setOpen] = React.useState<boolean>(false);



    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                console.log("Address:", await signer.getAddress());
            } catch (error) {
                console.error("Error connecting wallet:", error);
            }
        } else {
            console.error("MetaMask not found");
        }
    };
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
                    <Typography component="h2" id="modal-title" className="modal-title">
                        This is the modal title
                    </Typography>
                    <Button
                        color="primary"
                        size="sm"
                        onClick={() => connectWallet()}
                    >
                        Connect wallet
                    </Button>
                </Sheet>
            </Modal>
        </Sheet>
    );
}