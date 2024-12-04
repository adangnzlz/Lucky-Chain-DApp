import React from "react";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./guards/protected.route";
const Home = React.lazy(() => import('./pages/Home/Home'));
const LotteryETH = React.lazy(() => import('./pages/LotteryETH/LotteryETH'));
const LotteryLINK = React.lazy(() => import('./pages/LotteryLINK/LotteryLINK'));
import { useAccount } from "wagmi";

function RouterContent() {
    const { isConnected } = useAccount();
    return (

        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lottery-eth"
                    element={
                        <ProtectedRoute isAllowed={isConnected}><LotteryETH /></ProtectedRoute>
                    }
                />
                <Route path="/lottery-link"
                    element={
                        <ProtectedRoute isAllowed={isConnected}><LotteryLINK /></ProtectedRoute>
                    }
                />
            </Routes>
        </Suspense>
    );
}

export default RouterContent;
