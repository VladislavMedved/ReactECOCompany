import React from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, autorun, action } from "mobx";
import { Provider } from "mobx-react";
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';



class ToDoTasksStore {
    @observable tasks = [];
    @observable persons = [
        {
            name: "Igor",
            role: "Team Lead"
        },
        {
            name: "Vitalik",
            role: "Lead Software developer"
        },
        {
            name: "Vlad",
            role: "Software developer"
        },
    ];

    constructor() {
        autorun(() => console.log(this.report));
    }

    @computed
    get report() {
        if(!this.tasks.length) {
            return "empty";
        }
        return this.tasks.map(x =>  `${x.taskName} completed: ${x.completed} `).join('\n');
    }

    addTask = (taskName) => {
        this.tasks.push({
            taskName: taskName,
            completed: false,
            assignee: null
        })
    }

    promote = (person) => {
        this.persons.find((x) => person.name === x.name).role = "Head of Vasiliy Malaschenko";
    }

    @action
    setValue(index, name, completed) {
        this.tasks[index].taskName = name;
        this.tasks[index].completed = completed;
    }
};


const toDoTasksStore = window.store = new ToDoTasksStore();
toDoTasksStore.addTask('fix bug on GPS apply card');
toDoTasksStore.addTask('fix bug on GPS apply card 34234234');

toDoTasksStore.setValue(0, "copy texts", true);



ReactDOM.render(
    <Provider store={toDoTasksStore}>
        <App/>
    </Provider>, document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
