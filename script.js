const GITHUB_API = 'https://api.github.com/users/BoWalka/repos?per_page=100&sort=updated';

// Load ONLY your original repos (no forks)
async function loadRepos() {
  try {
    const response = await fetch(GITHUB_API);
    const repos = await response.json();

    // 🔥 Only show repos YOU created (skip forks + profile repo)
    const myRepos = repos.filter(repo => 
      !repo.fork && repo.name !== 'BoWalka'
    );

    renderRepos(myRepos);

    // Live demos (only repos that have a GitHub Pages homepage)
    const demos = myRepos.filter(repo => repo.homepage);
    renderDemos(demos);
  } catch (error) {
    console.error('Error loading repos:', error);
    document.getElementById('repos-grid').innerHTML = '<p>Unable to load repositories right now.</p>';
    document.getElementById('demos-grid').innerHTML = '<p>No live demos yet.</p>';
  }
}

// Build beautiful repo cards with avatar + full clickable link
function renderRepos(repos) {
  const container = document.getElementById('repos-grid');
  container.innerHTML = repos.map(repo => `
    <a href="${repo.html_url}" target="_blank" class="repo-card">
      <div class="repo-header">
        <img src="https://github.com/BoWalka.png" alt="Beau Walker" class="repo-avatar">
        <h3>${repo.name}</h3>
      </div>
      <p>${repo.description || 'No description provided.'}</p>
      <div class="repo-meta">
        ${repo.language ? `<span class="lang">${repo.language}</span>` : ''}
        <span>⭐ ${repo.stargazers_count}</span>
        <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      ${repo.homepage ? `<span class="demo-badge">Live Demo Available →</span>` : ''}
    </a>
  `).join('');
}

// Same style for Live Demos section
function renderDemos(demos) {
  const container = document.getElementById('demos-grid');
  if (demos.length === 0) {
    container.innerHTML = '<p>No live .io demos yet. More coming soon!</p>';
    return;
  }
  container.innerHTML = demos.map(repo => `
    <a href="${repo.homepage}" target="_blank" class="repo-card demo-card">
      <div class="repo-header">
        <img src="https://github.com/BoWalka.png" alt="Beau Walker" class="repo-avatar">
        <h3>${repo.name}</h3>
      </div>
      <p>${repo.description || 'Live demo of this project'}</p>
      <span class="demo-badge">Open Live Demo →</span>
    </a>
  `).join('');
}

// Auto-run when page loads
document.addEventListener('DOMContentLoaded', loadRepos);
