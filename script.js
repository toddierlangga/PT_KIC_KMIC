const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
let selectedLocation = droneLocations[0];
let selectedPhoto = 0;
const droneDialog = document.querySelector('#drone-dialog');
function renderDronePhoto() {
 const photo = selectedLocation.photos[selectedPhoto];
 const label = `${selectedLocation.title} — photo ${selectedPhoto + 1}`;
 document.querySelector('#drone-title').textContent = selectedLocation.title;
 const img = document.querySelector('#drone-photo'); img.src = photo.src; img.alt = label;
 document.querySelector('#drone-count').textContent = `${selectedPhoto + 1} / ${selectedLocation.photos.length}`;
 document.querySelector('#drone-caption').textContent = `Source: PT KIC drone survey report, page ${photo.page}.`;
 document.querySelector('#drone-dialog-title').textContent = selectedLocation.title;
 const large = document.querySelector('#drone-large'); large.src = photo.src; large.alt = label;
 document.querySelector('#large-count').textContent = `${selectedPhoto + 1} / ${selectedLocation.photos.length}`;
 const thumbs = document.querySelector('#drone-thumbnails'); thumbs.replaceChildren();
 selectedLocation.photos.forEach((p, index) => {
  const button = document.createElement('button'); button.setAttribute('aria-label', `Show photo ${index + 1} of ${selectedLocation.title}`); button.setAttribute('aria-pressed', String(index === selectedPhoto));
  const thumb = document.createElement('img'); thumb.src = p.src; thumb.alt = ''; thumb.loading = 'lazy'; button.append(thumb);
  button.addEventListener('click', () => { selectedPhoto = index; renderDronePhoto(); document.querySelector('#drone-thumbnails').children[index].focus({preventScroll:true}); }); thumbs.append(button);
 });
}
function selectDroneLocation(id) {
 const location = droneLocations.find(item => item.id === id); if (!location) return;
 if (location !== selectedLocation) { selectedLocation = location; selectedPhoto = 0; }
 document.querySelectorAll('[data-location]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.location === id)));
 renderDronePhoto();
}
document.querySelectorAll('[data-location]').forEach(button => {
 button.addEventListener('click', () => selectDroneLocation(button.dataset.location));
 button.addEventListener('focus', () => selectDroneLocation(button.dataset.location));
 button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') selectDroneLocation(button.dataset.location); });
});
function stepPhoto(direction) { selectedPhoto = (selectedPhoto + direction + selectedLocation.photos.length) % selectedLocation.photos.length; renderDronePhoto(); }
['drone-prev', 'large-prev'].forEach(id => document.getElementById(id).addEventListener('click', () => stepPhoto(-1)));
['drone-next', 'large-next'].forEach(id => document.getElementById(id).addEventListener('click', () => stepPhoto(1)));
document.querySelector('#drone-expand').addEventListener('click', () => droneDialog.showModal());
document.querySelector('#drone-close').addEventListener('click', () => droneDialog.close());
droneDialog.addEventListener('click', event => { if (event.target === droneDialog) { const r=droneDialog.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) droneDialog.close(); } });
droneDialog.addEventListener('keydown', event => { if (event.key === 'ArrowRight') { event.preventDefault(); stepPhoto(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); stepPhoto(-1); } });
selectDroneLocation(selectedLocation.id);
