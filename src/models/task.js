import { types } from "mobx-state-tree";

export const Task = types.model({
    taskName: types.string,
    completed: false,
    assignee: types.maybeNull(types.string)
}).actions(self => ({
    setAssignee(assignee) {
        self.assignee = assignee;
    },
    complete(completed) {
        self.completed = completed;
    }
}));