import { types, applySnapshot, getParent, getEnv } from "mobx-state-tree";

import { Api } from "./api";

import { Task } from "../models/task";
import { Person } from "../models/person";

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
}).views(self => ({
    get env() {
        return getEnv(self);
    }
})).actions(self => ({
    afterCreate() {
        self.load();
    },
    load: runner(function* () {
        const persons = yield self.env.getPersons();
        applySnapshot(self.personStore.persons, persons);

        const tasks = yield self.env.getTasks();
        applySnapshot(self.taskStore.tasks, tasks);
    })
}));

function runner(genFn) {
    const itr = genFn();

    function run(arg) {
        var res = itr.next(arg);

        if(res.done) {
            return res.value;
        } else {
            Promise.resolve(res.value).then(run);
        }
    }

    return run;
}

const environment = new Api();
const appStore = window.store = AppStore.create({}, environment);

export { appStore };

