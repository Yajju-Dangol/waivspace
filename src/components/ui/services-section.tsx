import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, CheckCircle, MessageSquare, Loader2, Activity, Shield, FileText, Database, Share2 } from "lucide-react"

// 1. Autonomous AI Agents Animation
function AutonomousAgentsAnim() {
  const [tasks, setTasks] = useState<{ id: number; angle: number; completed: boolean }[]>([])
  const nextId = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const id = nextId.current++
      setTasks(prev => [...prev, { id, angle: Math.random() * 360, completed: false }])

      // Complete task after 1.5s
      setTimeout(() => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t))
      }, 1500)

      // Remove after 3s
      setTimeout(() => {
        setTasks(prev => prev.filter(t => t.id !== id))
      }, 3000)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <motion.div
        className="z-10 bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Cpu className="w-10 h-10 text-white" />
      </motion.div>

      <AnimatePresence>
        {tasks.map((task) => {
          const x = Math.cos((task.angle * Math.PI) / 180) * 80
          const y = Math.sin((task.angle * Math.PI) / 180) * 80

          return (
            <motion.div
              key={task.id}
              className="absolute"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
              animate={task.completed ? { x: 0, y: 0, opacity: [1, 0], scale: 1 } : { x, y, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {task.completed ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// 2. Agentic Chatbots Animation
function AgenticChatbotsAnim() {
  const [status, setStatus] = useState<'typing' | 'done'>('typing')

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => prev === 'typing' ? 'done' : 'typing')
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="bg-white/10 p-6 rounded-3xl border border-white/20 relative"
        layout
      >
        <AnimatePresence mode="wait">
          {status === 'typing' ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3"
            >
              <MessageSquare className="w-6 h-6 text-white" />
              <Loader2 className="w-5 h-5 text-white/50 animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-sm font-medium text-white">Action Executed</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// 3. Task Orchestration Animation
function TaskOrchestrationAnim() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[160px]">
      {[0.4, 0.7, 0.5].map((speed, i) => (
        <div key={i} className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-white/40 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{
              duration: 3 / speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        </div>
      ))}
    </div>
  )
}

// 4. Agentic Dashboard Animation
function AgenticDashboardAnim() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-48 h-32 bg-white/5 rounded-xl border border-white/10 p-4 overflow-hidden relative">
        <Activity className="absolute top-2 right-2 w-4 h-4 text-white/20" />
        <svg viewBox="0 0 100 40" className="w-full h-full">
          <motion.path
            d="M 0 20 Q 10 5, 20 20 T 40 20 T 60 20 T 80 20 T 100 20"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx={0}
            cy={20}
            r={2}
            fill="white"
            initial={{ cx: 0, cy: 20 }}
            animate={{
              cx: [0, 100],
              cy: [20, 20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40 pointer-events-none" />
      </div>
      <motion.div
        className="absolute w-56 h-56 border border-white/5 rounded-full"
        animate={{ scale: [1, 1.2], opacity: [0.2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  )
}

// 5. Data-Sync Support Animation
function DataSyncSupportAnim() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % 3)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center gap-6 h-full">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="relative w-14 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center"
          animate={index === i ? { scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" } : { scale: 1 }}
        >
          <AnimatePresence mode="wait">
            {index === i ? (
              <motion.div
                key="doc"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
              >
                {i === 1 ? <Database className="w-6 h-6 text-white" /> : <FileText className="w-6 h-6 text-white" />}
              </motion.div>
            ) : (
              <motion.div
                key="shield"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Shield className="w-6 h-6 text-white/30" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

// 6. Custom Workflows Animation
function CustomWorkflowsAnim() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-20 h-32 bg-zinc-900 rounded-2xl border-4 border-zinc-800 p-2 relative">
        <div className="w-full h-full border border-white/5 rounded-lg flex items-center justify-center relative overflow-hidden">
          <motion.div
            className="flex flex-col items-center gap-3"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Share2 className="w-8 h-8 text-white/80" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-white/10 rounded-sm"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function ServicesSectionGrid() {
  return (
    <section className="bg-black px-6 py-24 flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto">
        <motion.p
          className="text-white/70 text-xl font-poppins mb-8 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.p>
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight mb-16 leading-[1.3] py-2 text-white max-w-2xl font-poppins text-center md:text-left mx-auto md:mx-0">
          Everything you need to automate growth
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 auto-rows-min md:auto-rows-[320px]">

          {/* 1. Autonomous AI Agents - Tall (2x2 on md, squareish on sm) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 sm:col-span-2 footer-glass-pill rounded-3xl p-6 md:p-8 flex flex-col cursor-pointer overflow-hidden group min-h-[400px] md:min-h-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01, backgroundColor: "rgba(39, 39, 42, 0.8)" }}
          >
            <div className="flex-1 flex items-center justify-center py-4">
              <AutonomousAgentsAnim />
            </div>
            <div className="mt-4 text-center md:text-left">
              <h3 className="font-poppins text-xl text-white font-medium">Autonomous AI Agents</h3>
              <p className="text-gray-400 text-sm mt-1 font-poppins leading-relaxed">Self-correcting agents that plan, execute, and complete complex multi-step goals without human oversight.</p>
            </div>
          </motion.div>

          {/* 2. Agentic Chatbots - Standard (2x1) */}
          <motion.div
            className="md:col-span-2 sm:col-span-1 footer-glass-pill rounded-3xl p-6 md:p-8 flex flex-col cursor-pointer overflow-hidden group min-h-[300px] md:min-h-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 0.99 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <AgenticChatbotsAnim />
            </div>
            <div className="mt-4 text-center md:text-left">
              <h3 className="font-poppins text-xl text-white font-medium">Agentic Chatbots</h3>
              <p className="text-gray-400 text-sm mt-1 font-poppins">Intelligent interfaces that don't just talk—they execute actions in your tools.</p>
            </div>
          </motion.div>

          {/* 4. Agentic Dashboard - Tall (2x2) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 sm:col-span-2 footer-glass-pill rounded-3xl p-6 md:p-8 flex flex-col cursor-pointer overflow-hidden group min-h-[400px] md:min-h-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.01, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="flex-1 flex items-center justify-center py-4">
              <AgenticDashboardAnim />
            </div>
            <div className="mt-auto text-center md:text-left">
              <h3 className="font-poppins text-xl text-white flex items-center justify-center md:justify-start gap-2 font-medium">
                Agentic Dashboard
              </h3>
              <p className="text-gray-400 text-sm mt-1 font-poppins leading-relaxed">A central mission control to monitor your AI workforce and visualize real-time performance.</p>
            </div>
          </motion.div>

          {/* 3. Task Orchestration - Standard (2x1) */}
          <motion.div
            className="md:col-span-2 sm:col-span-1 footer-glass-pill rounded-3xl p-6 md:p-8 flex flex-col cursor-pointer overflow-hidden group min-h-[300px] md:min-h-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 0.99 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <TaskOrchestrationAnim />
            </div>
            <div className="mt-4 text-center md:text-left">
              <h3 className="font-poppins text-xl text-white font-medium">Task Orchestration</h3>
              <p className="text-gray-400 text-sm mt-1 font-poppins">High-speed coordination between multiple agents to handle parallel logic.</p>
            </div>
          </motion.div>

          {/* 5. Data-Sync Support - Wide (3x1) */}
          <motion.div
            className="md:col-span-3 sm:col-span-2 footer-glass-pill rounded-3xl p-6 md:p-8 flex flex-col cursor-pointer overflow-hidden group min-h-[300px] md:min-h-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 0.99 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <DataSyncSupportAnim />
            </div>
            <div className="mt-4 text-center md:text-left">
              <h3 className="font-poppins text-xl text-white flex items-center justify-center md:justify-start gap-2 font-medium">
                Data-Sync Support
              </h3>
              <p className="text-gray-400 text-sm mt-1 font-poppins">24/7 agents trained on your entire knowledge base and live business data.</p>
            </div>
          </motion.div>

          {/* 6. Custom Workflows - Wide (3x1) */}
          <motion.div
            className="md:col-span-3 sm:col-span-2 footer-glass-pill rounded-3xl p-6 md:p-8 flex flex-col cursor-pointer overflow-hidden group min-h-[300px] md:min-h-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 0.99 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <CustomWorkflowsAnim />
            </div>
            <div className="mt-4 text-center md:text-left">
              <h3 className="font-poppins text-xl text-white font-medium">Custom Agentic Workflows</h3>
              <p className="text-gray-400 text-sm mt-1 font-poppins">Tailor-made automation paths built for your specific industry requirements.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default function ServicesSection() {
  return <ServicesSectionGrid />
}
