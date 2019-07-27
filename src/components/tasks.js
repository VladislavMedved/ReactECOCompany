import React from 'react';
import { inject, observer } from 'mobx-react';

import { uuidv4 } from "../utils/uuidv4"

@inject("store")
@observer
class Tasks extends React.Component {
    keys = [];
    generateKey = (taskName) => {
        if(this.keys[taskName]) {
            return this.keys[taskName];
        }
        this.keys[taskName] = uuidv4() + taskName;
        return this.keys[taskName];
    }
    onChange = (task) => () => {
        task.complete(!task.completed);
    }
    render() {
        return (
            <ul style={{ listStyle: "none" }}>
                {this.props.store.taskStore.tasks.map((task) => (
                    <Task
                        key={this.generateKey(task.taskName)}
                        taskName={task.taskName}
                        completed={task.completed}
                        onChange={this.onChange(task)}
                    />
                ))}
            </ul>
        );
    }
}

class Task extends React.Component {
    render() {
        return (
            <li>
                <input type="checkbox" checked={this.props.completed} onChange={this.props.onChange}/>
                {this.props.taskName}&nbsp;
                <SelectAssignee taskName={this.props.taskName}/>
            </li>
        );
    }
}

@inject("store")
class SelectAssignee extends React.PureComponent {
    keys = [];
    generateKey = (name) => {
        if(this.keys[name]) {
            return this.keys[name];
        }
        this.keys[name] = uuidv4() + name;
        return this.keys[name];
    }
    assigne = (event) => {
        var task = this.props.store.taskStore.tasks.find(x => x.taskName === this.props.taskName);
        task.setAssignee(event.target.value);
    }
    render() {
        return (
            <select onChange={this.assigne} defaultValue="">
                <option value="" disabled>Select assignee</option>
                {this.props.store.personStore.persons.map((person) => (
                    <option key={this.generateKey(person.name)}>
                        {person.name}
                    </option>
                ))}
            </select>
        );
    }
}

export { Tasks };
