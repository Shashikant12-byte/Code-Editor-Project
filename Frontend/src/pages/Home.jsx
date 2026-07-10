import React, { useState, useContext, } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Layers,
  Cpu,
  Users,
  Zap,
  ShieldCheck,
  Sliders,
  Code,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Keyboard
} from 'lucide-react';
import {AnimatePresence, motion } from 'motion/react';
import InteractiveEditor from '../components/interactiveEditor';
import Navbar from '../components/navbar';
import { data } from '../context/userContext';




function Home() {
  let navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  let { currentUser, setCurrentUser } = useContext(data);



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: "Real-time Sandbox VM",
      description: "Run TypeScript, JavaScript, and Python snippets in an instant, sandboxed virtual environment without any server overhead."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      title: "AI autocomplete",
      description: "Powered by Gemini models to provide semantic code suggestions, automated documentation generation, and instant code refactoring."
    },
    {
      icon: <Sliders className="w-5 h-5 text-emerald-400" />,
      title: "Pixel-Perfect Themes",
      description: "Personalize your workspace with curated editor themes like One Dark, Dracula, and Nord, complete with fluid, adjustable font sizes."
    },
    {
      icon: <Keyboard className="w-5 h-5 text-blue-400" />,
      title: "IntelliSense Engine",
      description: "Full bracket matching, live diagnostics, autocomplete, code formatting, and code folding optimized for high-speed typing."
    },
    {
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      title: "Multi-file Navigation",
      description: "Work seamlessly across multiple files in a clean, high-density tabbed interface styled for professional builders."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      title: "Secure cloud sync",
      description: "Your configurations, preferences, and workspaces are secure. Never lose a line of code, regardless of your browser's state."
    }
  ];

  const faqs = [
    {
      question: "Is CodeCraft really free to use?",
      answer: "Yes, our core editor, compiler sandboxes, and basic customization configurations are completely free. Premium AI auto-complete features and cloud workspace storage tiers can be unlocked upon registering a secure developer profile."
    },
    {
      question: "Which programming languages does the editor support?",
      answer: "Out of the box, we fully support syntax highlighting, error diagnostics, and runtimes for TypeScript, JavaScript, Python, HTML/CSS, JSON, and Markdown. Additional languages such as Rust, Go, and C++ are available on our enterprise tier."
    },
    {
      question: "Can I connect my GitHub or Google accounts?",
      answer: "Absolutely! You can sign in or register in seconds using Google or GitHub integrations. This allows you to quickly import your repositories and synchronize workspace keybindings across multiple systems."
    },
    {
      question: "How secure is the code compiled in the editor sandbox?",
      answer: "Every compilation is run in a secure, isolated sandbox environment that executes purely on virtual contexts, preventing cross-script pollution. Your code remains proprietary and is never stored on external caches unless you explicitly save a shared link."
    }
  ];

  const stats = [
    { value: "< 15ms", label: "Typing Latency" },
    { value: "3", label: "Premium Themes Included" },
    { value: "99.99%", label: "Compiler Uptime" },
    { value: "50k+", label: "Registered Developers" }
  ];

  const scrollToEditor = () => {
    document.getElementById('editor-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none selection:bg-indigo-500/20 antialiased selection:text-white">
    <Navbar/>

    <main className="flex-grow">
             <AnimatePresence mode="wait">
               <motion.div
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -15 }}
                 transition={{ duration: 0.25, ease: 'easeInOut' }}
                 className="w-full h-full"
               >

    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden font-sans pb-20">
      {/* Absolute Decorative Blurred Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-950/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-950/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

     
          
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/20 text-xs font-mono font-medium text-indigo-300 hover:bg-indigo-900/30 transition-all duration-300 cursor-pointer"
                onClick={scrollToEditor}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Interactive Live Sandbox Included Below</span>
                <ArrowRight className="w-3 h-3" />
              </motion.div>

             
              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight"
              >
                The Ultimate Cloud Code Editor Built for <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Developers</span>
              </motion.h1>

              
              <motion.p
                variants={itemVariants}
                className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto font-sans leading-relaxed"
              >
                Write, test, and preview clean code in real-time. CodeCraft offers a fully responsive, blazing fast IDE right in your browser with offline compiler capabilities and stunning dark theme layouts.
              </motion.p>

             
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                {currentUser ? (
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-emerald-400 flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Currently Authenticated as <span className="font-bold text-white">{currentUser.username}</span>
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => navigate('/room') }
                        className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-medium text-sm transition-all duration-200 shadow-lg cursor-pointer"
                      >
                        Open Playground
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/signup')}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-indigo-900/30 hover:shadow-indigo-500/20 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      Start Coding Free
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={scrollToEditor}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Terminal className="w-4 h-4 text-indigo-400" />
                      Live Sandbox Preview
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          </section>

          
          <section id="editor-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">Try the Interactive Sandbox</h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                Experiment with actual code changes directly below! Feel free to modify the source code, switch tabs, select custom editor themes, and trigger the compilation output console.
              </p>
            </div>

          
            <InteractiveEditor />
          </section>

          
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-900/30 border border-slate-900/80 rounded-2xl p-6 text-center hover:border-indigo-500/20 transition-all group">
                  <div className="font-display text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 group-hover:to-indigo-300 bg-clip-text text-transparent mb-1 transition-all">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium tracking-wider uppercase font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">Engineered for Performance</h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                CodeCraft is optimized for modern web browsers, giving you a smooth editing experience without bloated IDE downloads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/40 border border-slate-900/80 p-6 rounded-2xl hover:bg-slate-900/60 hover:border-indigo-500/10 transition-all duration-300 flex flex-col gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:bg-slate-800 transition-colors">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-2 group-hover:text-indigo-300 transition-colors">{feat.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

         
          <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900 scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
              <p className="text-slate-400 text-sm">
                Everything you need to know about setting up your workspace.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-slate-900/30 border border-slate-900/80 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-medium text-white hover:text-indigo-400 transition-colors focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-400 text-sm leading-relaxed border-t border-slate-900/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          
          <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-slate-900">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center border border-slate-800">
                  <Code className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="font-semibold text-slate-400 font-sans">CodeCraft WebIDE</span>
              </div>
              <div>
                &copy; 2026 CodeCraft Inc. All simulated rights reserved.
              </div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                <a href="#" className="hover:text-slate-300">Terms of Service</a>
                <a href="#" className="hover:text-slate-300 flex items-center gap-0.5">
                  Source Code
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </footer>
        </div>
        </motion.div>
        </AnimatePresence>
        </main>
        </div>
        );
}

        export default Home;
