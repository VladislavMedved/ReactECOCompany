import React from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, autorun, action } from "mobx";
import { types, getSnapshot, applySnapshot, getParent } from "mobx-state-tree";
import { Provider } from "mobx-react";
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { setNormalizedScrollLeft } from 'normalize-scroll-left';


var persons = [
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

const Person = types.model({
    name: types.optional(types.string, "ra-ta-ta-ta"),
    role: types.string
}).views(self => ({
    get taskCount() {
        return getParent(getParent(getParent(self))).taskStore.tasks.filter(x => x.assignee === self.name && !x.completed).length;
    }
}))
.actions(self => ({
    setName(name) {
        self.name = name;
    },
}));


const Task = types.model({
    taskName: types.string,
    completed: false,
    assignee: types.maybeNull(types.string)
}).actions(self => ({
    setAssignee(assignee) {
        self.assignee = assignee;
    },
    complete() {
        self.completed = true;
    }
}));

const PersonStore = types.model({
    persons: types.array(Person),
}).actions(self => ({
    promote(person) {
        self.persons.find((x) => person.name === x.name).role = "Head of Vasiliy Malaschenko";
    },
    completeAllTasks(person) {
        getParent(self).taskStore.tasks.filter(x => x.assignee === person.name).forEach(x => x.complete());
    }
}));

const TaskStore = types.model({
    tasks: types.array(Task)
}).actions(self => ({
    addTask(taskName) {
        self.tasks.push(Task.create({taskName}))
    },
    setValue(index, name, completed) {
        self.tasks[index].taskName = name;
        self.tasks[index].completed = completed;
    }
}));

const AppStore = types.model({
    personStore: types.optional(PersonStore, {}),
    taskStore: types.optional(TaskStore, {}),
});


const appStore = window.store = AppStore.create();

applySnapshot(appStore.personStore, {persons});
appStore.taskStore.addTask('fix bug on GPS apply card');
appStore.taskStore.addTask('fix bug on GPS apply card 34234234');


console.log(getSnapshot(appStore));

ReactDOM.render(
    <Provider store={appStore}>
        <App/>
    </Provider>, document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
