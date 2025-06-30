const CHANGE_STATUS_MESSAGE = 'CHANGE_STATUS';

// Initial variables
const EVOLVE_LOCAL_STORAGE_NAME = 'evolve-auto-clicker';
const evolveAutoClicker = window.localStorage.getItem(EVOLVE_LOCAL_STORAGE_NAME)
  ? JSON.parse(window.localStorage.getItem('evolve-auto-clicker'))
  : {
      ACTIVE: true,
      TIME: 25,
      MAX_CLICKS: 1000,
      CLICK_FOOD: true,
      CLICK_LUMBER: true,
      CLICK_STONE: true,
      CLICK_CHRYSOTILE: true,
      CLICK_SLAUGHTER: true,
      LAST_RUN_TIME: Date.now(),
    };

// Auto Click Function
const autoClickFunction = () => {
  const currentTimestamp = Date.now();
  const numberOfRuns = Math.min(
    Math.round(
      (currentTimestamp - evolveAutoClicker.LAST_RUN_TIME) /
        evolveAutoClicker.TIME
    ),
    evolveAutoClicker.MAX_CLICKS
  );
  evolveAutoClicker.LAST_RUN_TIME = currentTimestamp;
  const lumberButton = document.querySelector('#city-lumber .button');
  const stoneButton = document.querySelector('#city-stone .button');
  const foodButton = document.querySelector('#city-food .button');
  const chrysotileButton = document.querySelector('#city-chrysotile .button');
  const slaughterButton = document.querySelector('#city-slaughter .button');
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
    if (chrysotileButton && evolveAutoClicker.CLICK_CHRYSOTILE) {
      chrysotileButton.click();
    }
    if (slaughterButton && evolveAutoClicker.CLICK_SLAUGHTER) {
      chrysotileButton.click();
    }
  }
  saveState();
};

// Set up UI
const setupUI = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('evolve-auto-clicker');
  document.body.appendChild(wrapper);
  // Clicks Per Second input
  const clicksPerSecondLabel = document.createElement('label');
  const clicksPerSecondSpan = document.createElement('span');
  clicksPerSecondSpan.style.display = 'block';
  clicksPerSecondSpan.style.textAlign = 'center';
  clicksPerSecondSpan.textContent = 'Clicks/Sec';
  const clicksPerSecondInput = document.createElement('input');
  clicksPerSecondInput.style.display = 'block';
  clicksPerSecondInput.style.margin = 'auto';
  clicksPerSecondInput.style.width = '8ch';
  clicksPerSecondInput.type = 'number';
  clicksPerSecondInput.step = '1';
  clicksPerSecondInput.min = '1';
  clicksPerSecondInput.max = '1000';
  clicksPerSecondInput.value = Math.round(1000 / evolveAutoClicker.TIME);
  clicksPerSecondInput.onchange = (e) => {
    evolveAutoClicker.TIME = 1000 / e.target.value;
    clearInterval(evolveAutoClicker.interval);
    evolveAutoClicker.interval = setInterval(
      autoClickFunction,
      evolveAutoClicker.TIME
    );
  };
  wrapper.appendChild(clicksPerSecondLabel);
  clicksPerSecondLabel.appendChild(clicksPerSecondSpan);
  clicksPerSecondLabel.appendChild(clicksPerSecondInput);
  // Food button
  const toggleFoodButton = document.createElement('button');
  toggleFoodButton.textContent = evolveAutoClicker.CLICK_FOOD
    ? 'Stop Food'
    : 'Start Food';
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
  toggleLumberButton.textContent = evolveAutoClicker.CLICK_LUMBER
    ? 'Stop Lumber'
    : 'Start Lumber';
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
  toggleStoneButton.textContent = evolveAutoClicker.CLICK_STONE
    ? 'Stop Stone'
    : 'Start Stone';
  toggleStoneButton.classList.add('button');
  toggleStoneButton.onclick = (e) => {
    e.preventDefault();
    evolveAutoClicker.CLICK_STONE = !evolveAutoClicker.CLICK_STONE;
    toggleStoneButton.textContent = evolveAutoClicker.CLICK_STONE
      ? 'Stop Stone'
      : 'Start Stone';
  };
  wrapper.appendChild(toggleStoneButton);
  // Chrysotile button
  const toggleChrysotileButton = document.createElement('button');
  toggleChrysotileButton.textContent = evolveAutoClicker.CLICK_CHRYSOTILE
    ? 'Stop Chrysotile'
    : 'Start Chrysotile';
  toggleChrysotileButton.classList.add('button');
  toggleChrysotileButton.onclick = (e) => {
    e.preventDefault();
    evolveAutoClicker.CLICK_CHRYSOTILE = !evolveAutoClicker.CLICK_CHRYSOTILE;
    toggleChrysotileButton.textContent = evolveAutoClicker.CLICK_CHRYSOTILE
      ? 'Stop Chrysotile'
      : 'Start Chrysotile';
  };
  wrapper.appendChild(toggleChrysotileButton);
  // Slaughter button
  const toggleSlaughterButton = document.createElement('button');
  toggleSlaughterButton.textContent = evolveAutoClicker.CLICK_SLAUGHTER
    ? 'Stop Slaughter'
    : 'Start Slaughter';
  toggleSlaughterButton.classList.add('button');
  toggleSlaughterButton.onclick = (e) => {
    e.preventDefault();
    evolveAutoClicker.CLICK_SLAUGHTER = !evolveAutoClicker.CLICK_SLAUGHTER;
    toggleSlaughterButton.textContent = evolveAutoClicker.CLICK_SLAUGHTER
      ? 'Stop Slaughter'
      : 'Start Slaughter';
  };
  wrapper.appendChild(toggleSlaughterButton);
  // Max click input
  const maxClickLabel = document.createElement('label');
  const maxClickSpan = document.createElement('span');
  maxClickSpan.style.display = 'block';
  maxClickSpan.style.textAlign = 'center';
  maxClickSpan.textContent = 'Max Click';
  const maxClickInput = document.createElement('input');
  maxClickInput.style.display = 'block';
  maxClickInput.style.margin = 'auto';
  maxClickInput.style.width = '8ch';
  maxClickInput.type = 'number';
  maxClickInput.step = '1';
  maxClickInput.min = '1';
  maxClickInput.value = evolveAutoClicker.MAX_CLICKS;
  maxClickInput.onchange = (e) => {
    evolveAutoClicker.MAX_CLICKS = e.target.value;
  };
  wrapper.appendChild(maxClickLabel);
  maxClickLabel.appendChild(maxClickSpan);
  maxClickLabel.appendChild(maxClickInput);
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

// Save active state function.
const saveState = () => {
  window.localStorage.setItem(
    EVOLVE_LOCAL_STORAGE_NAME,
    JSON.stringify(evolveAutoClicker)
  );
};

// Start script
const startUp = () => {
  evolveAutoClicker.ACTIVE = true;
  evolveAutoClicker.LAST_RUN_TIME = Date.now();
  setupUI();
  // Interval
  evolveAutoClicker.interval = setInterval(
    autoClickFunction,
    evolveAutoClicker.TIME
  );
};

// Clean up script
const cleanUp = () => {
  clearInterval(evolveAutoClicker.interval);
  evolveAutoClicker.ACTIVE = false;
  document.querySelector('.evolve-auto-clicker').remove();
  document.querySelector('.evolve-auto-clicker-styles').remove();
  saveState();
};

// Check if is initially enabled.
if (evolveAutoClicker.ACTIVE) {
  startUp();
}

// Send extension initial status.
chrome.runtime.sendMessage({
  type: CHANGE_STATUS_MESSAGE,
  status: evolveAutoClicker.ACTIVE,
});

// Listen for extension status updates
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === CHANGE_STATUS_MESSAGE) {
    if (message.status) {
      startUp();
    } else {
      cleanUp();
    }
  }
});
