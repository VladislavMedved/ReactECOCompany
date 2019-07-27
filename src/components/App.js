import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '@material-ui/core';

import { Tasks } from "./tasks";

@inject("store")
@observer
class Person extends React.Component {
    render() {
        const { name, role } = this.props.person;
        return (
            <div className="person">
                <h1>{name}</h1>
                <h2>role: {role}</h2>
                <span>tasks to do: {this.props.store.personStore.getTasksCount(this.props.person.name)}</span>
                <Button
                    variant="contained"
                    color="primary"
                    className="promote-btn"
                    onClick={this.props.onPromote}
                >
                        Promote
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="promote-btn"
                    onClick={() => this.props.store.personStore.completeAllTasks(this.props.person) }
                >
                        JOB DONE!!!
                </Button>
            </div>
        );
    }
}

@observer
class Persons extends React.Component {
  render() {
      return (
          <>
              {this.props.persons.map(x => (
                <Person
                    key={x.name}
                    person={x}
                    onPromote={() => this.props.onBtnClick(x)}
                />
              ))}
          </>
      );
  }
}

@inject("store")
@observer
class App extends React.Component {
  render() {
      return (
          <>
            <Persons persons={this.props.store.personStore.persons} onBtnClick={this.props.store.personStore.promote}/>
            <Tasks/>
          </>
      );
  }
}

export { App };
