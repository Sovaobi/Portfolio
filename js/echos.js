document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('echoVideo');
// correspond à ton id
  const playPauseBtn = document.getElementById('playPauseBtn');
  const muteBtn = document.getElementById('muteBtn');
  const progressBar = document.getElementById('progressBar');
  const videoWrapper = document.querySelector('.video-wrapper');
  const controls = document.querySelector('.video-controls');

  let hideControlsTimeout;

  // Initialisation : vidéo muette pour autoplay
  video.muted = true;
  muteBtn.textContent = '🔇';

  // Affiche les contrôles et cache après 3s d'inactivité
  function showControls() {
    controls.classList.remove('hidden');
    resetHideTimeout();
  }

  function hideControls() {
    controls.classList.add('hidden');
  }

  function resetHideTimeout() {
    if (hideControlsTimeout) clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(hideControls, 3000);
  }

  // Montre contrôles au départ
  showControls();

  // Détecte mouvement souris sur la vidéo pour afficher les contrôles
  videoWrapper.addEventListener('mousemove', showControls);
  videoWrapper.addEventListener('mouseleave', hideControls);

  // Play / pause
  playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = '⏸️';
    } else {
      video.pause();
      playPauseBtn.textContent = '▶️';
    }
  });

  // Mute / unmute
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
  });

  // Mise à jour de la barre de progression
  video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100 || 0;
    progressBar.value = percent;
  });

  // Contrôle manuel du temps via la barre
  progressBar.addEventListener('input', () => {
    video.currentTime = (progressBar.value / 100) * video.duration;
  });

  // Essayer de lancer la vidéo automatiquement (muette)
  video.play().catch(() => {
    // L'autoplay peut être bloqué, l'utilisateur devra cliquer sur play
    playPauseBtn.textContent = '▶️';
  });
});
