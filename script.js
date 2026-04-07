const GITHUB_API = 'https://api.github.com/users/BoWalka/repos?per_page=100&sort=updated';

// Load repositories
async function loadRepos() {
  try {
    const response = await fetch(GITHUB_API);
    const repos = await response.json();
    // Skip the profile repo BoWalka
    const filteredRepos = repos.filter(repo => repo.name !== 'BoWalka');
    renderRepos(filteredRepos);
    // Live demos: repos with homepage
    const demos = filteredRepos.filter(repo => repo.homepage);
    renderDemos(demos);
  } catch (error) {
    console.error('Error loading repositories:', error);
    // Fallback or error message
    document.getElementById('repos-grid').innerHTML = '<p>Unable to load repositories. Please check back later.</p>';
    document.getElementById('demos-grid').innerHTML = '<p>Unable to load live demos.</p>';
  }
}

// Render all repositories
function renderRepos(repos) {
  const container = document.getElementById('repos-grid');
  container.innerHTML = repos.map(repo => `
    <div class="repo-card">
      <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
      <p>${repo.description || 'No description available'}</p>
      <div class="repo-meta">
        <span>Language: ${repo.language || 'N/A'}</span>
        <span>⭐ ${repo.stargazers_count}</span>
      </div>
      <div class="repo-meta">
        <span>Last updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      ${repo.homepage ? `<a href="${repo.homepage}" class="live-demo-btn" target="_blank">Live Demo →</a>` : ''}
    </div>
  `).join('');
}

// Render live demos
function renderDemos(demos) {
  const container = document.getElementById('demos-grid');
  if (demos.length === 0) {
    container.innerHTML = '<p>No live demos available at the moment.</p>';
    return;
  }
  container.innerHTML = demos.map(repo => `
    <div class="repo-card">
      <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
      <p>${repo.description || 'No description available'}</p>
      <div class="repo-meta">
        <span>Language: ${repo.language || 'N/A'}</span>
        <span>⭐ ${repo.stargazers_count}</span>
      </div>
      <div class="repo-meta">
        <span>Last updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      <a href="${repo.homepage}" class="live-demo-btn" target="_blank">Live Demo →</a>
    </div>
  `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadRepos();
});
