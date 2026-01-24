import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Camera, Download, Code, Copy, Check, FileDown, Box } from 'lucide-react';
import { captureScreenshot, generateEmbedCode, copyToClipboard } from '../../utils/exportHelpers';

export const ExportPanel = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);

  const handleScreenshot = () => {
    setExportStatus('capturing');
    const success = captureScreenshot('atomicviz');
    setExportStatus(success ? 'success' : 'error');
    setTimeout(() => setExportStatus(null), 2000);
  };

  const handleExport3D = async () => {
    setExportStatus('exporting');
    // For now, we'll just capture a screenshot since GLTF export requires scene access
    // In a full implementation, this would use the scene from a context or ref
    const canvas = document.querySelector('canvas');
    if (canvas) {
      try {
        // Create a simple JSON representation of the current view
        const link = document.createElement('a');
        link.download = `atomicviz-model-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        setExportStatus('success');
      } catch (error) {
        console.error('Export failed:', error);
        setExportStatus('error');
      }
    } else {
      setExportStatus('error');
    }
    setTimeout(() => setExportStatus(null), 2000);
  };

  const handleCopyEmbed = async () => {
    const embedCode = generateEmbedCode({
      view: 'atom',
      element: 'H',
      width: 600,
      height: 400
    });

    const success = await copyToClipboard(embedCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const embedCode = generateEmbedCode({
    view: 'atom',
    element: 'H',
    width: 600,
    height: 400
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute bottom-8 right-8 w-80 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl text-white p-6 pointer-events-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <FileDown size={20} className="text-green-400" />
          Export Options
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {/* Screenshot Button */}
        <button
          onClick={handleScreenshot}
          disabled={exportStatus === 'capturing'}
          className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-3 group"
        >
          <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
            <Camera size={20} className="text-cyan-400" />
          </div>
          <div className="text-left">
            <div className="font-medium">Screenshot (PNG)</div>
            <div className="text-xs text-white/50">High-resolution image capture</div>
          </div>
        </button>

        {/* 3D Export Button */}
        <button
          onClick={handleExport3D}
          disabled={exportStatus === 'exporting'}
          className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-3 group"
        >
          <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
            <Box size={20} className="text-purple-400" />
          </div>
          <div className="text-left">
            <div className="font-medium">3D Model (HD PNG)</div>
            <div className="text-xs text-white/50">High-quality capture for 3D work</div>
          </div>
        </button>

        {/* Embed Code Section */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Code size={18} className="text-green-400" />
              <span className="font-medium">Embed Code</span>
            </div>
            <button
              onClick={handleCopyEmbed}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-all ${
                copied
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-white/10 hover:bg-white/20 text-white/70'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs text-white/50 bg-black/30 p-3 rounded-lg overflow-x-auto max-h-32">
            {embedCode}
          </pre>
        </div>
      </div>

      {/* Status indicator */}
      {exportStatus && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`mt-4 p-3 rounded-lg text-center text-sm ${
            exportStatus === 'success'
              ? 'bg-green-500/20 text-green-400'
              : exportStatus === 'error'
              ? 'bg-red-500/20 text-red-400'
              : 'bg-cyan-500/20 text-cyan-400'
          }`}
        >
          {exportStatus === 'success' && 'Export completed successfully!'}
          {exportStatus === 'error' && 'Export failed. Please try again.'}
          {exportStatus === 'capturing' && 'Capturing screenshot...'}
          {exportStatus === 'exporting' && 'Exporting 3D model...'}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExportPanel;
