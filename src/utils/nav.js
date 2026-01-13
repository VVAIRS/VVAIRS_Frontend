export function isIndexPage() {
  try {
    const p = (window.location.pathname || '').toLowerCase();
    return p.endsWith('/') || p.endsWith('/index.html') || p.endsWith('index.html') || (!p.includes('.html'));
  } catch (error) {
    console.error('isIndexPage error:', error);
    return true;
  }
}

export function navigateToSection(sectionId) {
  try {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.location.href = `index.html#${sectionId}`;
  } catch (error) {
    console.error('navigateToSection error:', error);
  }
}

export function navigateToHref(href) {
  try {
    if (!href) return;

    const isHash = href.startsWith('#');
    const hasIndexHash = href.startsWith('index.html#');

    if (isHash) {
      navigateToSection(href.replace('#', ''));
      return;
    }

    if (hasIndexHash) {
      const id = href.split('#')[1];
      if (!id) {
        window.location.href = 'index.html';
        return;
      }
      navigateToSection(id);
      return;
    }

    window.location.href = href;
  } catch (error) {
    console.error('navigateToHref error:', error);
  }
}