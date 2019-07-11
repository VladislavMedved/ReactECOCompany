import React from 'react';
import { inject, observer } from 'mobx-react';

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
        task.completed = !task.completed
    }
    render() {
        return (
            <ul style={{ listStyle: "none" }}>
                {this.props.store.tasks.map((task) => (
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
        var task = this.props.store.tasks.find(x => x.taskName === this.props.taskName);
        task.assignee = event.target.value;
    }
    render() {
        console.log(`SelectAssignee render ${this.props.taskName}`)
        return (
            <select onChange={this.assigne}>
                <option value="" disabled selected>Select assignee</option>
                {this.props.store.persons.map((person) => (
                    <option key={this.generateKey(person.name)}>
                        {person.name}
                    </option>
                ))}
            </select>
        );
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export { Tasks };
