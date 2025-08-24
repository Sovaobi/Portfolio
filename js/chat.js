document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('chatVideo');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const muteBtn = document.getElementById('muteBtn');
  const progressBar = document.getElementById('progressBar');

  // Assure que la barre de progression est bien initialisée
  progressBar.min = 0;
  progressBar.max = 100;
  progressBar.value = 0;

  // Bouton play/pause
  playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = '⏸️';
    } else {
      video.pause();
      playPauseBtn.textContent = '▶️';
    }
  });

  // Bouton mute/unmute
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
  });

  // Mise à jour de la barre de progression pendant la lecture
  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      const progressPercent = (video.currentTime / video.duration) * 100;
      progressBar.value = progressPercent;
    }
  });

  // Gérer la recherche via la barre de progression
  progressBar.addEventListener('input', () => {
    if (video.duration) {
      const seekTime = (progressBar.value / 100) * video.duration;
      video.currentTime = seekTime;
    }
  });

  // Quand la vidéo se termine, reset le bouton play
  video.addEventListener('ended', () => {
    playPauseBtn.textContent = '▶️';
  });
});
