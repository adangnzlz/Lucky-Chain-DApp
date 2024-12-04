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
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import CasinoIcon from '@mui/icons-material/CasinoOutlined';
import ColorSchemeToggle from '../../components/utils/ColorSchemeToggle';
import { closeSidebar } from './Sidebar.utils';
import { NavLink } from 'react-router-dom';
import "./Sidebar.scss"
import { TokenIcon } from '@web3icons/react'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Account from '../../pages/Account/Account';
import { useAccount } from 'wagmi';

export default function Sidebar() {
    const { openConnectModal } = useConnectModal();
    const { isConnected } = useAccount();

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
                    {
                        isConnected &&
                        <ListItem>
                            <ListItemButton>
                                <TokenIcon size="18px" symbol='eth' variant="mono" />
                                <ListItemContent>
                                    <NavLink to="/lottery-eth"><Typography level="title-sm">Lottery ETH</Typography></NavLink>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    }
                    {
                        isConnected &&
                        <ListItem>
                            <ListItemButton>
                                <TokenIcon size="18px" symbol="link" variant="mono" />
                                <ListItemContent>
                                    <NavLink to="/lottery-link"><Typography level="title-sm">Lottery LINK</Typography></NavLink>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    }
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
            {openConnectModal && <Button
                color="primary"
                size="sm"
                onClick={openConnectModal}
            >
                Connect wallet
            </Button>}
            {!openConnectModal && <Account></Account>}
        </Sheet >
    );
}