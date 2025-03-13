export function initializeSidebar() {
  const dropdownButtons = document.querySelectorAll('[data-dropdown]');
  dropdownButtons.forEach(button => {
    button.addEventListener('click', () => {
      const dropdownMenu = button.nextElementSibling;
      const chevronIcon = button.querySelector('.bi-chevron-down');
      const textElement = button.querySelector('span');
      dropdownMenu.classList.toggle('hidden');
      chevronIcon.classList.toggle('rotate-90');
      chevronIcon.classList.toggle('rotate-0');
      textElement.classList.toggle('font-bold');
    });
  });

  return () => {
    // Cleanup event listeners
    dropdownButtons.forEach(button => {
      button.removeEventListener('click', () => {
        const dropdownMenu = button.nextElementSibling;
        const chevronIcon = button.querySelector('.bi-chevron-down');
        const textElement = button.querySelector('span');
        dropdownMenu.classList.toggle('hidden');
        chevronIcon.classList.toggle('rotate-90');
        chevronIcon.classList.toggle('rotate-0');
        textElement.classList.toggle('font-bold');
      });
    });
  };
}