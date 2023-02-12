const refs = {
  initiateContainer: document.querySelector('[data-hover]'),
  backdrop: document.querySelector('[data-model]'),
};

refs.initiateContainer.addEventListener('mouseenter', openModal);
refs.backdrop.addEventListener('mouseleave', handleClick);
// refs.initiateContainer.addEventListener('mouseleave', handleClick);

function openModal() {
  refs.backdrop.classList.add('active');
  window.addEventListener('click', handleClick);
  window.addEventListener('keydown', handleClick);
}

function handleClick(event) {
  if (
    !event?.target?.classList?.value?.includes('page-header_modal-list-item') ||
    event?.key === 'Escape'
  ) {
    refs.backdrop.classList.remove('active');
    window.removeEventListener('click', handleClick);
    window.removeEventListener('keydown', handleClick);
  }
}
