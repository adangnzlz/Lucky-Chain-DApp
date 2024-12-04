import { useReadContract } from "wagmi";
import LotteryEther from "../../../assets/ABIs/LotteryEther.json";
const LOTTERY_ADDRESS = import.meta.env.VITE_LOTTERY_ETHER_ADDRESS;
import { writeContract } from "@wagmi/core";
import { wagmiConfig } from "./../../../wagmiConfig";
export interface IPlayer {
  alias: string;
  address: string;
  date: Date;
  subscriptions?: number;
}

const LotteryETHService = {
  LotteryTicket: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi: LotteryEther.abi,
      functionName: "lotteryTicket",
    }) as { data: bigint };
  },
  MaxTotalFunds: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi: LotteryEther.abi,
      functionName: "maxTotalFunds",
    }) as { data: bigint };
  },
  GetPlayers: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi: LotteryEther.abi,
      functionName: "getPlayers",
    }) as { data: string[] };
  },
  RecentWinner: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi: LotteryEther.abi,
      functionName: "recentWinner",
    }) as { data: string }; // Winner address
  },
  TotalPlayerFunds: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi: LotteryEther.abi,
      functionName: "totalPlayerFunds",
    }) as { data: bigint };
  },
  Manager: () => {
    return useReadContract({
      address: LOTTERY_ADDRESS,
      abi: LotteryEther.abi,
      functionName: "manager",
    }) as { data: string }; // Manager address
  },
  Enter: async (ticketPrice: bigint) => {
    try {
      const result = await writeContract(wagmiConfig, {
        address: LOTTERY_ADDRESS,
        abi: LotteryEther.abi,
        functionName: "enter",
        args: [],
        value: ticketPrice,
      });
      return { success: true, data: result };
    } catch (error: any) {
      console.error("Transaction failed:", error);
      return {
        success: false,
        error: error?.message || "An unexpected error occurred.",
      };
    }
  },
  PickWinner: async () => {
    try {
      const result = await writeContract(wagmiConfig, {
        address: LOTTERY_ADDRESS,
        abi: LotteryEther.abi,
        functionName: "pickWinner",
        args: [],
      });
      return { success: true, data: result };
    } catch (error: any) {
      console.error("Transaction failed:", error);
      return {
        success: false,
        error: error?.message || "An unexpected error occurred.",
      };
    }
  },
};

export default LotteryETHService;
