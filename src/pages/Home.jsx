

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Headerhome from "../components/Headerhome";
import '../index.css';

export function Homepage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("autotoken69");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Headerhome />

      {/* Hero Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Smart Note-Taking Reimagined
            </h1>
            <p className="text-md text-gray-600 mb-8 max-w-3xl mx-auto">
              Capture web content instantly, organize effortlessly, and access anywhere.<br/>
              Let AI-powered automation handle your notes while you focus on what matters.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/signup"
                className="bg-[rgb(47,141,113)] hover:bg-[rgb(18,107,70)] text-white px-8 py-4 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Start Free Today
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-center text-gray-800 mb-16"
          >
            How Auto Note Works
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "1. Webpage Integration",
                icon: "🌐",
                desc: "Automatically creates files based on visited webpages"
              },
              {
                title: "2. Smart Capture",
                icon: "✍️",
                desc: "Select text anywhere - we'll save it automatically"
              },
              {
                title: "3. Floating Hub",
                icon: "🎮",
                desc: "Control notes without leaving your current page"
              },
              {
                title: "4. Cloud Sync",
                icon: "☁️",
                desc: "Access notes across all your devices"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Extension demo" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 border-8 border-white/10 rounded-2xl"></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Your Web-Integrated Notebook
            </h2>
            <ul className="space-y-6 text-gray-600">
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">✔️</div>
                <span>Automatic context-aware note organization</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">🔄</div>
                <span>Real-time syncing across all devices</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">🔗</div>
                <span>Automatic source URL tracking</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Transform How You Capture Information
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users who never lose a valuable insight
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">Auto Note</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © 2024 Auto Note. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}