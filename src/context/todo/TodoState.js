import React, {useReducer, useContext} from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../screens/screenContext";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from "../actionTypes";

export const TodoState = ({ children }) => {
    const initialState = { // Начальный стейт компонента
        todos: [],
        loading: false,
        error: null
    };

    const {changeScreen} = useContext(ScreenContext)

    // Создание редюсера
    // useReducer(какой редюсер юзаем, т.е. todoReducer, initialState - начальное состояние)
    const [state, dispatch] = useReducer(todoReducer, initialState);

    // ф-ия addTodo, которую мы диспатчим. С помощью dispatch заявляем, что мы собираемся менять state
    // В dispatch передаем type и объект
    const addTodo = async (title) => {
        const response = await fetch("https://learningapp-7e4bf.firebaseio.com/todos.json", {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title
            })
        });
        const data = await response.json();
        console.log(data);
        dispatch({type: ADD_TODO, title, id: data.name});
    }

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id);
        Alert.alert(
            "Удаление элемента", 
            `Вы уверены, что хотите удалить "${todo.title}"`,
            [
                {
                text: "Отмена", style: "cancel"
                },
                {
                text: "Удалить",
                onPress: () => {
                    changeScreen(null);
                    dispatch({type: REMOVE_TODO, id});
                }
                }
            ],
            {
                cancelable: false
            }
            );         
    }

    const fetchTodos = async () => {
        showLoader();
        const response = await fetch("https://learningapp-7e4bf.firebaseio.com/todos.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log("Fetch data", data);
        const todos = Object.keys(data).map(key => ({
            ...data[key], id: key
        }));
        dispatch({type: FETCH_TODOS, todos});
        hideLoader();
    }

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});

    const showLoader = () => dispatch({type: SHOW_LOADER});

    const hideLoader = () => dispatch({type: HIDE_LOADER});

    const showError = (error) => dispatch ({type: SHOW_ERROR, error});

    const clearError = () => dispatch({type: CLEAR_ERROR});

    // Возвращаем контекст, объявленный как провайдер. В value передаем используемый функционал
    // После чего в TodoState обернем все другие компоненты (childrens)

    return <TodoContext.Provider value={{todos: state.todos, addTodo, removeTodo, updateTodo, fetchTodos, loading: state.loading, error: state.error}}>{children}</TodoContext.Provider>
}