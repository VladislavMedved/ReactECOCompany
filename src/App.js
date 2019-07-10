import React from 'react';
import { inject, observer } from 'mobx-react';

class Person extends React.Component {
  render() {
      return (
          <div className="123">
              <h1>{this.props.name}</h1>
              <h2>role: {this.props.role}</h2>
          </div>
      );
  }
}

@observer
class Company extends React.Component {
  render() {
      return (
          <React.Fragment>
              {this.props.persons.map(x => (
                  <React.Fragment key={x.name}>
                      <Person name={x.name} role={x.role}/>
                      <button onClick={() => this.props.onBtnClick(x)}>Promote</button>
                  </React.Fragment>
              ))}
          </React.Fragment>
      );
  }
}

@inject("store")
@observer
class App extends React.Component {
  render() {
      return (
          <>
            <Company persons={this.props.store.persons} onBtnClick={this.props.store.promote}/>
            <Tasks/>
          </>
      );
  }
}

@inject("store")
@observer
class Tasks extends React.Component {
    render() {
        return (
            <ul style={{ listStyle: "none"}}>
                {this.props.store.tasks.map((item, index) => (
                    <li key={uuidv4() + item.taskName}>
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => item.completed = !item.completed}
                        />
                        {item.taskName}&nbsp;
                        <select>
                            {this.props.store.persons.map(item => (
                                <option key={uuidv4() + item.name}>{item.name}</option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>
        );
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export { App };
