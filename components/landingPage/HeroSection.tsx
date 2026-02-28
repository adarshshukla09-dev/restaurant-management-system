import React from 'react';
import { ChevronRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 bg-linear-to-br from-orange-50 via-white to-red-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-6">
            New: QR Table Ordering 2.0
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
            Manage Your Restaurant <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-red-600">
              Smarter, Faster & Better
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0">
            All-in-one Restaurant Management System for tables, orders, staff, and payments. Experience the flow with DineFlow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-orange-200">
              Start Free Trial <ChevronRight size={20} />
            </button>
            <button className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-orange-200 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all">
              <Play size={18} className="fill-slate-700" /> Book Demo
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="lg:w-1/2 relative">
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-orange-100 p-2 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=" 
              alt="DineFlow Dashboard" 
              className="rounded-xl w-full h-auto"
            />
          </div>
          {/* Decorative Blur Blobs */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;