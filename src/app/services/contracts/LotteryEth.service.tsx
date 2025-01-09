import { useReadContract } from "wagmi";
import { abi } from '../../../assets/ABIs/LotteryEtherABI';


const LOTTERY_ADDRESS = import.meta.env.VITE_LOTTERY_ETHER_ADDRESS;
import {
  watchContractEvent,
  writeContract,
} from "@wagmi/core";
import { wagmiConfig } from "../../../wagmiConfig";

export interface IPlayer {
  address: string;
  date: Date;
  subscriptions?: number;
}


const LotteryETHService = {
  LotteryTicket: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi,
      functionName: "lotteryTicket",
    }) as { data: bigint };
  },
  MaxTotalFunds: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi,
      functionName: "maxTotalFunds",
    }) as { data: bigint };
  },
  GetPlayers: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi,
      functionName: "getPlayers",
    }) as { data: string[] };
  },
  RecentWinner: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi,
      functionName: "recentWinner",
    }) as { data: string }; // Winner address
  },
  TotalPlayerFunds: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi,
      functionName: "totalPlayerFunds",
    }) as { data: bigint };
  },
  Manager: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi,
      functionName: "manager",
    }) as { data: string }; // Manager address
  },
  Enter: async (ticketPrice: bigint) => {
    try {
      const result = await writeContract(wagmiConfig, {
        address: LOTTERY_ADDRESS,
        abi,
        functionName: "enter",
        value: ticketPrice,
      });
      return { success: true, data: result };
    } catch (error) {
      console.error("Transaction failed:", error);
      return {
        success: false,
        error: error || "An unexpected error occurred.",
      };
    }
  },
  PickWinner: async () => {
    try {
      const result = await writeContract(wagmiConfig, {
        address: LOTTERY_ADDRESS,
        abi,
        functionName: "pickWinner"
      });
      return { success: true, data: result };
    } catch (error) {
      console.error("Transaction failed:", error);
      return {
        success: false,
        error: error || "An unexpected error occurred.",
      };
    }
  },
  WitdrawPrize: async () => {
    try {
      const result = await writeContract(wagmiConfig, {
        address: LOTTERY_ADDRESS,
        abi,
        functionName: "withdrawPrize"
      });
      return { success: true, data: result };
    } catch (error) {
      console.error("Transaction failed:", error);
      return {
        success: false,
        error: error || "An unexpected error occurred.",
      };
    }
  },
  WatchPlayerEntered: (latestBlock: bigint, callback: (player: string, amount: bigint) => void) => {
    return watchContractEvent(wagmiConfig, {
      address: LOTTERY_ADDRESS,
      abi,
      eventName: "PlayerEntered",
      onLogs(logs) {
        callback(logs[0].args.player, logs[0].args.amount);
      },
      fromBlock: latestBlock,
      strict: true,
    });
  },
  WatchPrizeDistributed: (latestBlock: bigint, callback: (winner: string, amount: bigint) => void) => {
    return watchContractEvent(wagmiConfig, {
      address: LOTTERY_ADDRESS,
      abi,
      eventName: "PrizeDistributed",
      onLogs(logs) {
        callback(logs[0].args.winner, logs[0].args.amount);
      },
      fromBlock: latestBlock,
      strict: true,
    });
  },
  WatchPrizeClaimed: (latestBlock: bigint, callback: () => void) => {
    return watchContractEvent(wagmiConfig, {
      address: LOTTERY_ADDRESS,
      abi,
      eventName: "PrizeClaimed",
      onLogs() {
        callback();
      },
      fromBlock: latestBlock,
      strict: true,
    });
  },
};

export default LotteryETHService;
