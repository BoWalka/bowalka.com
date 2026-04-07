const GITHUB_API = 'https://api.github.com/users/BoWalka/repos?per_page=100&sort=updated';

// Simple language colors so each card looks different
const LANGUAGE_COLORS = {
  'Python': '#4B8BBE',
  'Java': '#B07219',
  'Shell': '#89E051',
  'JavaScript': '#F1E05A',
  'HTML': '#E34F26',
  'CSS': '#563D7C',
  'Kotlin': '#A97BFF',
  'default': '#8C8C8C'
};

// Load ONLY your original repos (no forks)
async function loadRepos() {
  try {
    const response = await fetch(GITHUB_API);
    const repos = await response.json();

    // 🔥 Only your own repos — no forks, no profile repo
    const myRepos = repos.filter(repo => 
      !repo.fork && repo.name !== 'BoWalka'
    );

    renderRepos(myRepos);
    renderDemos(myRepos.filter(repo => repo.homepage));
  } catch (error) {
    console.error('Error loading repos:', error);
    document.getElementById('repos-grid').innerHTML = '<p>Unable to load repositories right now. Please try again later.</p>';
    document.getElementById('demos-grid').innerHTML = '<p>No live demos yet.</p>';
  }
}

function renderRepos(repos) {
  const container = document.getElementById('repos-grid');
  container.innerHTML = repos.map(repo => {
    const langColor = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.default;
    return `
      <a href="${repo.html_url}" target="_blank" class="repo-card">
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description provided.'}</p>
        <div class="repo-meta">
          ${repo.language ? 
            `<span class="lang-badge" style="background-color: ${langColor}">${repo.language}</span>` : ''}
          <span>⭐ ${repo.stargazers_count}</span>
          <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </a>
    `;
  }).join('');
}

function renderDemos(demos) {
  const container = document.getElementById('demos-grid');
  if (demos.length === 0) {
    container.innerHTML = '<p>No live .io demos yet. More coming soon!</p>';
    return;
  }
  container.innerHTML = demos.map(repo => {
    const langColor = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.default;
    return `
      <a href="${repo.homepage}" target="_blank" class="repo-card demo-card">
        <h3>${repo.name}</h3>
        <p>${repo.description || 'Live demo of this project'}</p>
        <div class="repo-meta">
          ${repo.language ? 
            `<span class="lang-badge" style="background-color: ${langColor}">${repo.language}</span>` : ''}
          <span class="demo-badge">Open Live Demo →</span>
        </div>
      </a>
    `;
  }).join('');
}

// Run when page loads
document.addEventListener('DOMContentLoaded', loadRepos);
