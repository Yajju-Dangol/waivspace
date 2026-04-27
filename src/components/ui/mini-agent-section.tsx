import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeUrl } from '../../lib/api';
import { saveLead } from '../../lib/supabaseClient';
import { CheckCircle, DollarSign, Terminal as TerminalIcon, Zap, Cpu, Code2, Database } from 'lucide-react';

export function MiniAgentSection() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const placeholders = [
    "https://yourcompany.com (Scan for slow lead response)",
    "https://yourcompany.com (Scan for manual data entry)",
    "https://yourcompany.com (Scan for repetitive client reporting)",
    "https://yourcompany.com (Scan for workflow bottlenecks)"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const categories = ['All', 'Sales', 'Support', 'Operations', 'Marketing'];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    try {
      setError('');
      setStatus('scanning');
      setTerminalLogs(["> Initializing AI Audit Engine..."]);
      
      const steps = [
        "> Fetching sitemap... DONE",
        "> Analyzing workflow patterns... FOUND",
        "> Identifying manual bottlenecks... DETECTED",
        "> Calculating ROI for automation... COMPLETE",
        "> Finalizing blueprint..."
      ];

      steps.forEach((step, i) => {
        setTimeout(() => {
          setTerminalLogs(prev => [...prev, step]);
        }, (i + 1) * 800);
      });

      const data = await analyzeUrl(url);
      setTimeout(() => {
        setResults(data.solutions || []);
        setStatus('results');
      }, steps.length * 800 + 500);
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
    <div 
      onMouseMove={handleMouseMove}
      className="w-full min-h-[80vh] flex flex-col items-center justify-center text-white py-16 md:py-24 relative bg-black overflow-hidden group/section"
    >
      {/* X-Ray Hover Effect Background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover/section:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 40%)`
        }}
      />
      
      {/* Hidden Tech Icons (X-Ray Reveal) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <Zap className="absolute top-1/4 left-1/4 w-12 h-12 text-white/10 rotate-12" />
        <Cpu className="absolute top-1/3 right-1/4 w-16 h-16 text-white/10 -rotate-12" />
        <Code2 className="absolute bottom-1/4 left-1/3 w-20 h-20 text-white/10 rotate-45" />
        <Database className="absolute bottom-1/3 right-1/3 w-14 h-14 text-white/10 -rotate-45" />
      </div>

      <div className="max-w-4xl w-full z-10 flex flex-col items-center relative px-4 sm:px-6 md:px-8 lg:px-0">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 text-sm text-white font-poppins">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            AI Audit Engine
          </div>
          <h2 className="text-4xl md:text-7xl font-medium font-poppins mb-6 uppercase tracking-tight leading-[0.9]">
            Stop Manual Work.<br />
            <span className="text-white/50">Start Scaling.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-poppins">
            Our multi-agent system scans your infrastructure to find exactly where manual tasks are bleeding revenue.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'results' ? (
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
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 max-w-xl mx-auto backdrop-blur-md"
                >
                  <h4 className="text-xl font-medium font-poppins mb-2 text-center">Uncover the full execution plan</h4>
                  <p className="text-gray-400 text-sm text-center mb-6 font-poppins">
                    Enter your email to receive this exact blueprint and a free consultation to implement it.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
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
                      className="bg-white text-black px-6 py-3 rounded-lg font-medium font-poppins hover:bg-gray-200 transition-colors whitespace-nowrap"
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
          ) : (
            <motion.div
              key="terminal-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              className="w-full max-w-3xl bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-[10px] text-gray-500 ml-2 uppercase tracking-widest font-mono">
                  {status === 'idle' ? 'Ready to Audit' : `Auditing: ${url}`}
                </span>
              </div>

              <div className="p-6 min-h-[300px] flex flex-col">
                {status === 'idle' ? (
                  <div className="flex flex-col gap-8">
                    <div className="space-y-2 font-mono text-sm text-gray-400">
                      <p>&gt; System initialized.</p>
                      <p>&gt; Multi-agent audit core online.</p>
                      <p className="text-white">&gt; Please enter your business URL below to begin.</p>
                    </div>

                    <form onSubmit={handleAnalyze} className="relative">
                      <div className="relative flex items-center group">
                        <span className="absolute left-4 font-mono text-green-400">waiv@ai:~$</span>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder={placeholders[placeholderIndex]}
                          required
                          className="w-full h-14 bg-transparent border-b border-white/10 pl-28 pr-32 text-sm text-white outline-none focus:border-white/30 transition-all font-mono placeholder:text-gray-600"
                        />
                        <button
                          type="submit"
                          className="absolute right-0 h-10 px-6 bg-white text-black rounded-lg font-bold font-poppins text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                          <span>Run Audit</span> <TerminalIcon className="w-3 h-3" />
                        </button>
                      </div>
                      
                      {/* Process Selector Chips */}
                      <div className="flex flex-wrap gap-2 mt-6">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest self-center mr-2 font-mono">Scope:</span>
                        {categories.map(cat => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                              "px-3 py-1 rounded-md text-[10px] font-mono transition-all border uppercase tracking-wider",
                              activeCategory === cat 
                                ? "bg-white text-black border-white" 
                                : "bg-white/5 text-gray-500 border-white/10 hover:border-white/30"
                            )}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-1 font-mono text-sm">
                    {terminalLogs.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          log.includes("DONE") || log.includes("FOUND") || log.includes("COMPLETE") 
                            ? "text-green-400" 
                            : "text-gray-400"
                        )}
                      >
                        {log}
                      </motion.div>
                    ))}
                    <motion.div 
                      animate={{ opacity: [0, 1] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2 h-4 bg-white/50 align-middle ml-1" 
                    />
                    
                    {/* Instant Value Teaser in Scanning */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2 }}
                      className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl max-w-sm"
                    >
                      <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-tighter text-white/50">
                        <Zap className="w-3 h-3 text-yellow-400" /> High-Intent Detection
                      </div>
                      <p className="text-xs font-mono text-gray-300 leading-relaxed">
                        Scanning has detected significant manual drag in {activeCategory} workflows. Automation potential currently estimated at ~40%.
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
