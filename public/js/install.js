(() => {
  let installPrompt = null;
  const buttons = document.querySelectorAll('[data-install-app]');

  function hideButtons() {
    buttons.forEach(button => { button.hidden = true; });
  }

  window.addEventListener('beforeinstallprompt', event => {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    // Keep Chrome's own install promotion on pages without an install button.
    if (!buttons.length) return;
    event.preventDefault();
    installPrompt = event;
    buttons.forEach(button => { button.hidden = false; });
  });

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      if (!installPrompt) return;
      const prompt = installPrompt;
      installPrompt = null;
      hideButtons();
      try {
        await prompt.prompt();
        await prompt.userChoice;
      } catch (error) {
        console.warn('Unable to show the app installation prompt.', error);
      }
    });
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    hideButtons();
  });
})();
