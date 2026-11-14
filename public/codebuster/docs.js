for (const heading of document.querySelectorAll('.docs-content :is(h2, h3)')) {
  if (!heading.id) continue;
  const anchor = document.createElement('a');
  anchor.className = 'heading-anchor';
  anchor.href = `#${heading.id}`;
  anchor.setAttribute('aria-label', `Link to ${heading.textContent?.trim() ?? 'this section'}`);
  anchor.textContent = '#';
  heading.append(anchor);
}

for (const pre of document.querySelectorAll('.docs-content pre')) {
  pre.tabIndex = 0;
  pre.setAttribute('aria-label', 'Scrollable code example');

  const wrapper = document.createElement('div');
  wrapper.className = 'code-block';
  pre.before(wrapper);
  wrapper.append(pre);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-code';
  button.textContent = 'Copy';
  button.setAttribute('aria-label', 'Copy code example');
  wrapper.append(button);

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(pre.textContent ?? '');
      button.textContent = 'Copied';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(pre);
      selection?.removeAllRanges();
      selection?.addRange(range);
      button.textContent = 'Select';
    }
    window.setTimeout(() => {
      button.textContent = 'Copy';
    }, 1400);
  });
}

for (const table of document.querySelectorAll('.docs-content table')) {
  if (table.scrollWidth <= table.clientWidth) continue;
  table.tabIndex = 0;
  table.setAttribute('aria-label', 'Scrollable data table');
}
