import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from "mobx";
import { Button } from '@material-ui/core';

import { Tasks } from "./tasks";

@inject("store")
@observer
class Person extends React.Component {
    @computed
    get taskCount() {
        return this.props.store.tasks.filter(x => x.assignee === this.props.name).length;
    }

    render() {
        return (
            <div className="person">
                <h1>{this.props.name}</h1>
                <h2>role: {this.props.role}</h2>
                <span>tasks to do: {this.taskCount}</span>
                <Button
                    variant="contained"
                    color="primary"
                    className="promote-btn"
                    onClick={this.props.onPromote}
                >
                        Promote
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
                    name={x.name}
                    role={x.role}
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
            <Persons persons={this.props.store.persons} onBtnClick={this.props.store.promote}/>
            <Tasks/>
          </>
      );
  }
}

export { App };
