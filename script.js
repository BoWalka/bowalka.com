const GITHUB_API = 'https://api.github.com/users/BoWalka/repos?per_page=100&sort=updated';

// Load ONLY your original repos — exclude everything you don't want shown
async function loadRepos() {
  try {
    const response = await fetch(GITHUB_API);
    const repos = await response.json();

    const myRepos = repos.filter(repo => 
      !repo.fork && 
      repo.name !== 'BoWalka' &&
      repo.name !== 'bowalka.com' &&               // ← removed
      repo.name !== 'privacy-policy' &&            // ← removed
      repo.name !== 'actions-learning-pathway'     // ← removed
    );

    renderRepos(myRepos);
    renderDemos(myRepos.filter(repo => repo.homepage));
  } catch (error) {
    console.error('Error loading repos:', error);
    document.getElementById('repos-grid').innerHTML = '<p>Unable to load repositories right now.</p>';
  }
}

// Uniform card layout — same style for repos AND demos
function createCard(repo, isDemo = false) {
  return `
    <a href="${isDemo ? repo.homepage : repo.html_url}" 
       target="_blank" 
       class="repo-card" 
       style="color: #ffffff !important; text-decoration: none !important; display: block;">
      <h2 style="font-size: 1.85rem; font-weight: 700; color: #ffffff !important; margin-bottom: 12px;">${repo.name}</h2>
      <p style="color: #e0e0e0 !important;">${repo.description || 'No description provided.'}</p>
      <div class="repo-meta" style="margin-top: 16px;">
        ${repo.language ? 
          `<span class="lang-badge" style="background-color: #00D4FF; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 0.9rem; font-weight: 600;">${repo.language}</span>` : ''}
        <span style="color: #ffffff !important;">⭐ ${repo.stargazers_count}</span>
        <span style="color: #e0e0e0 !important;">Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
        ${isDemo ? `<span class="demo-badge" style="color: #00D4FF; font-weight: 600;">Open Live Demo →</span>` : ''}
      </div>
    </a>
  `;
}

function renderRepos(repos) {
  const container = document.getElementById('repos-grid');
  container.innerHTML = repos.map(repo => createCard(repo, false)).join('');
}

function renderDemos(demos) {
  const container = document.getElementById('demos-grid');
  if (demos.length === 0) {
    container.innerHTML = '<p>No live .io demos yet. More coming soon!</p>';
    return;
  }
  container.innerHTML = demos.map(repo => createCard(repo, true)).join('');
}

// Run when page loads
document.addEventListener('DOMContentLoaded', loadRepos);
