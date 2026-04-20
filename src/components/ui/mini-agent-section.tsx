import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeUrl } from '../../lib/api';
import { saveLead } from '../../lib/supabaseClient';
import { Search, CheckCircle, ArrowRight, DollarSign } from 'lucide-react';

export function MiniAgentSection() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    try {
      setError('');
      setStatus('scanning');
      const data = await analyzeUrl(url);
      setResults(data.solutions || []);
      setStatus('results');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setStatus('idle');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await saveLead(email, url, results);
      setSaved(true);
    } catch (err: any) {
      setError(err.message || 'Failed to save lead');
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center  text-white  pb-24 relative bg-black">
      {/* Seamless bottom fade overlay — dissolves into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 70%, black 100%)' }}
      />

      <div className="max-w-4xl w-full z-10 flex flex-col items-center relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 text-sm text-white font-poppins">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            WAIV Agent
          </div>
          <h2 className="text-4xl md:text-6xl font-medium font-poppins mb-6">
            Identify Bottlenecks.<br />
            <span className="text-white">
              Execute with Agents.
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-poppins">
            Enter your website URL and our AI CFO will scan your business DNA to reveal manual workflows costing you money, and how to automate them.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.form
              key="search"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              onSubmit={handleAnalyze}
              className="w-full max-w-2xl relative"
            >
              <div className="relative flex items-center group">
                <Search className="absolute left-6 w-6 h-6 text-gray-500 group-focus-within:text-white transition-colors" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourcompany.com"
                  required
                  className="w-full h-16 md:h-20 bg-white/5 border-2 border-white/10 rounded-full pl-16 pr-40 text-lg md:text-xl text-white outline-none focus:border-white/50 focus:bg-white/10 transition-all font-poppins placeholder:text-gray-600 shadow-2xl shadow-black/20"
                />
                <button
                  type="submit"
                  className="absolute right-2 h-12 md:h-16 px-6 md:px-8 bg-white text-black rounded-full font-medium font-poppins text-base md:text-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  Analyze <ArrowRight className="w-4 h-4 hidden sm:block" />
                </button>
              </div>
              {error && <p className="text-red-400 text-center mt-4 font-poppins">{error}</p>}
            </motion.form>
          )}

          {status === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                <motion.div
                  className="absolute inset-0 border-4 border-t-white border-r-gray-500 border-b-transparent border-l-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 border-4 border-b-white border-l-gray-500 border-t-transparent border-r-transparent rounded-full opacity-50"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <Search className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-2xl font-poppins font-medium animate-pulse">Scanning Business DNA...</h3>
              <p className="text-gray-500 mt-2 font-poppins">Analyzing operations and calculating ROI</p>
            </motion.div>
          )}

          {status === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {results.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <h4 className="text-xl font-medium font-poppins text-white">{result.title}</h4>
                    </div>
                    <div className="mb-4 flex-1">
                      <p className="text-sm text-gray-300 mb-2 font-poppins"><strong>Problem:</strong> {result.problem}</p>
                      <p className="text-sm text-gray-300 font-poppins"><strong>Blueprint:</strong> {result.blueprint}</p>
                    </div>
                    <div className="mt-auto">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 text-white rounded-lg font-poppins text-sm font-medium w-full justify-center group-hover:bg-white/20 transition-colors">
                        <DollarSign className="w-4 h-4" />
                        Annual Savings: {result.savings}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!saved ? (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onSubmit={handleSave}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-xl mx-auto backdrop-blur-md"
                >
                  <h4 className="text-xl font-medium font-poppins mb-2 text-center">Uncover the full execution plan</h4>
                  <p className="text-gray-400 text-sm text-center mb-6 font-poppins">
                    Enter your email to receive this exact blueprint and a free consultation to implement it.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50 font-poppins placeholder:text-gray-600"
                    />
                    <button
                      type="submit"
                      className="bg-white text-black px-6 rounded-lg font-medium font-poppins hover:bg-gray-200 transition-colors"
                    >
                      Send Blueprint
                    </button>
                  </div>
                  {error && <p className="text-red-400 mt-2 font-poppins text-sm text-center">{error}</p>}
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/20 rounded-2xl p-8 max-w-xl mx-auto text-center"
                >
                  <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
                  <h4 className="text-xl font-medium font-poppins mb-2 text-white">Blueprint Sent!</h4>
                  <p className="text-gray-400 text-sm font-poppins">We'll be in touch shortly to help you implement these savings.</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
