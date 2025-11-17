// Mock data for Deepfake Detector
export const mockAnalyzes = {
  'analysis-001': {
    id: 'analysis-001',
    label: 'fake',
    confidence: 92,
    isVideo: false,
    details: {
      lightingMismatch: true,
      pixelNoise: true,
      facialWarp: true,
      compressionArtifacts: false
    }
  },
  'analysis-002': {
    id: 'analysis-002',
    label: 'real',
    confidence: 88,
    isVideo: true,
    details: {
      lightingMismatch: false,
      pixelNoise: false,
      facialWarp: false,
      compressionArtifacts: true,
      lipSyncAccuracy: true,
      skinTextureArtifacts: false
    }
  }
};

export const mockForensics = {
  'analysis-001': [
    {
      name: 'Lighting Consistency',
      status: 'Suspicious',
      severity: 'High',
      description: 'Irregular lighting patterns detected around facial contours. Light source appears inconsistent with environmental lighting.'
    },
    {
      name: 'Shadow Behavior',
      status: 'Fake',
      severity: 'High',
      description: 'Shadow patterns do not match natural light falloff. Chromatic aberrations in shadow edges suggest generative synthesis.'
    },
    {
      name: 'Facial Landmark Distortion',
      status: 'Suspicious',
      severity: 'Medium',
      description: 'Subtle warping detected in eye/nose region. Landmarks show geometric inconsistencies typical of GAN morphing.'
    },
    {
      name: 'Eye Reflection Consistency',
      status: 'Suspicious',
      severity: 'Medium',
      description: 'Eye reflections lack natural variability. Cataracts show identical patterns, indicating synthetic generation.'
    },
    {
      name: 'Skin Texture Artifacts',
      status: 'Fake',
      severity: 'High',
      description: 'Skin texture shows GAN fingerprint patterns in pore distribution and blemish placement.'
    },
    {
      name: 'AI Model Fingerprint',
      status: 'Fake',
      severity: 'Critical',
      description: 'Multiple CNN/GAN signatures detected. Model likely trained on StyleGAN architecture with compression artifacts.'
    }
  ],
  'analysis-002': [
    {
      name: 'Lighting Consistency',
      status: 'Real',
      severity: 'Low',
      description: 'Natural lighting patterns consistent with environmental conditions.'
    },
    {
      name: 'Shadow Behavior',
      status: 'Real',
      severity: 'Low',
      description: 'Shadow behavior matches natural physics and light sources.'
    },
    {
      name: 'Facial Landmark Distortion',
      status: 'Real',
      severity: 'Low',
      description: 'Facial landmarks show natural variability within expected ranges.'
    },
    {
      name: 'Eye Reflection Consistency',
      status: 'Real',
      severity: 'Low',
      description: 'Eye reflections show natural variability consistent with real optics.'
    },
    {
      name: 'Lip Sync Accuracy',
      status: 'Real',
      severity: 'Low',
      description: 'Audio-visual synchronization within acceptable tolerances for natural speech.'
    },
    {
      name: 'Skin Texture Artifacts',
      status: 'Real',
      severity: 'Low',
      description: 'Skin texture shows natural biological characteristics without synthetic patterns.'
    },
    {
      name: 'AI Model Fingerprint',
      status: 'Real',
      severity: 'Low',
      description: 'No detectable AI model signatures found in compression or pattern analysis.'
    }
  ]
};

export const mockFrames = {
  'analysis-001': {
    frames: [
      { index: 0, url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', sus: false },
      { index: 1, url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', sus: true },
      { index: 2, url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', sus: false },
      { index: 3, url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', sus: true }
    ]
  },
  'analysis-002': {
    frames: [
      { index: 0, url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', sus: false },
      { index: 1, url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', sus: false },
      { index: 2, url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', sus: false },
      { index: 3, url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', sus: false }
    ]
  }
};

export const mockTimelines = {
  'analysis-001': [
    { time: '00:02', event: 'Irregular blinking pattern detected', severity: 'Medium', description: 'Blink frequency outside normal range for humans.' },
    { time: '00:05', event: 'GAN texture detected around jawline', severity: 'High', description: 'Synthetic texture patterns consistent with GAN generation.' },
    { time: '00:07', event: 'Lip-sync mismatch with audio waveform', severity: 'High', description: 'Audio-visual synchronization error detected.' },
    { time: '00:11', event: 'Identity morphing in facial features', severity: 'Critical', description: 'Face geometry changes inconsistent with natural movement.' }
  ],
  'analysis-002': [
    { time: '00:03', event: 'Natural eye blink pattern', severity: 'Low', description: 'Blinking within expected human range.' },
    { time: '00:06', event: 'Consistent facial geometry', severity: 'Low', description: 'Natural facial proportions maintained.' }
  ]
};

export const mockExplanations = {
  'analysis-001': 'This content shows multiple signs of deepfake manipulation. The facial region exhibits characteristic GAN fingerprinting around the jawline and eyes, where the artificial intelligence model leaves detectable mathematical signatures. Lighting inconsistencies reveal that the face was likely composited from different sources, while eye reflections lack the natural randomness of real-world optics. The skin texture shows unnatural regularity typical of computer-generated imagery.',
  'analysis-002': 'This appears to be authentic content. Analysis shows natural human characteristics including proper eye behavior, consistent lighting, and organic skin texture. No significant markers of deepfake generation were detected.'
};

export const deepfakeRecommendations = [
  'Do not trust this source without secondary verification. Cross-reference with known authentic sources.',
  'Verify identity through multiple channels. Use video calls or third-party confirmations.',
  'Check for upload time discrepancies between announced events and media timestamps.',
  'Look for official confirmations from reputable news agencies or primary sources.',
  'Examine metadata for manipulation traces and source authenticity.',
  'Consider forensic audio analysis if video contains speech content.'
];
