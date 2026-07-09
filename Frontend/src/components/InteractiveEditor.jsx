import React, { useState } from 'react';
import { 
  Play, 
  Terminal, 
  FileCode, 
  Check, 
  RefreshCw, 
  ChevronRight, 
  Code2, 
  Copy, 
  Settings as SettingsIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fixed the syntax error and converted to standard JS Object literal
const SNIPPETS = {
  'App.jsx': {
    name: 'App.jsx',
    language: 'javascript',
    code: `import React, { useState } from 'react';\n\nconst App = () => {\n  const [val, setVal] = useState('Hello World');\n  return <h1>{val}</h1>;\n};\nexport default App;`,
    output: 'App rendered successfully without warnings.'
  }
};

const THEMES = {
  'one-dark': {
    name: 'One Dark Pro',
    bg: 'bg-[#282c34]',
    text: 'text-[#abb2bf]',
    sidebar: 'bg-[#21252b]',
    accent: '#61afef',
    comment: 'text-[#5c6370] italic',
    keyword: 'text-[#c678dd]',
    string: 'text-[#98c379]',
    function: 'text-[#61afef]',
    number: 'text-[#d19a66]'
  },
  'dracula': {
    name: 'Dracula',
    bg: 'bg-[#282a36]',
    text: 'text-[#f8f8f2]',
    sidebar: 'bg-[#191a21]',
    accent: '#bd93f9',
    comment: 'text-[#6272a4] italic',
    keyword: 'text-[#ff79c6]',
    string: 'text-[#f1fa8c]',
    function: 'text-[#50fa7b]',
    number: 'text-[#bd93f9]'
  },
  'nord': {
    name: 'Nord Night',
    bg: 'bg-[#2e3440]',
    text: 'text-[#d8dee9]',
    sidebar: 'bg-[#242933]',
    accent: '#88c0d0',
    comment: 'text-[#4c566a] italic',
    keyword: 'text-[#81a1c1]',
    string: 'text-[#a3be8c]',
    function: 'text-[#8fbcbb]',
    number: 'text-[#b48ead]'
  }
};

export default function InteractiveEditor() {
  const [activeTab, setActiveTab] = useState('App.jsx');
  const [files, setFiles] = useState(SNIPPETS);
  const [currentTheme, setCurrentTheme] = useState('one-dark');
  const [fontSize, setFontSize] = useState(14);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('Console is ready. Press "Run Code" above to execute.');
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const activeFile = files[activeTab];
  const theme = THEMES[currentTheme];

  const handleCodeChange = (e) => {
    const updatedCode = e.target.value;
    setFiles(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        code: updatedCode
      }
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTerminalOutput('Compiling compiler core... \nLinking libraries... \nSpawning Sandboxed VM context...');
    
    setTimeout(() => {
      setTerminalOutput(prev => prev + '\nExecuting entry-point file: ' + activeFile.name + '...\n\n');
      setTimeout(() => {
        setTerminalOutput(activeFile.output);
        setIsRunning(false);
      }, 1000);
    }, 800);
  };

  // Removed unused lang parameter and types
  const highlightCode = (code) => {
    const lines = code.split('\n');
    return lines.map((line, idx) => {
      let highlighted = line;
      
      const keywords = ['import', 'from', 'const', 'let', 'function', 'return', 'interface', 'export', 'default', 'def', 'if', 'print', 'new'];
      keywords.forEach((kw) => {
        const regex = new RegExp(`\\b${kw}\\b`, 'g');
        highlighted = highlighted.replace(
          regex,
          `<span class="${theme.keyword}">${kw}</span>`
        );
      });

      highlighted = highlighted.replace(/(["'`])(.*?)\1/g, `<span class="${theme.string}">$1$2$1</span>`);

      if (highlighted.trim().startsWith('//') || highlighted.trim().startsWith('#')) {
        highlighted = `<span class="${theme.comment}">${line}</span>`;
      }

      return (
        <div key={idx} className="flex leading-6 text-sm" style={{ fontSize: `${fontSize}px` }}>
          <span className="w-8 select-none text-right pr-4 text-slate-600 font-mono text-xs pt-1">{idx + 1}</span>
          <pre className="font-mono flex-1 whitespace-pre-wrap select-text" dangerouslySetInnerHTML={{ __html: highlighted || ' ' }} />
        </div>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 font-sans flex flex-col h-[520px]">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-3">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-mono text-xs mr-4 border-r border-slate-800 pr-4">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span>WebIDE Cloud</span>
          </div>
          {/* File Tabs */}
          <div className="flex items-center gap-1">
            {Object.keys(files).map(fileName => {
              const file = files[fileName];
              const isActive = activeTab === fileName;
              return (
                <button
                  key={fileName}
                  onClick={() => setActiveTab(fileName)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-mono text-xs transition-all duration-200 ${
                    isActive 
                      ? 'bg-slate-800 text-white border-t border-indigo-500' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 ${
                    file.language === 'javascript' ? 'text-blue-400' : 'text-amber-400'
                  }`} />
                  {file.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-md transition-all relative"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1.5 hover:bg-slate-800 rounded-md transition-all ${showSettings ? 'text-indigo-400 bg-slate-800' : 'text-slate-400 hover:text-slate-200'}`}
            title="Editor Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800/80 disabled:text-emerald-400 text-white font-medium text-xs rounded-md shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
          >
            {isRunning ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            Run Code
          </button>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="flex flex-1 relative overflow-hidden">
        <AnimatePresence>
          {showSettings && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="h-full bg-slate-900 border-r border-slate-800 flex flex-col justify-between overflow-hidden z-20 shrink-0"
            >
              <div className="p-4 space-y-4">
                <h3 className="text-slate-300 font-semibold text-xs uppercase tracking-wider">Editor Settings</h3>
                
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs">Visual Theme</label>
                  <select 
                    value={currentTheme}
                    onChange={(e) => setCurrentTheme(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 text-xs rounded border border-slate-700 p-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="one-dark">One Dark Pro</option>
                    <option value="dracula">Dracula Dark</option>
                    <option value="nord">Nord Night</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs">Font Size</label>
                    <span className="text-slate-500 text-xs">{fontSize}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="12" 
                    max="18" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-950 h-1 rounded"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Code and Input panel */}
        <div className="flex-1 flex flex-col relative h-full">
          <div className={`flex-1 overflow-auto relative p-4 font-mono ${theme.bg} ${theme.text}`}>
            {/* Kept left alignment padding matching the textarea line numbers spacing constraint */}
            <div className="absolute inset-0 p-4 pointer-events-none select-none z-0 pl-[3.5rem]">
              {highlightCode(activeFile.code)}
            </div>

            <textarea
              value={activeFile.code}
              onChange={handleCodeChange}
              spellCheck={false}
              className="absolute inset-0 w-full h-full p-4 font-mono text-transparent bg-transparent resize-none outline-none caret-white z-10 overflow-auto border-0 focus:ring-0 whitespace-pre selection:bg-indigo-500/30 selection:text-transparent"
              style={{ 
                fontSize: `${fontSize}px`, 
                lineHeight: '1.5rem',
                fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
                paddingLeft: '3.5rem'
              }}
            />
          </div>

          {/* Simulated Terminal output */}
          <div className="h-44 bg-slate-950 border-t border-slate-800 flex flex-col font-mono">
            <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900 border-b border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Console Output</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Local Sandbox VM</span>
              </div>
            </div>

            <div className="flex-1 p-3 overflow-auto text-slate-300 text-xs font-mono space-y-1">
              <div className="text-slate-500 flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                <span>sandbox-kernel-v16.1 --env=v8</span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed text-indigo-300">
                {terminalOutput}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}