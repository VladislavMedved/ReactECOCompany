import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
import { Task } from "./task";

describe("Mobx-State-tree models", () => {

    const taskSnapshot = {
        taskName: "fix 3ds FIS functionality on ClientDetails"
    };

    it("should be possible to complete the task", () => {
        var task = Task.create(taskSnapshot);
        expect(task.completed).toBe(false);
        task.complete(true);
        expect(task.completed).toBe(true);
    });

    it("should be possible to set assignee to the task", () => {
        var task = Task.create(taskSnapshot);


        var patches = [];
        onPatch(task, patch => {
            patches.push(patch);
        })

        expect(task.assignee).toBe(null);
        task.setAssignee("Igor");
        task.setAssignee("Igor Schuchenko")
        expect(task.assignee).toBe("Igor Schuchenko");

        expect(task).toMatchSnapshot();

        expect(patches).toMatchSnapshot();
    });
})