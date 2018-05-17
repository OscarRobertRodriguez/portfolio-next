const historyBar = document.getElementById('history');

historyBar.addEventListener('click', e => {
  const target = e.currentTarget;
  const arrow = target.firstChild.nextSibling;
  arrow.classList.toggle('arrow-twist');
  target.classList.toggle('history-expand');
});
