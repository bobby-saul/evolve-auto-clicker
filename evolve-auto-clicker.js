console.log('Adding Evolve Auto Clicker');
// Initial variables
window.evolveAutoClicker = {};
evolveAutoClicker.TIME = 25;
evolveAutoClicker.CLICK_FOOD = true;
evolveAutoClicker.CLICK_LUMBER = true;
evolveAutoClicker.CLICK_STONE = true;
evolveAutoClicker.LAST_RUN_TIME = Date.now();
// Interval
evolveAutoClicker.interval = setInterval(() => {
  const currentTimestamp = Date.now();
  const numberOfRuns = Math.round(
    (currentTimestamp - evolveAutoClicker.LAST_RUN_TIME) /
      evolveAutoClicker.TIME
  );
  evolveAutoClicker.LAST_RUN_TIME = currentTimestamp;
  const lumberButton = document.querySelector('#city-lumber .button');
  const stoneButton = document.querySelector('#city-stone .button');
  const foodButton = document.querySelector('#city-food .button');
  for (let index = 0; index < numberOfRuns; index++) {
    if (foodButton && evolveAutoClicker.CLICK_FOOD) {
      foodButton.click();
    }
    if (lumberButton && evolveAutoClicker.CLICK_LUMBER) {
      lumberButton.click();
    }
    if (stoneButton && evolveAutoClicker.CLICK_STONE) {
      stoneButton.click();
    }
  }
}, evolveAutoClicker.TIME);
// Set up UI
evolveAutoClicker.setupUI = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('evolve-auto-clicker');
  document.body.appendChild(wrapper);
  // Food button
  const toggleFoodButton = document.createElement('button');
  toggleFoodButton.textContent = 'Stop Food';
  toggleFoodButton.classList.add('button');
  toggleFoodButton.onclick = (e) => {
    e.preventDefault();
    evolveAutoClicker.CLICK_FOOD = !evolveAutoClicker.CLICK_FOOD;
    toggleFoodButton.textContent = evolveAutoClicker.CLICK_FOOD
      ? 'Stop Food'
      : 'Start Food';
  };
  wrapper.appendChild(toggleFoodButton);
  // Lumber button
  const toggleLumberButton = document.createElement('button');
  toggleLumberButton.textContent = 'Stop Lumber';
  toggleLumberButton.classList.add('button');
  toggleLumberButton.onclick = (e) => {
    e.preventDefault();
    evolveAutoClicker.CLICK_LUMBER = !evolveAutoClicker.CLICK_LUMBER;
    toggleLumberButton.textContent = evolveAutoClicker.CLICK_LUMBER
      ? 'Stop Lumber'
      : 'Start Lumber';
  };
  wrapper.appendChild(toggleLumberButton);
  // Stone button
  const toggleStoneButton = document.createElement('button');
  toggleStoneButton.textContent = 'Stop Stone';
  toggleStoneButton.classList.add('button');
  toggleStoneButton.onclick = (e) => {
    e.preventDefault();
    evolveAutoClicker.CLICK_STONE = !evolveAutoClicker.CLICK_STONE;
    toggleStoneButton.textContent = evolveAutoClicker.CLICK_STONE
      ? 'Stop Stone'
      : 'Start Stone';
  };
  wrapper.appendChild(toggleStoneButton);
  // Label
  const label = document.createElement('div');
  label.textContent = 'Auto';
  label.classList.add('label');
  wrapper.appendChild(label);
  // Add styles
  const stylesTag = document.createElement('style');
  stylesTag.classList.add('evolve-auto-clicker-styles');
  stylesTag.textContent = `
.evolve-auto-clicker {
  position: absolute;
  bottom: 20px;
  padding: 1rem;
  padding-right: 0.25rem;
  background: black;
  border: 1px solid white;
  display: flex;
  gap: 1rem;
  border-radius: 5px;
  transition: transform 250ms ease-in-out;
  transform: translateX(calc(-100% + 1.75rem));
}
.evolve-auto-clicker .label {
  transform: rotate(90deg);
}
.evolve-auto-clicker:hover {
  transform: translateX(0);
}
`;
  document.body.appendChild(stylesTag);
};
evolveAutoClicker.setupUI();
// Clean up script
evolveAutoClicker.cleanUp = () => {
  clearInterval(evolveAutoClicker.interval);
  document.querySelector('.evolve-auto-clicker').remove();
  document.querySelector('.evolve-auto-clicker-styles').remove();
  delete window.evolveAutoClicker;
};
