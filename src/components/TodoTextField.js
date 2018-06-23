import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FlatButton  from 'material-ui/FlatButton';

const defaultState = {text: '', date: null}

class Header extends Component {
  state = defaultState;

  onChange = e => {
    const { value: text } = e.target;
    this.setState({...this.state, text});
  };

  onDateChange = (e, date) => {
    this.setState({...this.state, date} );
  };

  onAddClick = () => {
    this.props.onSubmit({...this.state, date: this.state.date || new Date().toISOString()});
    this.setState(defaultState);
  }

  render() {
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
          value={this.state.date}
          style={styles.datePicker}
          onChange={this.onDateChange}
        />
        <FlatButton
          primary
          label="Add"
          onClick={this.onAddClick}
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

export default Header;