import { types } from "mobx-state-tree";

export const Person = types.model({
    name: types.optional(types.string, "ra-ta-ta-ta"),
    role: types.string
})
.actions(self => ({
    setName(name) {
        self.name = name;
    },
}));