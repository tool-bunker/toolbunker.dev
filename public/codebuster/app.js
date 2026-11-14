const switcher = document.querySelector('.install-switcher');

if (switcher) {
  const tabs = [...switcher.querySelectorAll('[role="tab"]')];
  const code = switcher.querySelector('.install-command code');
  const panel = switcher.querySelector('[role="tabpanel"]');
  const note = switcher.querySelector('.install-note');
  const copy = switcher.querySelector('.copy-install');

  const select = (tab) => {
    for (const candidate of tabs) {
      const selected = candidate === tab;
      candidate.setAttribute('aria-selected', String(selected));
      candidate.tabIndex = selected ? 0 : -1;
    }
    code.textContent = tab.dataset.command ?? '';
    note.textContent = tab.dataset.note ?? '';
    panel.setAttribute('aria-labelledby', tab.id);
  };

  for (const tab of tabs) {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowLeft') {
        next = tabs[(tabs.indexOf(tab) - 1 + tabs.length) % tabs.length];
      } else if (event.key === 'ArrowRight') {
        next = tabs[(tabs.indexOf(tab) + 1) % tabs.length];
      } else if (event.key === 'Home') {
        next = tabs[0];
      } else if (event.key === 'End') {
        next = tabs[tabs.length - 1];
      } else {
        return;
      }
      event.preventDefault();
      select(next);
      next.focus();
    });
  }

  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent ?? '');
      copy.textContent = 'Copied';
    } catch {
      copy.textContent = 'Select';
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    window.setTimeout(() => {
      copy.textContent = 'Copy';
    }, 1400);
  });
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12 },
  );
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('is-visible'));
}
