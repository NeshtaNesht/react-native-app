import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from "../actionTypes"; // импорт констант

// Создаем объект handlers, который содержит ключи, которые соответствуют наименованиям констант
const handlers = {
    [ADD_TODO]: (state, {title}) => ({ 
        // По сути, [ADD_TODO], [UPDATE_TODO], [REMOVE_TODO] - это ф-ия, которая возвращает объект
        ...state,
        todos: [...state.todos, {
            id: Date.now().toString(),
            title
        }]
    }),
    [UPDATE_TODO]: (state, {id, title}) => ({
        ...state,
        todos: state.todos.map(todo => {
            if (todo.id === id) {
                todo.title = title;
            }
            return todo;
        })
    }),
    [REMOVE_TODO]: (state, {id}) => ({
        ...state,
        todos: state.todos.filter(todo => todo.id !== id)
    }),
    DEFAULT: state => state // По умолчаию возвращаем текущий стейт
}

export const todoReducer = (state, action) => {
    // объявляем константу handler в виде ф-ии, которой присваиваем переданный action.type в todoReducer, 
    // иначе, если экшенов нет, присваиваем DEFAULT
    const handler = handlers[action.type] || handlers.DEFAULT; 
    // возвращаем созданную ф-ию, в которую передаем state, переданный в todoReducer, и объект action (его св-ва)
    return handler(state, action);
}