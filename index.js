const crateForm = document.querySelector('.create-task-block');
const btnCreate = document.querySelector('.create-task-block__button.default-button');
const tasksList = document.querySelector('.tasks-list');
const taskBlock = document.querySelector('#tasks');
let randomId = Date.now();

const tasks = [
  {
      id: '1138465078061',
      completed: false,
      text: 'Посмотреть новый урок по JavaScript',
  },
  {
      id: '1138465078062',
      completed: false,
      text: 'Выполнить тест после урока',
  },
  {
      id: '1138465078063',
      completed: false,
      text: 'Выполнить ДЗ после урока',
  },
];


// ---------------------------------------------=> Отрисовка элементов на странице

const generateTask = (id, value) => {
  return `
    <div class="task-item" data-task-id="${id}">
    <div class="task-item__main-container">
        <div class="task-item__main-content">
            <form class="checkbox-form">
                <input class="checkbox-form__checkbox" type="checkbox" id="${id}">
                <label for="${id}"></label>
            </form>
            <span class="task-item__text">${value}</span>
        </div>
        <button class="task-item__delete-button default-button delete-button" data-delete-task-id="${id}">Удалить</button>
    </div>
    </div>
  `;
}

// --------------------------------=> Генератор модалочки


const generalDeleteModal = () => {
  return `
    <div class="modal-overlay modal-overlay_hidden">
      <div class="delete-modal">
          <h3 class="delete-modal__question">
              Вы действительно хотите удалить эту задачу?
          </h3>
          <div class="delete-modal__buttons">
              <button class="delete-modal__button delete-modal__cancel-button">
                  Отмена
              </button>
              <button class="delete-modal__button delete-modal__confirm-button">
                  Удалить
              </button>
          </div>
      </div>
    </div>
  `;
}

document.querySelector('body').insertAdjacentHTML('afterend', generalDeleteModal());

for(let item of tasks){
  let id = item.id;
  let valueTask = item.text;
  tasksList.insertAdjacentHTML('afterbegin', generateTask(id, valueTask))
}

// ---------------------------------------------=> Добавление элементов если данные валидны и вывод модального окна


const error = document.createElement('span');
error.className = "error-message-block";
error.style.fontWeight = 'bold';
crateForm.insertAdjacentElement('beforeend', error);

crateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let { target } = event;
  let name = target.taskName;
  let value = name.value;
  let isTaskInTasks = tasks.some(el => el.text === value);

  let newTask = {
    id: `${randomId}`,
    completed: false,
    text: value
  }

  if(value === '') {
    error.textContent = 'Название задачи не должно быть пустым';
  }else if(isTaskInTasks){
    error.textContent = 'Задача с таким названием уже существует';
  }else if(value !== '' && !isTaskInTasks){
    error.textContent = '';
    tasks.push(newTask);
    tasksList.insertAdjacentHTML('afterbegin', generateTask(newTask.id, newTask.text))

    // -----------------=> при добавлении проверяем тему проходимся по элементам
    const bodyDark = document.querySelector('.darkTheme');
    const taskItem = document.querySelectorAll('.task-item');
    const btn = document.querySelectorAll('button');

    if(bodyDark){
      bodyDark.style.background = '#24292E';
      taskItem.forEach(el => {
        el.style.color = '#ffffff';
      })
      btn.forEach(el => {
        el.style.border = '1px solid #ffffff';
      })
    }else{
      document.querySelector('body').style.background = 'initial';
      taskItem.forEach(el => {
        el.style.color = 'initial';
      })
      btn.forEach(el => {
        el.style.border = 'none';
      })
    }

    console.log(tasks);
  }
})


// ---------------------------------------------=> Удаление элементов из списка и из обьекта

const renderItem = (domEl) => {// Проверка на наличие задач
  if(!domEl.children.length){
    return confirm('Ваш список задач пуст! Добавьте новую задачу');
  }
}


tasksList.addEventListener('click', (e) => {
  const { target } = e;

  if(target.className === 'task-item__delete-button default-button delete-button'){

    const modal = document.querySelector('.modal-overlay.modal-overlay_hidden');
    const modalClose = document.querySelector('.delete-modal__button.delete-modal__cancel-button');
    const deleteModalTask = document.querySelector('.delete-modal__button.delete-modal__confirm-button');

    let parentTask = target.closest('.task-item');
    let idTask = target.closest('.task-item').dataset.taskId;

    modal.classList.remove('modal-overlay_hidden');
    document.querySelector('.delete-modal').addEventListener('click', (event) => {
      if(event.target.className === modalClose.className){
        modal.classList.add('modal-overlay_hidden');
      }else if(event.target.className === deleteModalTask.className){

        for(let item of tasks){
          if(item.id === idTask){
            let index = tasks.findIndex(el => el.id === item);
            tasks.splice(index);
          }
        }
        parentTask.remove();
        modal.classList.add('modal-overlay_hidden');
        console.log(tasks);
      }
    })

    setTimeout(() => {
      renderItem(tasksList);
    },1000)
  }
})


// ---------------------------------------------=> Смена темы на странице


document.addEventListener('keydown', (e) => {
  if(e.key === 'Tab'){

    document.querySelector('body').classList.toggle('darkTheme');
    const bodyDark = document.querySelector('.darkTheme');
    const taskItem = document.querySelectorAll('.task-item');
    const btn = document.querySelectorAll('button');

    if(bodyDark){
      bodyDark.style.background = '#24292E';
      taskItem.forEach(el => {
        el.style.color = '#ffffff';
      })
      btn.forEach(el => {
        el.style.border = '1px solid #ffffff';
      })
    }else{
      document.querySelector('body').style.background = 'initial';
      taskItem.forEach(el => {
        el.style.color = 'initial';
      })
      btn.forEach(el => {
        el.style.border = 'none';
      })
    }

  }
})