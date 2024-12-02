import React from 'react';
import { Box, Modal, Sheet, Typography } from '@mui/joy';
import { ModalClose } from '@mui/joy';
import { Connector } from 'wagmi'

import './ConnectWalletModal.scss'

interface ConnectWalletModalProps {
    open: boolean;
    onClose: () => void;
    connectors: readonly Connector[]
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ open, onClose, connectors }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            className="wallet-modal"
        >
            <Sheet className="wallet-modal-content">
                <ModalClose className="modal-close" />
                <Typography level="h4" component="h2">
                    Choose your preferred method
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'center',
                    }}
                >
                    {connectors.map((x) => (
                        <Box
                            key={x.uid}
                            onClick={() => x.connect()}
                            className="wallet-connect-button text-center pointer"
                            sx={{ m: 3, p: 2, display: 'flex', flexDirection: 'column' }}
                        >
                            <img
                                className="mx-auto"
                                width="75px"
                                height="75px"
                                src={x.icon ? x.icon : `images/logos/${x.id}.svg`}
                                alt=""
                            />
                            <Typography sx={{ mt: 1 }} className="no-wrap" level="title-sm">
                                {x.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Typography sx={{ mb: 2 }} level="body-sm">
                    Many 3rd party wallet applications do not currently have stable support for WalletConnect. If you are unable to connect, please contact your wallet provider for support before reaching out to Chainlink Labs.
                </Typography>
            </Sheet>
        </Modal>
    );
};

export default ConnectWalletModal;
