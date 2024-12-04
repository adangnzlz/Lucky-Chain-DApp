import { Typography } from '@mui/joy';
import { ethers } from 'ethers';

interface BalanceNumberProps {
    balance: bigint;
    decimals: number;
    symbol?: string;
    precision?: number;
}

/**
 * Componente para formatear y mostrar balances numéricos.
 */
export default function BalanceNumber({
    balance,
    decimals,
    symbol,
    precision = 4
}: BalanceNumberProps) {
    // Formatear el balance
    const balanceInUnits = ethers.formatUnits(balance.toString(), decimals);
    const parsedBalance = parseFloat(balanceInUnits);
    const formattedBalance = parsedBalance
        .toFixed(precision)
        .replace(/\.?0+$/, '');

    return (
        <span>
            {formattedBalance} {symbol}
        </span>
    );
}
