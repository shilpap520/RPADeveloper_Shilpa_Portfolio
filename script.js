
// ============================================================
// Tab switching — no dependencies, no build step.
// Works by matching each nav [data-tab] button to a panel with
// the same id.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.node[data-tab]');
  const panels = document.querySelectorAll('.tab-panel');

  function activateTab(tabId) {
    nodes.forEach(node => {
      const isActive = node.dataset.tab === tabId;
      node.classList.toggle('active', isActive);
      node.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === tabId);
    });

    // Reflect the active tab in the URL hash so it's linkable/bookmarkable
    history.replaceState(null, '', `#${tabId}`);
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => activateTab(node.dataset.tab));
  });

  // Open directly to a tab if the URL already has a hash, e.g. yoursite.com/#projects
  // Otherwise default to "skills" (change this string to set a different default tab).
  const validTabs = Array.from(nodes).map(n => n.dataset.tab);
  const initial = window.location.hash.replace('#', '') || 'skills';
  if (validTabs.includes(initial)) {
    activateTab(initial);
  }
});
