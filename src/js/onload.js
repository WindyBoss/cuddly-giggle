const refs = {
  body: document.querySelector('body'),
};

function onload() {
  setTimeout(() => {
    refs.body.classList.add('loaded');
  }, 200);
}

window.onload = function () {
  onload();
};

refs.body.addEventListener('beforeunload', () => {
  refs.body.classList.remove('loaded');
});
