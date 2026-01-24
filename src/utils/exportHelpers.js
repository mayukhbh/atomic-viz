import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

/**
 * Capture a screenshot of the canvas element
 * @param {string} filename - Name for the downloaded file
 */
export const captureScreenshot = (filename = 'atomicviz') => {
  const canvas = document.querySelector('canvas');
  if (!canvas) {
    console.error('No canvas element found');
    return false;
  }

  try {
    const link = document.createElement('a');
    link.download = `${filename}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    return true;
  } catch (error) {
    console.error('Failed to capture screenshot:', error);
    return false;
  }
};

/**
 * Export the current 3D scene as a GLTF file
 * @param {THREE.Scene} scene - The Three.js scene to export
 * @param {string} filename - Name for the downloaded file
 */
export const exportGLTF = (scene, filename = 'atomicviz-model') => {
  if (!scene) {
    console.error('No scene provided for export');
    return Promise.reject(new Error('No scene provided'));
  }

  const exporter = new GLTFExporter();

  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (gltf) => {
        const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}-${Date.now()}.gltf`;
        link.click();
        URL.revokeObjectURL(link.href);
        resolve(true);
      },
      (error) => {
        console.error('GLTF export error:', error);
        reject(error);
      },
      { binary: false }
    );
  });
};

/**
 * Export scene as binary GLB format (more compact)
 * @param {THREE.Scene} scene - The Three.js scene to export
 * @param {string} filename - Name for the downloaded file
 */
export const exportGLB = (scene, filename = 'atomicviz-model') => {
  if (!scene) {
    console.error('No scene provided for export');
    return Promise.reject(new Error('No scene provided'));
  }

  const exporter = new GLTFExporter();

  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (glb) => {
        const blob = new Blob([glb], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}-${Date.now()}.glb`;
        link.click();
        URL.revokeObjectURL(link.href);
        resolve(true);
      },
      (error) => {
        console.error('GLB export error:', error);
        reject(error);
      },
      { binary: true }
    );
  });
};

/**
 * Generate embed code for the visualization
 * @param {Object} config - Configuration for the embed
 * @param {string} config.element - Element symbol
 * @param {string} config.view - View mode (atom, reaction, etc.)
 * @param {string} config.reaction - Reaction ID (if applicable)
 * @param {number} config.width - Embed width
 * @param {number} config.height - Embed height
 * @returns {string} HTML embed code
 */
export const generateEmbedCode = (config = {}) => {
  const {
    element = 'H',
    view = 'atom',
    reaction = 'water-formation',
    width = 600,
    height = 400,
    baseUrl = 'https://atomicviz.app'
  } = config;

  const params = new URLSearchParams();
  params.set('view', view);

  if (view === 'atom') {
    params.set('element', element);
  } else if (view === 'reaction') {
    params.set('reaction', reaction);
  }

  return `<iframe
  src="${baseUrl}/embed?${params.toString()}"
  width="${width}"
  height="${height}"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
  allowfullscreen
  title="AtomicViz - Interactive Chemistry Visualization">
</iframe>`;
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (fallbackError) {
      console.error('Failed to copy to clipboard:', fallbackError);
      return false;
    }
  }
};

/**
 * Download a text file
 * @param {string} content - File content
 * @param {string} filename - Name for the file
 * @param {string} mimeType - MIME type
 */
export const downloadTextFile = (content, filename, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

/**
 * Export reaction data as JSON
 * @param {Object} reaction - Reaction data
 * @param {string} filename - Name for the file
 */
export const exportReactionData = (reaction, filename = 'reaction') => {
  const data = JSON.stringify(reaction, null, 2);
  downloadTextFile(data, `${filename}-${Date.now()}.json`, 'application/json');
};
