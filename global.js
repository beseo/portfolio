console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
// step 2
// navLinks = $$("nav a");
// currentLink?.classList.add('current');


// const isPages = window.location.hostname.includes('github.io');
// const baseUrl = isPages ? '/portfolio/' : '/';

// document.querySelector('base').setAttribute('href', baseUrl);
// let repoName = '/portfolio/';
let pages = [
  {url: '', title: 'Home'},
  {url: 'projects', title: 'Projects'},
  {url: 'resume', title: 'Resume'},
  {url: 'contact', title: 'Contact'},
  {url: 'https://github.com/beseo', title: 'GitHub'}
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  const ARE_WE_HOME = document.documentElement.classList.contains('home');
  if (!ARE_WE_HOME && !url.startsWith('http')) {
    url = '../' + url;
  }

  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }
  if (a.host != location.host) {
    a.target = "_blank";
  }

  nav.append(a);

}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			    <option value="light dark">Automatic</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
		</select>
	</label>`
);


let select = document.querySelector('select');
if ("colorScheme" in localStorage) {
  document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
  select.value = localStorage.colorScheme;
}
select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);
  document.documentElement.style.setProperty('color-scheme', event.target.value);

  localStorage.colorScheme = event.target.value;
});

export async function fetchJSON(url) {
  try {
      // Fetch the JSON file from the given URL

      const response = await fetch(url);
      
      if (!response.ok) {

        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(project, containerElement, headingLevel = 'h2') {

  containerElement.innerHTML = '';
  for (let p of project) {
    const article = document.createElement('article');

    article.innerHTML = `
      <h3>${p.title}</h3>
      <img src="${p.image}" alt="${p.title}">
      <p>${p.description}</p>
    `;  
  
    containerElement.appendChild(article);
  }

}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}

