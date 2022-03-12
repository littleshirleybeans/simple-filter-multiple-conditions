const programs = [
  {
    id: 1,
    title: 'US fsfa',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ut id tempora aut quasi in.',
    country: 'United States',
    level: 'high school',
    expense: '> 40w'
  },
  {
    id: 2,
    title: 'Canada ewfefw',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ut id tempora aut quasi in.',
    country: 'Canada',
    level: 'college',
    expense: '20w-30w'
  },
  {
    id: 3,
    title: 'Japan wrtereg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ut id tempora aut quasi in.',
    country: 'Japan',
    level: 'university',
    expense: '10w-20w'
  },
  {
    id: 4,
    title: 'Canada oppkpasd',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ut id tempora aut quasi in.',
    country: 'Canada',
    level: 'high school',
    expense: '> 40w'
  },
  {
    id: 5,
    title: 'Germany onkfd',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ut id tempora aut quasi in.',
    country: 'Germany',
    level: 'other institutions',
    expense: '< 10w'
  },
  {
    id: 6,
    title: 'France pakmlks',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ut id tempora aut quasi in.',
    country: 'France',
    level: 'university',
    expense: '20w-30w'
  },
  {
    id: 7,
    title: 'Japan 4imlks',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ut id tempora aut quasi in.',
    country: 'Japan',
    level: 'laboratory',
    expense: '30w-40w'
  },
];

let filter = [];
let selectedText = [];

const countries = document.querySelectorAll('.country');
const levels = document.querySelectorAll('.level');
const expenses = document.querySelectorAll('.expense');
const programArea = document.querySelector('.p-row');
const selected = document.querySelector('.selected');


// render data
function loadPrograms(programs) {
  programArea.innerHTML = '';
  programs.forEach((program, index) => {
    let liTag = `<li class="program" li-index=${index}>
                  <h3 class="p-title">${program.title}</h3>
                  <p class="desc">${program.desc}</p>
                  <div class="category">
                    <p class="item p-country">${program.country}</p>
                    <p class="item p-level">${program.level}</p>
                    <p class="item p-expense">${program.expense}</p>
                  </div>
                </li>`;
    programArea.insertAdjacentHTML("beforeend", liTag);
  });
}

window.addEventListener('load', () => {
  // initialize data
  loadPrograms(programs);
});

// display the conditions selected
function displaySelectedConditions(filter) {
  selectedText = filter.map(filter => filter.text);
  selected.textContent = `Selected: ${selectedText.join(' - ')}`;
}

// handle filter
function handleFilter(className, condition) {
  if (!condition.classList.contains(className)) return;

  // if the condition already exists, clear the condition
  if (filter.find(item => item.type === className && item.text === condition.textContent)) {
    filter = filter.filter(item => item.type !== className && item.text !== condition.textContent);
    displaySelectedConditions(filter);
    return;
  }

  // if the condition with the same type already exists, overwrite it with the new one
  filter = filter.filter(item => item.type !== className);
  // put the condition into filter
  filter.push({
    type: className,
    text: condition.textContent
  });
  displaySelectedConditions(filter);
}

// generate filtered array
function generateFilteredPrograms(filter) {
  let filteredPrograms = programs;

  filter.forEach(item => {
    if (item.type) {
      filteredPrograms = filteredPrograms.filter(program => program[item.type] === item.text);
    }
  });

  // console.log("filtered", filteredPrograms);
  loadPrograms(filteredPrograms);
  // console.log('filter', filter)
}

// detect click events
function detectEvents(conditionList) {
  conditionList.forEach(condition => {
    condition.addEventListener('click', () => {
      condition.classList.toggle('item_selected');

      // remove siblings selected
      let children = condition.parentElement.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i] !== condition) {
          children[i].classList.remove('item_selected');
        }
      }

      // extract the className we want
      let className = condition.dataset.type;

      handleFilter(className, condition);
      // console.log(filter);
      generateFilteredPrograms(filter);
    });
  });
}

detectEvents(countries);
detectEvents(levels);
detectEvents(expenses);