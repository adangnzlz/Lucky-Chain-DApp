import { Box, Button, Chip, Table, Tooltip, Typography } from "@mui/joy";
import './LotteryETH.scss';
import { useAccount, useBlockNumber } from "wagmi";
import { ZeroAddress } from 'ethers'
import BalanceNumber from "../../components/utils/BalanceNumber";
import LotteryETHService, { IPlayer } from "../../services/contracts/LotteryEth.service";
import { useEffect, useState } from "react";
import ShortText from "../../hooks/ShortText";


function mergePlayers(players: IPlayer[]): IPlayer[] {
    const addressMap = new Map<string, IPlayer>();
    players.forEach((player) => {
        const existingPlayer = addressMap.get(player.address);

        if (existingPlayer && existingPlayer.subscriptions) {
            existingPlayer.subscriptions++;
            existingPlayer.date = new Date(
                Math.max(existingPlayer.date.getTime(), player.date.getTime())
            );
        } else {
            addressMap.set(player.address, { ...player, subscriptions: player.subscriptions ? player.subscriptions : 1 });
        }
    });
    return Array.from(addressMap.values());
}
export default function LotteryETH() {
    const { chain, address } = useAccount();
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [totalFunds, setTotalFunds] = useState<bigint>(0n);
    const [maxFunds, setMaxFunds] = useState<bigint | undefined>();
    const [ticketPrice, setTicketPrice] = useState<bigint | undefined>();
    const [recentWinner, setRecentWinner] = useState<string | undefined>();
    const latestBlock = useBlockNumber()

    const { data: initialTicketPrice } = LotteryETHService.LotteryTicket();
    const { data: initialMaxFunds } = LotteryETHService.MaxTotalFunds();
    const { data: initialTotalPlayerFunds } = LotteryETHService.TotalPlayerFunds();
    const { data: initialPlayers } = LotteryETHService.GetPlayers();
    const { data: initialRecentWinner } = LotteryETHService.RecentWinner();
    const { data: manager } = LotteryETHService.Manager();

    useEffect(() => {
        let unwatchPlayerEntered: (() => void) | undefined;
        const playerEnteredListener = (player: string, amount: bigint) => {
            console.log("New player entered", player)
            setPlayers(prevPlayers => {
                return mergePlayers([...prevPlayers, { alias: `Paco ${prevPlayers.length + 1}`, address: player, date: new Date() }])
            });
            setTotalFunds(prev => (prev ? prev + amount : amount));
        };
        if (latestBlock.data) {
            unwatchPlayerEntered = LotteryETHService.WatchPlayerEntered(latestBlock.data + 1n, playerEnteredListener);
        }
        return () => {
            if (unwatchPlayerEntered) {
                unwatchPlayerEntered();
            }
        };
    }, [latestBlock.data]);

    useEffect(() => {
        let unwatchPrizeDistributed: (() => void) | undefined;

        const prizeDistributedListener = (winner: string) => {
            console.log("Recent winner updated", winner);
            setRecentWinner(winner === ZeroAddress ? undefined : winner);
        };

        if (latestBlock.data) {
            unwatchPrizeDistributed = LotteryETHService.WatchPrizeDistributed(latestBlock.data + 1n, prizeDistributedListener);
        }

        return () => {
            if (unwatchPrizeDistributed) {
                unwatchPrizeDistributed();
            }
        };
    }, [latestBlock.data]);

    useEffect(() => {
        let unwatchPrizeClaimed: (() => void) | undefined;

        const prizeClaimedListener = () => {
            console.log("Prize claimed");
            setRecentWinner(undefined);
            setPlayers([]);
            setTotalFunds(0n);
        };

        if (latestBlock.data) {
            unwatchPrizeClaimed = LotteryETHService.WatchPrizeClaimed(latestBlock.data + 1n, prizeClaimedListener);
        }

        return () => {
            if (unwatchPrizeClaimed) {
                unwatchPrizeClaimed();
            }
        };
    }, [latestBlock.data]);


    useEffect(() => {
        if (initialPlayers) {
            const mockPlayers = mergePlayers(initialPlayers.map((x, i) => ({ alias: `Paco ${i + 1}`, address: x, date: new Date() })));
            setPlayers(mockPlayers);
        }

        if (initialRecentWinner) {
            setRecentWinner(initialRecentWinner == ZeroAddress ? undefined : initialRecentWinner);
        }
        if (initialMaxFunds) setMaxFunds(initialMaxFunds);
        if (initialTicketPrice) setTicketPrice(initialTicketPrice);
        if (initialTotalPlayerFunds) setTotalFunds(initialTotalPlayerFunds);

    }, [initialMaxFunds, initialPlayers, initialTicketPrice, initialTotalPlayerFunds, initialRecentWinner]);

    if (!ticketPrice || !initialMaxFunds) return (
        <div>
            <Typography level="h2">Error loading the smart contract data.</Typography>
            <br />
            <Typography level="body-sm">There was a problem loading the initial information of the contracts. Probably the contracts are not deployed in the selected chain ({chain ? chain.name : ''})</Typography>
        </div>
    );


    return (
        <Box>
            <Typography level="h2">
                Ethereum Lottery
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                    <div>
                        <Typography
                            component="span"
                            level="body-sm"
                            sx={{ mr: 1, display: 'inline-block', width: '130px' }}
                        >
                            Ticket Price
                        </Typography>
                        <Tooltip size="sm" title="Copy email" variant="outlined">
                            <Chip size="sm" variant="soft" color="primary" onClick={() => { }}>
                                {ticketPrice ? <BalanceNumber balance={ticketPrice} decimals={18} symbol='eth' /> : ''}
                            </Chip>
                        </Tooltip>
                    </div>
                    <div>
                        <Typography
                            component="span"
                            level="body-sm"
                            sx={{ mr: 1, display: 'inline-block', width: '130px' }}
                        >
                            Max Funds
                        </Typography>
                        <Tooltip size="sm" title="Copy email" variant="outlined">
                            <Chip size="sm" variant="soft" color="primary" onClick={() => { }}>
                                {maxFunds ? <BalanceNumber balance={maxFunds} decimals={18} symbol='eth' /> : ''}
                            </Chip>
                        </Tooltip>
                    </div>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', gap: { xs: 1, sm: 0 } }}>
                    <Box>
                        <Typography
                            component="span"
                            level="body-sm"
                            sx={{ mr: 1, display: 'inline-block', width: '130px' }}
                        >
                            Prize accumulated
                        </Typography>
                        <Tooltip size="sm" title="Copy email" variant="outlined">
                            <Chip size="sm" variant="soft" color="primary" onClick={() => { }}>
                                <BalanceNumber balance={totalFunds} decimals={18} symbol='eth' />
                            </Chip>
                        </Tooltip>
                    </Box>
                    {recentWinner && <Box sx={{ display: 'flex' }}>
                        <Typography
                            component="span"
                            level="body-sm"
                            sx={{ mr: 1, display: 'inline-block', width: '130px' }}
                        >
                            Winner
                        </Typography>
                        <Tooltip size="sm" title="Copy email" variant="outlined">
                            <Chip size="sm" variant="soft" color="primary" onClick={() => { }}>
                                <ShortText text={recentWinner || ''} startChars={6} endChars={12}></ShortText>
                            </Chip>
                        </Tooltip>
                    </Box>}
                </Box>
                <Box sx={{ my: { xs: 3, sm: 0 }, display: 'flex', flexDirection: 'row', justifyContent: { xs: 'start', sm: 'end' }, alignItems: 'center', gap: 2 }}>
                    {address == manager && !recentWinner && <Button
                        color="primary"
                        size="md"
                        onClick={() =>
                            LotteryETHService.PickWinner()
                        }
                    >
                        Pick winner
                    </Button>}
                    {!recentWinner && <Button
                        color="primary"
                        size="md"
                        onClick={() =>
                            LotteryETHService.Enter(ticketPrice)
                        }
                    >
                        Join lottery
                    </Button>}
                    {address == recentWinner && < Button
                        color="primary"
                        size="md"
                        onClick={() =>
                            LotteryETHService.WitdrawPrize()
                        }
                    >
                        Witdraw prize
                    </Button>}
                </Box>
            </Box>
            {
                !recentWinner &&
                < Table sx={{ mt: 2, '& thead th:nth-of-type(1)': { width: '100px' }, '& thead th:nth-of-type(4)': { width: '150px' }, '& tr > *:not(:first-of-type)': { textAlign: 'right' } }}>
                    <thead>
                        <tr>
                            <th>Player Alias</th>
                            <th>Deposited</th>
                            <th>Address</th>
                            <th>Date Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((row) => (
                            <tr key={row.address}>
                                <td>{row.alias}</td>
                                <td> <BalanceNumber balance={BigInt(row.subscriptions || 1) * ticketPrice} decimals={18} symbol='eth' /></td>
                                <td>{row.address || ''}</td>
                                {/* <td><ShortText text={row.address || ''} startChars={6} endChars={12}></ShortText></td> */}
                                <td>{row.date.toDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
            {
                recentWinner != undefined && recentWinner != ZeroAddress &&
                <Box>
                    <br />
                    <hr />
                    <Typography level="h3" gutterBottom={true}>The prize is pending withdrawal</Typography>
                    <Typography level="body-sm">The lottery remains closed until the winner collects the prize.</Typography>
                </Box>
            }
        </Box >
    );
}
