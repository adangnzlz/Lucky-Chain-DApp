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
import React, { useEffect } from 'react';
import "./Sidebar.scss"
import ShortText from '../../hooks/ShortText';
import { useAccount, useEnsName } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { Avatar } from '@mui/joy';
import WalletIcon from '@mui/icons-material/Wallet';

export default function Sidebar() {
    const { address, connector } = useAccount();
    const { status } = useEnsName({ address });
    const { open, close } = useAppKit()

    useEffect(() => {
        if (status == 'success') close();
    }, [status, close]);


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
            {status != 'success' && <Button
                color="primary"
                size="sm"
                onClick={() => open()}
            >
                Connect wallet
            </Button>}
            {status == 'success' &&   <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <Avatar><WalletIcon></WalletIcon></Avatar> <Typography sx={{ ml: 2 }} level="body-sm">
                    <ShortText text={address || ''} startChars={4} endChars={12}></ShortText>
                </Typography>
            </Box>}
            {status == 'success' && <appkit-network-button />}

        </Sheet >
    );
}