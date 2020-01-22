import {
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  FETCH_TODOS,
  CLEAR_ERROR,
  SHOW_ERROR,
  HIDE_LOADER
} from "../actionTypes"; // импорт констант

// Создаем объект handlers, который содержит ключи, которые соответствуют наименованиям констант
// Конечно, не идеальный вариант...
const handlers = {
  // Доступ по ключу
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id,
        title
      }
    ]
  }),
  [UPDATE_TODO]: (state, { id, title }) => ({
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    })
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  }),
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [HIDE_LOADER]: state => ({ ...state, loading: false }),
  [CLEAR_ERROR]: state => ({ ...state, error: null }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),
  DEFAULT: state => state // По умолчаию возвращаем текущий стейт
};

export const todoReducer = (state, action) => {
  // объявляем константу handler в виде ф-ии, которой присваиваем переданный action.type в todoReducer,
  // иначе, если экшенов нет, присваиваем DEFAULT
  const handler = handlers[action.type] || handlers.DEFAULT;
  // возвращаем созданную ф-ию, в которую передаем state, переданный в todoReducer, и объект action (его св-ва)
  return handler(state, action);
};
