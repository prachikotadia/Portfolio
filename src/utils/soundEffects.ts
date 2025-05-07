
/**
 * Sound effects utility for interactive elements
 */

// Play a hover sound with volume control
export const playHoverSound = (volume = 0.1) => {
  const audio = new Audio('/sounds/hover.mp3');
  audio.volume = volume;
  audio.play().catch(e => console.log("Audio play prevented:", e));
};

// Play a click sound with volume control
export const playClickSound = (volume = 0.15) => {
  const audio = new Audio('/sounds/hover.mp3');
  audio.volume = volume;
  audio.play().catch(e => console.log("Audio play prevented:", e));
};

// Play a theme toggle sound
export const playThemeToggleSound = (isDark: boolean, volume = 0.2) => {
  const audio = new Audio(isDark ? '/sounds/dark-switch.mp3' : '/sounds/light-switch.mp3');
  audio.volume = volume;
  audio.play().catch(e => console.log("Audio play prevented:", e));
};

// Play a success sound effect
export const playSuccessSound = (volume = 0.15) => {
  const audio = new Audio('/sounds/success.mp3');
  audio.volume = volume;
  audio.play().catch(e => console.log("Audio play prevented:", e));
};

// Play an error sound effect
export const playErrorSound = (volume = 0.15) => {
  const audio = new Audio('/sounds/error.mp3');
  audio.volume = volume;
  audio.play().catch(e => console.log("Audio play prevented:", e));
};

// Play a notification sound
export const playNotificationSound = (volume = 0.15) => {
  const audio = new Audio('/sounds/notification.mp3');
  audio.volume = volume;
  audio.play().catch(e => console.log("Audio play prevented:", e));
};

// Play a page transition sound
export const playPageTransitionSound = (volume = 0.1) => {
  const audio = new Audio('/sounds/page-transition.mp3');
  audio.volume = volume;
  audio.play().catch(e => console.log("Audio play prevented:", e));
};

// Helper to create a sound manager with controllable settings
export const createSoundManager = () => {
  let isMuted = false;
  let masterVolume = 0.15;
  
  const setMuted = (muted: boolean) => {
    isMuted = muted;
    localStorage.setItem('sound-muted', muted ? 'true' : 'false');
  };
  
  const setVolume = (volume: number) => {
    masterVolume = Math.min(Math.max(volume, 0), 1);
    localStorage.setItem('sound-volume', masterVolume.toString());
  };
  
  const playSound = (src: string, volume = masterVolume) => {
    if (isMuted) return;
    const audio = new Audio(src);
    audio.volume = volume * masterVolume;
    audio.play().catch(e => console.log("Audio play prevented:", e));
  };
  
  // Load preferences from localStorage
  const initFromStorage = () => {
    const storedMuted = localStorage.getItem('sound-muted');
    if (storedMuted) {
      isMuted = storedMuted === 'true';
    }
    
    const storedVolume = localStorage.getItem('sound-volume');
    if (storedVolume) {
      masterVolume = parseFloat(storedVolume);
    }
  };
  
  initFromStorage();
  
  return {
    playHover: () => playSound('/sounds/hover.mp3', 0.1),
    playClick: () => playSound('/sounds/hover.mp3', 0.15),
    playThemeToggle: (isDark: boolean) => playSound(isDark ? '/sounds/dark-switch.mp3' : '/sounds/light-switch.mp3', 0.2),
    playSuccess: () => playSound('/sounds/success.mp3', 0.15),
    playError: () => playSound('/sounds/error.mp3', 0.15),
    playNotification: () => playSound('/sounds/notification.mp3', 0.15),
    playPageTransition: () => playSound('/sounds/page-transition.mp3', 0.1),
    isMuted,
    setMuted,
    setVolume,
    getVolume: () => masterVolume
  };
};

export default createSoundManager();
