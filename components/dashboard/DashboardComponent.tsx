"use client";
import React from "react";

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H9a1 1 0 01-1-1v-1a4 4 0 00-4-4H4a1 1 0 01-1-1V5a1 1 0 011-1h16a1 1 0 011 1v14a1 1 0 01-1 1h-3.046M12 18h.01" /></svg>;
const ShoppingBagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const CurrencyDollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h10a2 2 0 012 2v10a2 2 0 01-2 2h-3v3L9 17H7a2 2 0 01-2-2V5a2 2 0 012-2z" /></svg>;


const mockStats = [
  { 
    title: "إجمالي المبيعات", 
    value: "145,200 ريال", 
    icon: CurrencyDollarIcon, 
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" 
  },
  { 
    title: "الطلبات الجديدة", 
    value: "1,240", 
    icon: ShoppingBagIcon, 
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" 
  },
  { 
    title: "إجمالي المنتجات", 
    value: "450", 
    icon: TagIcon, 
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" 
  },
  { 
    title: "المستخدمون النشطون", 
    value: "5,800", 
    icon: UserIcon, 
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" 
  },
];

const recentOrders = [
  { id: "#1001", customer: "علي محمد", total: "150.00 ريال", status: "مكتمل" },
  { id: "#1002", customer: "سارة خالد", total: "95.50 ريال", status: "قيد المعالجة" },
  { id: "#1003", customer: "فهد ناصر", total: "420.75 ريال", status: "مكتمل" },
  { id: "#1004", customer: "ريم منصور", total: "75.00 ريال", status: "ملغى" },
];

const getStatusBadge = (status: string) => {
  let colorClass = "bg-gray-100 text-gray-800";
  if (status === "مكتمل") {
    colorClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  } else if (status === "قيد المعالجة") {
    colorClass = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
  } else if (status === "ملغى") {
    colorClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  }
  
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};


const DashboardComponent = () => {
  return (
    <div className="space-y-6 lg:space-y-8">
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <div 
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className={`p-2 rounded-full w-fit mb-3 ${stat.color}`}>
              <stat.icon />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
            <h3 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{stat.value}</h3>
          </div>
        ))}
      </div>
      
      ---
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] h-[400px]">
          <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            ملخص المبيعات (البيانات وهمية)
          </h4>
          <div className="flex items-center justify-center h-4/5 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-gray-500">
            [مساحة مخصصة لرسم بياني فعلي - Chart Placeholder]
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            الطلبات الحديثة
          </h4>
          <ul className="divide-y divide-gray-200 dark:divide-gray-800/60">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex items-center justify-between py-3">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 dark:text-white/90">{order.customer}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{order.id}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-800 dark:text-white/90">{order.total}</span>
                  {getStatusBadge(order.status)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;