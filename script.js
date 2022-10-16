const font_awesome_script = document.createElement('script');
font_awesome_script.src ='https://cdn.jsdelivr.net/gh/ViolaterZ/fontawesome/pro.js';
font_awesome_script.crossOrigin = 'anonymous';
document.body.append(font_awesome_script);

// Variables
const formatter = Intl.NumberFormat('en', { notation: 'compact' })
const card = document.querySelector('.github-card');
const user = card.getAttribute('data-user');
const stylesheet = document.createElement('link')

// #################################### //
// Stylesheet injector
if (card.getAttribute('data-style') === 'simple') {
    stylesheet.rel = 'stylesheet'
    stylesheet.href = 'https://cdn.jsdelivr.net/gh/ViolaterZ/github-cards@latest/style-simple.css';
    document.head.insertAdjacentElement('beforeend', stylesheet)
}
if (card.getAttribute('data-style') === 'default' || card.getAttribute('data-style') === null) {
    stylesheet.rel = 'stylesheet'
    stylesheet.href = 'https://cdn.jsdelivr.net/gh/ViolaterZ/github-cards@latest/style.css';
    document.head.append(stylesheet)
}
// #################################### //

// Get Data
(async () => {
    const data = await fetch(`https://api.github.com/users/${user}`).then(response => response.json())
    
    // Insert card HTML
    card.insertAdjacentHTML('beforeend', `
    <img src="${data.avatar_url}" alt="" class="github-card-img">
    <div class="github-card-data">
        <i class="fa-brands fa-github github-logo"></i>
        <p class="github-card-data-name">${data.name}</p>
        <p class="github-card-data-user">@${data.login}</p>
        <div class="github-card-data-row">
            <p class="github-card-data-text"><span class="github-card-data-followers github-card-data-data">${formatter.format(data.followers)}</span> Followers</p>
            <p class="github-card-data-text"><span class="github-card-data-repos github-card-data-data">${formatter.format(data.public_repos)}</span> Repos</p>
            <p class="github-card-data-text"><span class="github-card-data-gists github-card-data-data">${formatter.format(data.public_gists)}</span> Gists</p>
        </div>
        <p class="github-card-data-bio" onclick="${window.open(`https://github.com/${user}`)}">${data.bio}</p>
        <button class="github-card-follow-btn">Follow</button>
    </div>
    `)
    
    // Evenet Listeners
    const card_btn = document.querySelector('.github-card-follow-btn');
    const card_user = document.querySelector('.github-card-data-user');

    card_user.onclick = () => window.open(`https://github.com/${user}`)
    card_btn.onclick = () => window.open(`https://github.com/${user}`)
})()