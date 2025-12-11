'use client';

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  LogOut,
  Wallet,
  ArrowUpCircle,
  BarChart3,
  X,
  Bell,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Home,
  CreditCard,
  DollarSign,
  Clock,
  Shield,
  Settings,
  Zap,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  Battery,
  Activity,
  Coins,
  Hash,
  Layers,
  Bitcoin,
  Circle,
  Sparkles
} from "lucide-react";

// Alternative: If you need Ethereum icon specifically, use this SVG component
const EthereumIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#627EEA"/>
    <path d="M12.3735 3V9.6525L17.9963 12.165L12.3735 3Z" fill="white" fillOpacity="0.602"/>
    <path d="M12.3735 3L6.75 12.165L12.3735 9.6525V3Z" fill="white"/>
    <path d="M12.3735 16.476V20.9963L18 13.212L12.3735 16.476Z" fill="white" fillOpacity="0.602"/>
    <path d="M12.3735 20.9963V16.4753L6.75 13.212L12.3735 20.9963Z" fill="white"/>
    <path d="M12.3735 15.4298L17.9963 12.1651L12.3735 9.65405V15.4298Z" fill="white" fillOpacity="0.2"/>
    <path d="M6.75 12.1651L12.3735 15.4298V9.65405L6.75 12.1651Z" fill="white" fillOpacity="0.602"/>
  </svg>
);

const BitcoinIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F7931A"/>
    <path d="M17.3077 10.2692C17.4615 8.11538 15.9231 7.03846 14.0769 6.92308L14.4231 4.84615L13.2692 4.61538L12.9231 6.46154H12L11.6538 4.61538L10.5 4.38462L10.8462 6.92308H9.57692L9.23077 4.84615L8.07692 4.61538L7.73077 6.46154H6.92308L6.57692 5.30769L5.42308 5.07692L5.76923 7.03846C5.76923 7.03846 6.92308 7.26923 6.92308 7.38462C6.92308 7.5 6.92308 8.07692 6.92308 8.07692L5.42308 8.30769L5.76923 9.46154L7.26923 9.23077L7.61538 11.0769H6.34615L6 12.2308L7.15385 12.4615L7.5 14.3077H6.23077L5.88462 15.4615L7.38462 15.6923L7.03846 17.7692L8.19231 18L8.53846 16.1538H9.46154L9.80769 18L10.9615 18.2308L10.6154 16.1538H11.8846L12.2308 18.2308L13.3846 18L13.7308 16.1538H14.5385L14.1923 18.2308L15.3462 18.4615L15.6923 16.3846C17.3077 16.1538 18.5769 15.1154 18.8077 13.2692C19.0385 11.5385 18.1154 10.6154 17.3077 10.2692ZM14.5385 13.3846C14.5385 14.7692 12.5769 15.2308 11.6538 15.4615L12.2308 12.9231C13.1538 12.6923 14.5385 12.4615 14.5385 13.3846ZM15.3462 10.8462C15.3462 11.8846 13.7308 12.2308 12.9231 12.4615L12.3462 9.92308C13.1538 9.69231 15.3462 9.57692 15.3462 10.8462Z" fill="white"/>
  </svg>
);

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balance, setBalance] = useState(12450.0);
  const [selectedPair, setSelectedPair] = useState("BTCUSDT");
  const [notifications, setNotifications] = useState([]);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [activeTrades, setActiveTrades] = useState([]);
  
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showInvest, setShowInvest] = useState(false);
  
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [showInvestForm, setShowInvestForm] = useState(false);
  
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [investAmount, setInvestAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");
  const [selectedInvestCoin, setSelectedInvestCoin] = useState(null);
  const [copied, setCopied] = useState(false);
  const [depositInstructions, setDepositInstructions] = useState(null);
  const [withdrawInstructions, setWithdrawInstructions] = useState(null);
  const [investInstructions, setInvestInstructions] = useState(null);

  const tvContainer = useRef(null);

  const cryptoWallets = {
    "USDT": {
      address: "TBA1Lh3aJ...RtFDBTTRdBM",
      network: "TRC20",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TBA1Lh3aJ...RtFDBTTRdBM"
    },
    "BTC": {
      address: "bc1qxy2kg...m09w73a7h",
      network: "Bitcoin",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bc1qxy2kg...m09w73a7h"
    },
    "ETH": {
      address: "0x71C7656E...391f3752a9",
      network: "ERC20",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x71C7656E...391f3752a9"
    }
  };

  const miningCoins = [
    {
      id: 1,
      name: "Bitcoin Pro",
      symbol: "BTC-PRO",
      icon: <BitcoinIcon />,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      dailyEarnings: "2.5%",
      investmentPeriod: "90 days",
      minInvestment: 100,
      maxInvestment: 10000,
      totalInvestors: 1245,
      roi: "225%",
      hashRate: "120 TH/s"
    },
    {
      id: 2,
      name: "Ethereum Max",
      symbol: "ETH-MAX",
      icon: <EthereumIcon />,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      dailyEarnings: "3.2%",
      investmentPeriod: "60 days",
      minInvestment: 50,
      maxInvestment: 5000,
      totalInvestors: 892,
      roi: "192%",
      hashRate: "4.5 GH/s"
    },
    {
      id: 3,
      name: "Lite Hash",
      symbol: "LTC-HASH",
      icon: <Hash className="w-8 h-8" />,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      dailyEarnings: "1.8%",
      investmentPeriod: "120 days",
      minInvestment: 200,
      maxInvestment: 15000,
      totalInvestors: 567,
      roi: "216%",
      hashRate: "650 GH/s"
    },
    {
      id: 4,
      name: "Ripple Mine",
      symbol: "XRP-MINE",
      icon: <Coins className="w-8 h-8" />,
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-100",
      dailyEarnings: "2.8%",
      investmentPeriod: "75 days",
      minInvestment: 75,
      maxInvestment: 8000,
      totalInvestors: 432,
      roi: "210%",
      hashRate: "1.2 TH/s"
    },
    {
      id: 5,
      name: "Cardano Pool",
      symbol: "ADA-POOL",
      icon: <Layers className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      dailyEarnings: "3.5%",
      investmentPeriod: "45 days",
      minInvestment: 25,
      maxInvestment: 3000,
      totalInvestors: 678,
      roi: "157.5%",
      hashRate: "8.7 TH/s"
    },
    {
      id: 6,
      name: "Solana Cloud",
      symbol: "SOL-CLOUD",
      icon: <Activity className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-100",
      dailyEarnings: "4.2%",
      investmentPeriod: "30 days",
      minInvestment: 10,
      maxInvestment: 2000,
      totalInvestors: 945,
      roi: "126%",
      hashRate: "12.5 TH/s"
    },
    {
      id: 7,
      name: "Polkadot Grid",
      symbol: "DOT-GRID",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
      dailyEarnings: "2.1%",
      investmentPeriod: "100 days",
      minInvestment: 150,
      maxInvestment: 12000,
      totalInvestors: 321,
      roi: "210%",
      hashRate: "3.4 TH/s"
    },
    {
      id: 8,
      name: "Binance Power",
      symbol: "BNB-POWER",
      icon: <Battery className="w-8 h-8" />,
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-100",
      dailyEarnings: "3.8%",
      investmentPeriod: "50 days",
      minInvestment: 5,
      maxInvestment: 4000,
      totalInvestors: 1234,
      roi: "190%",
      hashRate: "6.8 TH/s"
    }
  ];

  useEffect(() => {
    const mockDeposits = [
      { id: 1, amount: 5000, currency: "USDT", status: "completed", date: "2024-01-15", txHash: "0xabc123...def456" },
      { id: 2, amount: 2500, currency: "BTC", status: "completed", date: "2024-01-10", txHash: "0xdef456...ghi789" },
      { id: 3, amount: 3000, currency: "ETH", status: "pending", date: "2024-01-18", txHash: "0xghi789...jkl012" },
      { id: 4, amount: 1950, currency: "USDT", status: "completed", date: "2024-01-05", txHash: "0xjkl012...mno345" }
    ];
    setDeposits(mockDeposits);

    const mockWithdrawals = [
      { id: 1, amount: 1000, currency: "USDT", status: "completed", date: "2024-01-12", address: "TBxyz789...abc123", txHash: "0x123abc...456def" },
      { id: 2, amount: 500, currency: "BTC", status: "processing", date: "2024-01-16", address: "bc1qdef...ghi789", txHash: "0x456def...789ghi" },
      { id: 3, amount: 750, currency: "ETH", status: "pending", date: "2024-01-19", address: "0x789ghi...jkl012", txHash: "0x789ghi...jkl012" }
    ];
    setWithdrawals(mockWithdrawals);
  }, []);

  function playSound() {
    try {
      const audio = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_7af4ef322d.mp3?filename=notification-2-183298.mp3"
      );
      audio.play();
    } catch (e) {}
  }

  useEffect(() => {
    if (!tvContainer.current) return;
    tvContainer.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      try {
        new window.TradingView.widget({
          autosize: true,
          symbol: selectedPair,
          interval: "1",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          container_id: "tv_chart_container",
        });
      } catch (err) {
        tvContainer.current.innerHTML =
          '<div class="flex items-center justify-center h-full text-sm text-gray-500">Unable to load TradingView chart.</div>';
      }
    };
    tvContainer.current.appendChild(script);
    return () => {
      try {
        script.remove();
      } catch (e) {}
    };
  }, [selectedPair]);

  useEffect(() => {
    const interval = setInterval(() => {
      const sig = {
        id: Date.now(),
        pair: selectedPair,
        type: Math.random() > 0.5 ? "BUY" : "SELL",
        price: (20000 + Math.random() * 3000).toFixed(2),
      };
      setNotifications((prev) => [sig, ...prev].slice(0, 5));
      playSound();
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== sig.id));
      }, 6000);
    }, 7000);

    return () => clearInterval(interval);
  }, [selectedPair]);

  function submitTrade(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const type = form.get("type") || "BUY";
    const amount = parseFloat(form.get("amount") || "0");
    const entryPrice = (20000 + Math.random() * 500).toFixed(2);

    setActiveTrades((prev) => [
      {
        id: Date.now(),
        pair: selectedPair,
        type,
        amount,
        entry: entryPrice,
        pnl: 0,
      },
      ...prev,
    ]);

    setShowTradeModal(false);
  }

  useEffect(() => {
    const int = setInterval(() => {
      setActiveTrades((prev) =>
        prev.map((t) => ({
          ...t,
          pnl: Number(((Math.random() - 0.5) * 50).toFixed(2)),
        }))
      );
    }, 1500);
    return () => clearInterval(int);
  }, []);

  function closeTrade(id) {
    setActiveTrades((prev) => prev.filter((t) => t.id !== id));
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function submitDeposit(e) {
    e.preventDefault();
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;

    const newDeposit = {
      id: Date.now(),
      amount: parseFloat(depositAmount),
      currency: selectedCrypto,
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      txHash: `0x${Math.random().toString(16).slice(2)}...${Math.random().toString(16).slice(2)}`
    };

    setDeposits(prev => [newDeposit, ...prev]);
    setDepositInstructions({
      currency: selectedCrypto,
      amount: parseFloat(depositAmount),
      address: cryptoWallets[selectedCrypto].address,
      network: cryptoWallets[selectedCrypto].network
    });
    setShowDepositForm(false);
    setDepositAmount("");
  }

  function submitWithdraw(e) {
    e.preventDefault();
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0 || !withdrawAddress) return;

    const newWithdrawal = {
      id: Date.now(),
      amount: parseFloat(withdrawAmount),
      currency: selectedCrypto,
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      address: withdrawAddress,
      txHash: `0x${Math.random().toString(16).slice(2)}...${Math.random().toString(16).slice(2)}`
    };

    setWithdrawals(prev => [newWithdrawal, ...prev]);
    setWithdrawInstructions({
      currency: selectedCrypto,
      amount: parseFloat(withdrawAmount),
      address: withdrawAddress,
      status: "pending"
    });
    setShowWithdrawForm(false);
    setWithdrawAmount("");
    setWithdrawAddress("");
  }

  function submitInvest(e) {
    e.preventDefault();
    if (!investAmount || parseFloat(investAmount) <= 0 || !selectedInvestCoin) return;

    const newInvestment = {
      id: Date.now(),
      coin: selectedInvestCoin.name,
      symbol: selectedInvestCoin.symbol,
      amount: parseFloat(investAmount),
      dailyEarnings: selectedInvestCoin.dailyEarnings,
      period: selectedInvestCoin.investmentPeriod,
      date: new Date().toISOString().split('T')[0],
      status: "active"
    };

    setInvestInstructions({
      coin: selectedInvestCoin.name,
      amount: parseFloat(investAmount),
      dailyEarnings: selectedInvestCoin.dailyEarnings,
      period: selectedInvestCoin.investmentPeriod,
      estimatedTotal: (parseFloat(investAmount) * (parseFloat(selectedInvestCoin.dailyEarnings) / 100) * 
        parseInt(selectedInvestCoin.investmentPeriod.split(' ')[0])).toFixed(2)
    });
    setShowInvestForm(false);
    setInvestAmount("");
  }

  function handleDepositClick() {
    setSidebarOpen(false);
    setShowDeposit(true);
    setShowWithdraw(false);
    setShowInvest(false);
  }

  function handleWithdrawClick() {
    setSidebarOpen(false);
    setShowWithdraw(true);
    setShowDeposit(false);
    setShowInvest(false);
  }

  function handleInvestClick() {
    setSidebarOpen(false);
    setShowInvest(true);
    setShowDeposit(false);
    setShowWithdraw(false);
  }

  function resetToTrading() {
    setShowDeposit(false);
    setShowWithdraw(false);
    setShowInvest(false);
    setShowDepositForm(false);
    setShowWithdrawForm(false);
    setShowInvestForm(false);
    setDepositInstructions(null);
    setWithdrawInstructions(null);
    setInvestInstructions(null);
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:relative z-40 top-0 left-0 h-full w-80 bg-gradient-to-b from-white to-blue-50/30 backdrop-blur-sm p-6 flex flex-col shadow-2xl border-r border-blue-100 transition-all duration-500 ease-out transform
          ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0 shadow-xl"}
        `}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-400 text-white font-bold rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                TradeFlow
              </h1>
              <p className="text-xs text-gray-500">Professional Trading</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-5 mb-8 text-white shadow-lg shadow-blue-200">
          <div className="absolute -right-10 -top-10 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="flex items-center space-x-4 relative z-10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-inner">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                U
              </div>
            </div>
            <div>
              <p className="text-lg font-bold">User</p>
              <p className="text-sm opacity-90">Professional Trader</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs opacity-80">Online</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-sm opacity-90">Account Balance</p>
            <p className="text-2xl font-bold mt-1">${balance.toLocaleString()}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            Trading
          </h3>
          
          <button
            onClick={() => {
              resetToTrading();
              setShowTradeModal(true);
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-sky-400 rounded-lg shadow-sm">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-700">New Trade</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </button>

          <button
            onClick={handleDepositClick}
            className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg shadow-sm">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-700">Deposit</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
          </button>

          <button
            onClick={handleWithdrawClick}
            className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-400 rounded-lg shadow-sm">
                <ArrowUpCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-700">Withdraw</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
          </button>

          <button
            onClick={handleInvestClick}
            className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg shadow-sm">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-700">Invest</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </button>

          <div className="pt-6 mt-6 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Account
            </h3>
            
            <button className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 w-full">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Settings</span>
            </button>
            
            <button className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 active:bg-red-100 text-red-600 transition-all duration-200 w-full">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Secure Trading</p>
              <p className="text-xs text-gray-500">256-bit SSL Encryption</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-blue-100 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 hover:bg-blue-50 rounded-xl transition-all duration-200 active:scale-95"
              >
                <Menu className="w-6 h-6 text-blue-600" />
              </button>
              
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-400 rounded-xl flex items-center justify-center shadow">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Welcome back</p>
                  <p className="font-semibold text-gray-800">User</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => {
                    resetToTrading();
                    setShowTradeModal(true);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Open Trade
                </button>
                
                <button className="p-2.5 hover:bg-blue-50 rounded-xl transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium">Total Balance</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                  ${balance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {!showDeposit && !showWithdraw && !showInvest && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="font-semibold text-gray-700 text-sm">Trading Pair:</label>
                <select
                  className="px-4 py-2.5 bg-white border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium cursor-pointer"
                  value={selectedPair}
                  onChange={(e) => setSelectedPair(e.target.value)}
                >
                  <option value="BTCUSDT" className="py-2">BTC/USDT</option>
                  <option value="ETHUSDT" className="py-2">ETH/USDT</option>
                  <option value="BNBUSDT" className="py-2">BNB/USDT</option>
                  <option value="XRPUSDT" className="py-2">XRP/USDT</option>
                  <option value="SOLUSDT" className="py-2">SOL/USDT</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Live</span>
                </div>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}
        </header>

        {!showDeposit && !showWithdraw && !showInvest ? (
          <div className="flex-1 relative p-6 overflow-auto">
            <div className="h-[calc(100vh-180px)] bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
              <div
                id="tv_chart_container"
                ref={tvContainer}
                className="w-full h-full"
              ></div>
            </div>

            {notifications.length > 0 && (
              <div className="absolute top-6 right-6 space-y-3 z-30 animate-fade-in">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="bg-white p-4 rounded-xl shadow-2xl border border-blue-100 w-80 animate-slide-in-right"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${n.type === 'BUY' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {n.type === 'BUY' ? 
                            <TrendingUp className="w-5 h-5 text-green-600" /> : 
                            <TrendingDown className="w-5 h-5 text-red-600" />
                          }
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-medium">Trading Signal</div>
                          <div className="font-bold text-gray-900">
                            {n.pair} — {n.type}
                          </div>
                          <div className="text-sm text-gray-600">@ ${n.price}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setNotifications(p => p.filter(x => x.id !== n.id))}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTrades.length > 0 && (
              <div className="absolute left-6 bottom-6 z-30 w-96 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 border-b border-blue-100">
                    <h3 className="font-bold text-gray-800 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                      Active Trades ({activeTrades.length})
                    </h3>
                  </div>
                  <div className="max-h-60 overflow-auto p-2">
                    {activeTrades.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-3 hover:bg-blue-50/50 rounded-xl transition-colors group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${t.type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {t.type}
                            </span>
                            <span className="font-semibold text-gray-900">{t.pair}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Entry: <span className="font-medium">${t.entry}</span> | Size: <span className="font-medium">{t.amount}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`text-right font-mono font-bold ${t.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {t.pnl >= 0 ? `+$${t.pnl}` : `-$${Math.abs(t.pnl)}`}
                          </div>
                          <button
                            onClick={() => closeTrade(t.id)}
                            className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : showDeposit ? (
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                <div className="p-6 border-b border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Deposit Funds</h2>
                        <p className="text-gray-500">Add funds to your trading account</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={resetToTrading}
                        className="px-4 py-2 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                      >
                        Back to Trading
                      </button>
                      <button
                        onClick={() => setShowDepositForm(true)}
                        className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Make Deposit
                      </button>
                    </div>
                  </div>
                </div>

                {depositInstructions ? (
                  <div className="p-6 animate-fade-in">
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <Check className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Deposit Instructions</h3>
                            <p className="text-gray-600">Follow these steps to complete your deposit</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl p-5 border border-emerald-100">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                              <DollarSign className="w-5 h-5 mr-2 text-emerald-600" />
                              Step 1: Copy Wallet Address
                            </h4>
                            <div className="mb-4">
                              <p className="text-sm text-gray-500 mb-2">Send exactly:</p>
                              <div className="text-2xl font-bold text-gray-900">
                                {depositInstructions.amount} {depositInstructions.currency}
                              </div>
                            </div>
                            <div className="mb-4">
                              <p className="text-sm text-gray-500 mb-2">Network:</p>
                              <div className="font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                {depositInstructions.network}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-2">Wallet Address:</p>
                              <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                                <code className="font-mono text-gray-900 truncate">
                                  {depositInstructions.address}
                                </code>
                                <button
                                  onClick={() => copyToClipboard(depositInstructions.address)}
                                  className="ml-3 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                                >
                                  {copied ? (
                                    <>
                                      <Check className="w-4 h-4" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-4 h-4" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-5 border border-emerald-100">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                              <ExternalLink className="w-5 h-5 mr-2 text-emerald-600" />
                              Step 2: Send Crypto
                            </h4>
                            <p className="text-gray-600 mb-4">
                              Send exactly <span className="font-bold">{depositInstructions.amount} {depositInstructions.currency}</span> to the address above using the <span className="font-bold">{depositInstructions.network}</span> network.
                            </p>
                            <div className="text-center">
                              <div className="w-48 h-48 mx-auto bg-white p-4 rounded-xl border border-gray-200">
                                <img 
                                  src={cryptoWallets[depositInstructions.currency].qrCode} 
                                  alt="QR Code" 
                                  className="w-full h-full"
                                />
                              </div>
                              <p className="text-sm text-gray-500 mt-3">Scan QR code with your wallet</p>
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                              <Shield className="w-5 h-5 mr-2 text-blue-600" />
                              Important Notes
                            </h4>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>Send only {depositInstructions.currency} on the {depositInstructions.network} network</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>Your account will be credited automatically after 3 network confirmations</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>Contact support if your account is not credited within 24 hours</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>Do not send from exchange wallets directly</span>
                              </li>
                            </ul>
                          </div>

                          <div className="flex space-x-3">
                            <button
                              onClick={() => {
                                setDepositInstructions(null);
                                setShowDepositForm(true);
                              }}
                              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                              New Deposit
                            </button>
                            <button
                              onClick={() => setDepositInstructions(null)}
                              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              View Deposit History
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : showDepositForm ? (
                  <div className="p-6 animate-fade-in">
                    <div className="max-w-md mx-auto">
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Make a Deposit</h3>
                        <p className="text-gray-500">Select cryptocurrency and enter amount</p>
                      </div>

                      <form onSubmit={submitDeposit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Cryptocurrency
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {["USDT", "BTC", "ETH"].map((crypto) => (
                              <button
                                type="button"
                                key={crypto}
                                onClick={() => setSelectedCrypto(crypto)}
                                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                  selectedCrypto === crypto
                                    ? 'border-emerald-500 bg-emerald-50'
                                    : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                                }`}
                              >
                                <div className="text-center">
                                  <div className="font-bold text-gray-900">{crypto}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {cryptoWallets[crypto].network}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount to Deposit
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              step="0.000001"
                              value={depositAmount}
                              onChange={(e) => setDepositAmount(e.target.value)}
                              placeholder="0.00"
                              className="w-full px-4 py-4 text-lg border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium"
                              required
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                              {selectedCrypto}
                            </div>
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <span className="text-gray-500">Minimum: 10 {selectedCrypto}</span>
                            <button
                              type="button"
                              onClick={() => setDepositAmount("100")}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Use 100 {selectedCrypto}
                            </button>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">You will send:</span>
                            <span className="font-bold text-gray-900">{depositAmount || '0'} {selectedCrypto}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Network:</span>
                            <span className="font-medium text-gray-900">{cryptoWallets[selectedCrypto].network}</span>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowDepositForm(false)}
                            className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!depositAmount || parseFloat(depositAmount) < 10}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            Continue to Payment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-6 border-b border-blue-100">
                      <h3 className="text-lg font-bold text-gray-900">Deposit History</h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {deposits.map((deposit) => (
                            <tr key={deposit.id} className="hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-6">
                                <div className="font-bold text-gray-900">{deposit.amount.toLocaleString()} {deposit.currency}</div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center">
                                  <div className={`w-3 h-3 rounded-full mr-2 ${
                                    deposit.currency === 'USDT' ? 'bg-green-500' :
                                    deposit.currency === 'BTC' ? 'bg-amber-500' :
                                    'bg-purple-500'
                                  }`}></div>
                                  <span className="font-medium">{deposit.currency}</span>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  deposit.status === 'completed' 
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-gray-600">{deposit.date}</td>
                              <td className="py-4 px-6">
                                <div className="flex items-center space-x-2">
                                  <code className="text-sm text-gray-500 font-mono truncate max-w-[120px]">
                                    {deposit.txHash}
                                  </code>
                                  <button
                                    onClick={() => copyToClipboard(deposit.txHash)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    <Copy className="w-4 h-4 text-gray-400" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {deposits.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Wallet className="w-10 h-10 text-gray-400" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-700 mb-2">No Deposits Yet</h4>
                          <p className="text-gray-500 mb-6">Start by making your first deposit</p>
                          <button
                            onClick={() => setShowDepositForm(true)}
                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            Make First Deposit
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : showWithdraw ? (
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                <div className="p-6 border-b border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-400 rounded-xl">
                        <ArrowUpCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Withdraw Funds</h2>
                        <p className="text-gray-500">Withdraw funds from your trading account</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={resetToTrading}
                        className="px-4 py-2 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                      >
                        Back to Trading
                      </button>
                      <button
                        onClick={() => setShowWithdrawForm(true)}
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Withdraw Funds
                      </button>
                    </div>
                  </div>
                </div>

                {withdrawInstructions ? (
                  <div className="p-6 animate-fade-in">
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-amber-100 rounded-lg">
                            <Check className="w-6 h-6 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Withdrawal Submitted</h3>
                            <p className="text-gray-600">Your withdrawal request has been received</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl p-5 border border-amber-100">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                              <DollarSign className="w-5 h-5 mr-2 text-amber-600" />
                              Withdrawal Details
                            </h4>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Amount:</span>
                                <span className="text-xl font-bold text-gray-900">
                                  {withdrawInstructions.amount} {withdrawInstructions.currency}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">To Address:</span>
                                <code className="font-mono text-gray-900 text-sm truncate max-w-[200px]">
                                  {withdrawInstructions.address}
                                </code>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Status:</span>
                                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">
                                  Processing
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                              <Clock className="w-5 h-5 mr-2 text-blue-600" />
                              Processing Time
                            </h4>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>Withdrawals are processed within 24 to 48 hours</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>You will receive a confirmation email when funds are sent</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>Network fees will be deducted from the withdrawal amount</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>Contact support if you don't receive funds within 48 hours</span>
                              </li>
                            </ul>
                          </div>

                          <div className="flex space-x-3">
                            <button
                              onClick={() => {
                                setWithdrawInstructions(null);
                                setShowWithdrawForm(true);
                              }}
                              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                              New Withdrawal
                            </button>
                            <button
                              onClick={() => setWithdrawInstructions(null)}
                              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              View Withdrawal History
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : showWithdrawForm ? (
                  <div className="p-6 animate-fade-in">
                    <div className="max-w-md mx-auto">
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Withdraw Funds</h3>
                        <p className="text-gray-500">Enter amount and wallet address</p>
                      </div>

                      <form onSubmit={submitWithdraw} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Cryptocurrency
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {["USDT", "BTC", "ETH"].map((crypto) => (
                              <button
                                type="button"
                                key={crypto}
                                onClick={() => setSelectedCrypto(crypto)}
                                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                  selectedCrypto === crypto
                                    ? 'border-amber-500 bg-amber-50'
                                    : 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'
                                }`}
                              >
                                <div className="text-center">
                                  <div className="font-bold text-gray-900">{crypto}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {cryptoWallets[crypto].network}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount to Withdraw
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              step="0.000001"
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(e.target.value)}
                              placeholder="0.00"
                              className="w-full px-4 py-4 text-lg border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium"
                              required
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                              {selectedCrypto}
                            </div>
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <span className="text-gray-500">Available: {balance.toLocaleString()} {selectedCrypto}</span>
                            <button
                              type="button"
                              onClick={() => setWithdrawAmount((balance / 2).toString())}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Use 50%
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Wallet Address
                          </label>
                          <textarea
                            value={withdrawAddress}
                            onChange={(e) => setWithdrawAddress(e.target.value)}
                            placeholder="Paste your wallet address here..."
                            rows="3"
                            className="w-full px-4 py-3 text-sm border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-mono resize-none"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Make sure this address supports {selectedCrypto} on the {cryptoWallets[selectedCrypto].network} network
                          </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">You will receive:</span>
                            <span className="font-bold text-gray-900">{withdrawAmount || '0'} {selectedCrypto}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Network Fee:</span>
                            <span className="font-medium text-gray-900">~2 {selectedCrypto}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-2">
                            <span className="text-gray-600">Processing Time:</span>
                            <span className="font-medium text-gray-900">24-48 hours</span>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowWithdrawForm(false)}
                            className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!withdrawAmount || parseFloat(withdrawAmount) < 10 || !withdrawAddress}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            Submit Withdrawal
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-6 border-b border-blue-100">
                      <h3 className="text-lg font-bold text-gray-900">Withdrawal History</h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {withdrawals.map((withdrawal) => (
                            <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-6">
                                <div className="font-bold text-gray-900">{withdrawal.amount.toLocaleString()} {withdrawal.currency}</div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center">
                                  <div className={`w-3 h-3 rounded-full mr-2 ${
                                    withdrawal.currency === 'USDT' ? 'bg-green-500' :
                                    withdrawal.currency === 'BTC' ? 'bg-amber-500' :
                                    'bg-purple-500'
                                  }`}></div>
                                  <span className="font-medium">{withdrawal.currency}</span>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  withdrawal.status === 'completed' 
                                    ? 'bg-green-100 text-green-700'
                                    : withdrawal.status === 'processing'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-gray-600">{withdrawal.date}</td>
                              <td className="py-4 px-6">
                                <div className="flex items-center space-x-2">
                                  <code className="text-sm text-gray-500 font-mono truncate max-w-[120px]">
                                    {withdrawal.address}
                                  </code>
                                  <button
                                    onClick={() => copyToClipboard(withdrawal.address)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    <Copy className="w-4 h-4 text-gray-400" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {withdrawals.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ArrowUpCircle className="w-10 h-10 text-amber-500" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-700 mb-2">No Withdrawals Yet</h4>
                          <p className="text-gray-500 mb-6">Start by making your first withdrawal</p>
                          <button
                            onClick={() => setShowWithdrawForm(true)}
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            Make First Withdrawal
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                <div className="p-6 border-b border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Mining Investment</h2>
                        <p className="text-gray-500">Invest in crypto mining for daily returns</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={resetToTrading}
                        className="px-4 py-2 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                      >
                        Back to Trading
                      </button>
                    </div>
                  </div>
                </div>

                {investInstructions ? (
                  <div className="p-6 animate-fade-in">
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6 mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Check className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Investment Confirmed!</h3>
                            <p className="text-gray-600">Your mining investment has been activated</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl p-5 border border-purple-100">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                              <Coins className="w-5 h-5 mr-2 text-purple-600" />
                              Investment Details
                            </h4>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Mining Coin:</span>
                                <span className="text-xl font-bold text-gray-900">
                                  {investInstructions.coin}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Investment Amount:</span>
                                <span className="text-xl font-bold text-gray-900">
                                  ${investInstructions.amount}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Daily Earnings:</span>
                                <span className="text-xl font-bold text-green-600">
                                  {investInstructions.dailyEarnings}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Investment Period:</span>
                                <span className="text-lg font-bold text-gray-900">
                                  {investInstructions.period}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Estimated Total Return:</span>
                                <span className="text-xl font-bold text-green-600">
                                  ${investInstructions.estimatedTotal}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                              <Clock className="w-5 h-5 mr-2 text-blue-600" />
                              Important Information
                            </h4>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>Earnings are calculated daily and credited to your account every 24 hours</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>Minimum investment period is required to receive full returns</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>You can reinvest earnings at any time</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span>Contact support for early withdrawal requests (fees may apply)</span>
                              </li>
                            </ul>
                          </div>

                          <div className="flex space-x-3">
                            <button
                              onClick={() => {
                                setInvestInstructions(null);
                              }}
                              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                              View All Mining Plans
                            </button>
                            <button
                              onClick={() => {
                                setInvestInstructions(null);
                                setShowInvestForm(false);
                              }}
                              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              Make Another Investment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : showInvestForm ? (
                  <div className="p-6 animate-fade-in">
                    <div className="max-w-md mx-auto">
                      <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 rounded-lg ${selectedInvestCoin?.bgColor}`}>
                            {selectedInvestCoin?.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">Invest in {selectedInvestCoin?.name}</h3>
                            <p className="text-gray-500">Enter investment amount</p>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={submitInvest} className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-xl p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Daily Earnings</p>
                              <p className="text-lg font-bold text-green-600">{selectedInvestCoin?.dailyEarnings}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Period</p>
                              <p className="text-lg font-bold text-gray-900">{selectedInvestCoin?.investmentPeriod}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Min Investment</p>
                              <p className="text-lg font-bold text-gray-900">${selectedInvestCoin?.minInvestment}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Max Investment</p>
                              <p className="text-lg font-bold text-gray-900">${selectedInvestCoin?.maxInvestment}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Investment Amount (USD)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min={selectedInvestCoin?.minInvestment}
                              max={selectedInvestCoin?.maxInvestment}
                              step="1"
                              value={investAmount}
                              onChange={(e) => setInvestAmount(e.target.value)}
                              placeholder="Enter amount"
                              className="w-full px-4 py-4 text-lg border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium"
                              required
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                              USD
                            </div>
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <span className="text-gray-500">Min: ${selectedInvestCoin?.minInvestment}</span>
                            <button
                              type="button"
                              onClick={() => setInvestAmount(selectedInvestCoin?.minInvestment.toString())}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Use Minimum
                            </button>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Daily Earnings:</span>
                              <span className="font-bold text-green-600">
                                ${(parseFloat(investAmount || '0') * parseFloat(selectedInvestCoin?.dailyEarnings || '0') / 100).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Total Return:</span>
                              <span className="font-bold text-green-600">
                                ${(parseFloat(investAmount || '0') * (parseFloat(selectedInvestCoin?.dailyEarnings || '0') / 100) * parseInt(selectedInvestCoin?.investmentPeriod.split(' ')[0] || '0')).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">ROI:</span>
                              <span className="font-bold text-green-600">{selectedInvestCoin?.roi}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowInvestForm(false)}
                            className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!investAmount || parseFloat(investAmount) < (selectedInvestCoin?.minInvestment || 0) || parseFloat(investAmount) > (selectedInvestCoin?.maxInvestment || 0)}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            Confirm Investment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-6 border-b border-blue-100">
                      <h3 className="text-lg font-bold text-gray-900">Mining Investment Plans</h3>
                      <p className="text-gray-500 mt-1">Choose from 8 different mining coins with varying returns</p>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {miningCoins.map((coin) => (
                          <div 
                            key={coin.id} 
                            className={`rounded-2xl border-2 ${coin.borderColor} ${coin.bgColor} p-5 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                            onClick={() => {
                              setSelectedInvestCoin(coin);
                              setShowInvestForm(true);
                            }}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className={`p-3 rounded-xl bg-gradient-to-br ${coin.color} text-white`}>
                                {coin.icon}
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-500">Investors</div>
                                <div className="font-bold text-gray-900">{coin.totalInvestors.toLocaleString()}</div>
                              </div>
                            </div>
                            
                            <h4 className="font-bold text-gray-900 text-lg mb-2">{coin.name}</h4>
                            <div className="text-sm text-gray-500 mb-4">{coin.symbol}</div>
                            
                            <div className="space-y-3 mb-6">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Daily Earnings</span>
                                <span className="font-bold text-green-600">{coin.dailyEarnings}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Period</span>
                                <span className="font-bold text-gray-900">{coin.investmentPeriod}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Min Investment</span>
                                <span className="font-bold text-gray-900">${coin.minInvestment}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">ROI</span>
                                <span className="font-bold text-green-600">{coin.roi}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Hash Rate</span>
                                <span className="font-bold text-gray-900">{coin.hashRate}</span>
                              </div>
                            </div>
                            
                            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
                              Invest Now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            resetToTrading();
            setShowTradeModal(true);
          }}
          className="fixed bottom-6 right-6 z-50 md:hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-sky-400 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-500 rounded-full shadow-2xl shadow-blue-400/50 flex flex-col items-center justify-center group-hover:shadow-3xl group-hover:shadow-blue-500/60 group-hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-subtle">
            <svg 
              className="w-8 h-8 text-white" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <line x1="12" y1="4" x2="12" y2="15" />
              <polyline points="8 11 12 15 16 11" />
              <path d="M4 12 C4 16, 8 20, 12 20 C16 20, 20 16, 20 12" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
              <path d="M8 12 C8 14, 10 16, 12 16 C14 16, 16 14, 16 12" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
            </svg>
            
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">+</span>
            </div>
          </div>
          
          <div className="absolute -top-12 right-0 bg-gray-900 text-white text-xs font-medium py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Open New Trade
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-900 transform rotate-45"></div>
          </div>
        </button>

        {showTradeModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
              onClick={() => setShowTradeModal(false)}
            />
            <form
              onSubmit={submitTrade}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in z-70"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-sky-400 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Open New Trade</h3>
                      <p className="text-sm text-gray-500">Trade {selectedPair}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowTradeModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trading Pair</label>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-xl font-semibold text-gray-900 flex items-center justify-between">
                    <span>{selectedPair.replace('USDT', '/USDT')}</span>
                    <div className="px-3 py-1 bg-white rounded-lg text-sm shadow-sm">
                      Live
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trade Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => document.querySelector('[name="type"]').value = 'BUY'}
                      className="p-4 border-2 border-green-200 bg-green-50 rounded-xl hover:bg-green-100 hover:border-green-300 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-green-700">BUY</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => document.querySelector('[name="type"]').value = 'SELL'}
                      className="p-4 border-2 border-red-200 bg-red-50 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <TrendingDown className="w-5 h-5 text-red-600" />
                        <span className="font-bold text-red-700">SELL</span>
                      </div>
                    </button>
                  </div>
                  <input type="hidden" name="type" defaultValue="BUY" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USDT)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input
                      name="amount"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-4 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-500">Available: ${balance.toLocaleString()}</span>
                    <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                      Use Max
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTradeModal(false)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Confirm Trade
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}