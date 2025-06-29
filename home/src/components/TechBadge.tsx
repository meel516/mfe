import React from "react";
import { motion } from "framer-motion";
import { FiCpu, FiPackage, FiGlobe, FiCode } from "react-icons/fi";

const TechBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-5 py-3 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FiCpu className="text-indigo-400" />
            <span className="font-mono text-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
              React 19
            </span>
          </div>
          <div className="h-4 w-px bg-gray-600" />
          <div className="flex items-center gap-2">
            <FiPackage className="text-blue-400" />
            <span className="font-mono text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
              Rspack
            </span>
          </div>
          <div className="h-4 w-px bg-gray-600" />
          <div className="flex items-center gap-2">
            <FiGlobe className="text-green-400" />
            <span className="font-mono text-sm bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-300">
              Module Federation
            </span>
          </div>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="h-0.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500 mt-2 rounded-full"
        />

        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <FiCode className="text-xs" />
            Modern Architecture
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TechBadge;
