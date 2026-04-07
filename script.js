const GITHUB_API = 'https://api.github.com/users/BoWalka/repos?per_page=100&sort=updated';

// Only your original repos (no forks, no profile repo)
async function loadRepos() {
  try {
    const response = await fetch(GITHUB_API);
    const repos = await response.json();

    const myRepos = repos.filter(repo => 
      !repo.fork && repo.name !== 'BoWalka'
    );

    renderRepos(myRepos);
    renderDemos(myRepos.filter(repo => repo.homepage));
  } catch (error) {
    console.error('Error loading repos:', error);
    document.getElementById('repos-grid').innerHTML = '<p>Unable to load repositories right now.</p>';
  }
}

// Clean cards: ONLY large bold white repo name as header + no avatar
function renderRepos(repos) {
  const container = document.getElementById('repos-grid');
  container.innerHTML = repos.map(repo => `
    <a href="${repo.html_url}" target="_blank" class="repo-card">
      <h2 style="font-size: 1.75rem; font-weight: 700; color: #ffffff; margin-bottom: 12px;">${repo.name}</h2>
      <p style="color: #e0e0e0;">${repo.description || 'No description provided.'}</p>
      <div class="repo-meta" style="margin-top: 16px;">
        ${repo.language ? 
          `<span class="lang-badge" style="background-color: #00D4FF; color: #ffffff; padding: 4px 10px; border-radius: 9999px; font-size: 0.9rem; font-weight: 600;">${repo.language}</span>` : ''}
        <span style="color: #ffffff;">⭐ ${repo.stargazers_count}</span>
        <span style="color: #e0e0e0;">Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </a>
  `).join('');
}

// Same clean style for Live Demos
function renderDemos(demos) {
  const container = document.getElementById('demos-grid');
  if (demos.length === 0) {
    container.innerHTML = '<p>No live .io demos yet. More coming soon!</p>';
    return;
  }
  container.innerHTML = demos.map(repo => `
    <a href="${repo.homepage}" target="_blank" class="repo-card demo-card">
      <h2 style="font-size: 1.75rem; font-weight: 700; color: #ffffff; margin-bottom: 12px;">${repo.name}</h2>
      <p style="color: #e0e0e0;">${repo.description || 'Live demo of this project'}</p>
      <div class="repo-meta" style="margin-top: 16px;">
        ${repo.language ? 
          `<span class="lang-badge" style="background-color: #00D4FF; color: #ffffff; padding: 4px 10px; border-radius: 9999px; font-size: 0.9rem; font-weight: 600;">${repo.language}</span>` : ''}
        <span class="demo-badge" style="color: #ffffff;">Open Live Demo →</span>
      </div>
    </a>
  `).join('');
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadRepos);
