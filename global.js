console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// step 2
// navLinks = $$("nav a");
// currentLink?.classList.add('current');

let pages = [
  {url: '', title: 'Home'},
  {url: 'projects/', title: 'Projects'},
  {url: 'resume/', title: 'Resume'},
  {url: 'contact/', title: 'Contact'}
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
}