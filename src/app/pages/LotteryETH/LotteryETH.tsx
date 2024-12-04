import { Box, Button, Chip, Table, Tooltip, Typography } from "@mui/joy";
import './LotteryETH.scss';
import { useAccount } from "wagmi";
import BalanceNumber from "../../components/utils/BalanceNumber";
import LotteryETHService, { IPlayer } from "../../services/contracts/LotteryEth.service";


function mergePlayers(players: IPlayer[]): IPlayer[] {
    // Utilizamos un Map para agrupar por address
    const addressMap = new Map<string, IPlayer>();

    players.forEach((player) => {
        const existingPlayer = addressMap.get(player.address);

        if (existingPlayer) {
            // Si ya existe, incrementamos el número de suscripciones y usamos la fecha más reciente
            existingPlayer.subscriptions++;
            existingPlayer.date = new Date(
                Math.max(existingPlayer.date.getTime(), player.date.getTime())
            );
        } else {
            // Si no existe, lo añadimos con una suscripción inicial
            addressMap.set(player.address, { ...player, subscriptions: 1 });
        }
    });

    // Convertimos el Map nuevamente en un array
    return Array.from(addressMap.values());
}
export default function LotteryETH() {
    const { chain } = useAccount();
    const { data: ticketPrice } = LotteryETHService.LotteryTicket();
    const { data: maxFunds } = LotteryETHService.MaxTotalFunds();
    const { data: totalPlayerFunds } = LotteryETHService.TotalPlayerFunds();
    let { data: players } = LotteryETHService.GetPlayers();


    players = players && players.length ? players : []
    const playersData: IPlayer[] = players.map(x => ({ alias: 'Paco', address: x, date: new Date() }))

    const mergedPlayers: IPlayer[] = mergePlayers(playersData);


    if (!ticketPrice || !maxFunds) return (
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
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
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
                    <div>
                        <Typography
                            component="span"
                            level="body-sm"
                            sx={{ mr: 1, display: 'inline-block', width: '130px' }}
                        >
                            Prize accumulated
                        </Typography>
                        <Tooltip size="sm" title="Copy email" variant="outlined">
                            <Chip size="sm" variant="soft" color="primary" onClick={() => { }}>
                                {totalPlayerFunds ? <BalanceNumber balance={totalPlayerFunds} decimals={18} symbol='eth' /> : ''}
                            </Chip>
                        </Tooltip>
                    </div>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center', gap: 2 }}>
                    <Button
                        color="primary"
                        size="md"
                        onClick={() =>
                            LotteryETHService.PickWinner()
                        }
                    >
                        Pick winner
                    </Button>
                    <Button
                        color="primary"
                        size="md"
                        onClick={() =>
                            LotteryETHService.Enter(ticketPrice)
                        }
                    >
                        Join lottery
                    </Button>
                </Box>
            </Box>

            <Table sx={{ mt: 2, '& thead th:nth-of-type(1)': { width: '100px' }, '& thead th:nth-of-type(4)': { width: '150px' }, '& tr > *:not(:first-of-type)': { textAlign: 'right' } }}>
                <thead>
                    <tr>
                        <th>Player Alias</th>
                        <th>Deposited</th>
                        <th>Address</th>
                        <th>Date Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {mergedPlayers.map((row) => (
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
        </Box >
    );
}
