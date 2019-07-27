import { types, applySnapshot, getParent } from "mobx-state-tree";

import { Task } from "../models/task";
import { Person } from "../models/person";

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

const PersonStore = types
.model({
    persons: types.array(Person),
})
.views(self => ({
    get parent() {
        return getParent(self);
    },
    getTasksCount(personName) {
        return self.parent.taskStore.tasks.filter(x => x.assignee === personName).length;
    }
}))
.actions(self => ({
    promote(person) {
        self.persons.find((x) => person.name === x.name).role = "Head of Vasiliy Malaschenko";
    },
    completeAllTasks(person) {
        self.parent.taskStore.tasks.filter(x => x.assignee === person.name).forEach(x => x.complete(true));
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

export { appStore };

