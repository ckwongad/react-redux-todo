import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FlatButton  from 'material-ui/FlatButton';

const defaultState = {text: '', date: null}

class TodoEditor extends Component {
  state = this.props.todo || defaultState;

  onChange = e => {
    const { value: text } = e.target;
    this.setState({...this.state, text});
  };

  onDateChange = (e, date) => {
    this.setState({...this.state, date} );
  };

  onSubmitClick = () => {
    this.props.onSubmit({...this.state, date: this.state.date || new Date().toISOString()});
    this.setState(defaultState);
  }

  render() {
    const { date } = this.state

    return (
      <div>
        <TextField
          hintText="What do you need to do?"
          floatingLabelText="What do you need to do?"
          value={this.state.text}
          onChange={this.onChange}
          style={styles.textField}
        />
        <DatePicker
          value={date ? new Date(date) : null}
          style={styles.datePicker}
          onChange={this.onDateChange}
          hintText="When?"
        />
        <FlatButton
          primary
          label="Submit"
          onClick={this.onSubmitClick}
        />
      </div>
    );
  }
}

const styles = {
  textField: {
    width: '40%',
  },
  datePicker: {
    display: 'inline-block',
    width: '40%',
    height: '72px',
    verticalAlign: '2px',
    marginLeft: '2%'
  }
};

export default TodoEditor;