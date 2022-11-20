import { newTask } from "../../types/task";
import { newTaskActions } from "./taskActions";
import { taskActions } from "./taskActions";
import dayjs from 'dayjs';

const taskInitialState  = {
    fulfilled: false,
    outdated: false,
    title: '',
    details: '',
    date: '',
    file: undefined,
    createdAt: '',
}

export const newTaskReducer = (state: newTask = taskInitialState, action: taskActions): newTask => {
    switch (action.type) {
        case newTaskActions.title:
            return {title: action.payload, details: state.details, date: state.date}
        case newTaskActions.details:
            return {title: state.title, details: action.payload, date: state.date}
        case newTaskActions.files:
            return {title: state.title, details: state.details, date: state.date, file: action.payload}
        case newTaskActions.date:
            return {title: state.title, details: state.details, date: dayjs(action.payload).format('DD.MM.YYYY')};
        default: return state;
    }
}