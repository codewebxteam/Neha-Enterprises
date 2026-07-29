import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package, ChevronRight, Box, ArrowLeft, X,
    CheckCircle2, Clock, Truck, ShieldCheck, Star, Download
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import useScrollLock from '../../hooks/useScrollLock';
import ReviewModal from '../../components/product/ReviewModal';
import { useAuth } from '../../context/AuthContext';

const OrdersPage = () => {
    const { orders, cancelOrder } = useOrders();
    const navigate = useNavigate();
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const selectedOrder = orders.find(o => o.id === selectedOrderId);
    const { user } = useAuth();
    const [reviewingProduct, setReviewingProduct] = useState(null);

    useScrollLock(!!selectedOrder);

    // EXACT STATUS COLOR WITH GOKUL ACCENTS
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Placed': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Shipped': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Cancelled': return 'bg-rose-50 text-rose-700 border-rose-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    // UNTOUCHED DATE FORMATTER
    const formatDate = (dateString, includeTime = false) => {
        const date = new Date(dateString);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear().toString().substr(-2);

        let suffix = 'th';
        if (day === 1 || day === 21 || day === 31) suffix = 'st';
        else if (day === 2 || day === 22) suffix = 'nd';
        else if (day === 3 || day === 23) suffix = 'rd';

        let formatted = `${dayName}, ${day}${suffix} ${month} '${year}`;
        if (includeTime) {
            const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
            formatted = `${dayName}, ${day}${suffix} ${month} '${year} - ${time}`;
        }
        return formatted;
    };

    // UNTOUCHED CANCELLATION LOGIC
    const handleCancelClick = async (order) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            const reason = window.prompt('Please enter a reason for cancellation (optional):', 'Changed my mind');
            if (reason === null) return;
            
            const cancelReason = reason.trim() !== '' ? reason : 'Cancelled by User';
            const targetId = order.firebaseId || order.id;
            const success = await cancelOrder(targetId, cancelReason);
            if (success) {
                alert('Order cancelled successfully.');
            } else {
                alert('Failed to cancel order. Please try again.');
            }
        }
    };

    const statusHierarchy = { 'Pending': 0, 'Placed': 1, 'Confirmed': 2, 'Shipped': 3, 'Delivered': 4 };

    return (
        <div className="min-h-screen bg-[#fdfbf7] pt-[128px] sm:pt-[154px] pb-24 font-['Montserrat',sans-serif]">
            
            {/* Header Section */}
            <header className="bg-white border-b border-slate-200/60 shadow-xs">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/')}
                            className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-600 transition-colors border border-slate-200/60"
                            title="Back to Shop"
                        >
                            <ArrowLeft size={20} />
                        </motion.button>
                        <div>
                            <h1 style={{ fontFamily: "'Recoleta', Georgia, serif" }} className="text-2xl sm:text-3xl font-bold text-[#333333] leading-none mb-1">
                                Wholesale Order History
                            </h1>
                            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Track and manage your distributor dispatches
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck size={16} className="text-[#27318a]" />
                        <span>100% Authentic Factory Stock</span>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl p-8 shadow-sm border border-slate-100 max-w-2xl mx-auto mt-6">
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-6 shadow-inner">
                            <Package size={40} />
                        </div>
                        <h2 style={{ fontFamily: "'Recoleta', Georgia, serif" }} className="text-2xl sm:text-3xl font-bold text-[#333333] mb-2">
                            No Orders Placed Yet
                        </h2>
                        <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
                            You haven't requested any stock yet. Browse our wholesale catalog to order fresh Namkeen, Wafers, and Bakery snacks.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/products')}
                            style={{ backgroundColor: '#27318a' }}
                            className="px-8 py-4 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-90 transition-all active:scale-95"
                        >
                            Explore Wholesale Catalog
                        </motion.button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                        {orders.map((order) => (
                            <motion.div
                                key={order.id}
                                layoutId={order.id}
                                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-xl hover:border-[#27318a]/30 transition-all duration-300 group"
                            >
                                <div className="p-6 sm:p-8">
                                    
                                    {/* Order Top Bar */}
                                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div style={{ backgroundColor: '#27318a' }} className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm">
                                                <Box size={22} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Order ID:</span>
                                                    <span className="text-sm font-bold text-[#333333] font-mono">{order.id}</span>
                                                </div>
                                                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                                                    Placed on <span className="text-[#333333] font-bold">{formatDate(order.date)}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    {/* Order Items List */}
                                    <div className="flex items-center gap-6 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-3 shrink-0">
                                                <div className="w-32 h-32 sm:w-36 sm:h-36 bg-slate-50 rounded-2xl border border-slate-200/60 p-4 shadow-xs group-hover:border-[#27318a]/20 transition-all relative overflow-hidden flex items-center justify-center">
                                                    <img 
                                                        src={item.img} 
                                                        alt={item.name} 
                                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                                                    />
                                                </div>
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-xs font-bold text-[#333333] tracking-tight truncate max-w-[120px] text-center">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                        Qty: {item.quantity} {item.selectedUnit || item.unit || 'Pc'}
                                                    </span>
                                                </div>
                                                {order.status === 'Delivered' && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setReviewingProduct(item);
                                                        }}
                                                        className="px-3 py-1.5 bg-[#fce513] text-[#333333] rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-[#e8d20e] transition-all shadow-xs flex items-center gap-1.5"
                                                    >
                                                        <Star size={12} fill="#333333" /> Rate Product
                                                    </motion.button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Footer & Actions */}
                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 p-6 sm:-mx-8 sm:-mb-8 sm:p-8">
                                        <div className="flex flex-col">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Wholesale Amount</p>
                                            {order.adminDiscount > 0 && (
                                                <p className="text-xs font-bold text-rose-500 line-through">
                                                    ₹{((order.grandTotal || order.amount || 0) + order.adminDiscount).toLocaleString('en-IN')}
                                                </p>
                                            )}
                                            <p style={{ color: '#27318a' }} className="text-xl sm:text-2xl font-black font-mono">
                                                ₹{(order.grandTotal || order.amount || 0).toLocaleString('en-IN')}
                                            </p>
                                            {order.adminDiscount > 0 && (
                                                <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1 w-max">
                                                    Admin Discount: -₹{order.adminDiscount.toLocaleString('en-IN')}
                                                </p>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            {order.status === 'Delivered' && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        import('../../utils/invoiceGenerator').then(module => {
                                                            module.generateInvoice(order);
                                                        });
                                                    }}
                                                    className="px-5 py-2.5 bg-[#27318a] text-white hover:bg-[#1e2670] rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2"
                                                >
                                                    <Download size={14} /> Download Invoice
                                                </motion.button>
                                            )}
                                            {(order.status === 'Pending' || order.status === 'Placed') && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleCancelClick(order)}
                                                    className="px-5 py-2.5 bg-white text-rose-600 hover:bg-rose-600 hover:text-white rounded-full text-xs font-bold uppercase tracking-wider border border-rose-200 transition-colors shadow-xs"
                                                >
                                                    Cancel Order
                                                </motion.button>
                                            )}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedOrderId(order.id)}
                                                style={{ backgroundColor: '#27318a' }}
                                                className="px-6 py-2.5 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition-all flex items-center gap-2 active:scale-95"
                                            >
                                                <span>Track Dispatch</span> 
                                                <ChevronRight size={16} />
                                            </motion.button>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* ====== Tracking Modal (Refactored to match Gokul theme) ====== */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedOrderId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-slate-200 font-['Montserrat',sans-serif]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setSelectedOrderId(null)}
                                        className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 transition-colors sm:hidden"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                    <div>
                                        <h3 style={{ fontFamily: "'Recoleta', Georgia, serif" }} className="text-xl font-bold text-[#333333]">
                                            Dispatch Timeline
                                        </h3>
                                        <p className="text-xs font-semibold text-slate-400">Order #{selectedOrder.id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedOrderId(null)}
                                    className="hidden sm:flex p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Center Timeline Area */}
                            <div className="p-6 sm:p-8 flex-1 overflow-y-auto bg-white">
                                <div className="relative space-y-6">
                                    {selectedOrder.timeline.map((step, idx) => {
                                        const currentStepIndex = statusHierarchy[selectedOrder.status] ?? 0;
                                        const isCompleted = idx <= currentStepIndex;
                                        const hasNext = idx < selectedOrder.timeline.length - 1;
                                        const isNextCompleted = (idx + 1) <= currentStepIndex;

                                        return (
                                            <div key={idx} className="relative flex gap-5 pb-6 last:pb-0">
                                                {/* Line & Dot */}
                                                <div className="flex flex-col items-center w-6 shrink-0 relative">
                                                    {hasNext && (
                                                        <div 
                                                            style={{ backgroundColor: isNextCompleted ? '#27318a' : '#e2e8f0' }}
                                                            className="w-[3px] absolute top-6 bottom-[-24px] left-[11px] transition-colors duration-300" 
                                                        />
                                                    )}
                                                    <div 
                                                        style={{ backgroundColor: isCompleted ? '#27318a' : '#cbd5e1' }}
                                                        className="relative z-10 w-6 h-6 mt-0.5 rounded-full shrink-0 border-[3px] border-white shadow-sm flex items-center justify-center transition-all duration-300"
                                                    >
                                                        {isCompleted && <div className="w-2 h-2 rounded-full bg-[#fce513]" />}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 -mt-1">
                                                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                                                        <h4 className={`text-base font-bold ${isCompleted ? 'text-[#333333]' : 'text-slate-400'}`}>
                                                            {step.status}
                                                        </h4>
                                                        {(step.date && isCompleted) && (
                                                            <span className="text-xs font-semibold text-slate-400">
                                                                {formatDate(step.date)}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="space-y-1">
                                                        <p className={`text-sm leading-relaxed ${isCompleted ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
                                                            {step.desc}
                                                        </p>
                                                        {step.date && isCompleted && (
                                                            <p style={{ color: '#27318a' }} className="text-xs font-bold flex items-center gap-1.5 mt-1">
                                                                <Clock size={12} />
                                                                {formatDate(step.date, true)}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                                <span className="flex items-center gap-1.5">
                                    <Truck size={16} className="text-[#27318a]" /> Direct Gorakhpur Logistics
                                </span>
                                <button 
                                    onClick={() => setSelectedOrderId(null)}
                                    style={{ backgroundColor: '#27318a' }}
                                    className="px-5 py-2 text-white rounded-full font-bold uppercase tracking-wider text-[11px]"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ====== UNTOUCHED REVIEW MODAL INTEGRATION ====== */}
            <AnimatePresence>
                {reviewingProduct && (
                    <ReviewModal 
                        product={reviewingProduct}
                        user={user}
                        onClose={() => setReviewingProduct(null)}
                        onReviewSubmitted={() => {
                            setReviewingProduct(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrdersPage;