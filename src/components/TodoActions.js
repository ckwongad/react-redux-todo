import React, { Component } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { completeSelected, removeSelected } from '../actions/todos';

class TodoActions extends Component {
  render() {
    const {
      todos,
      currentFilter,
      handleFilter,
      actions,
    } = this.props;

    return (
      <div style={styles.container}>
        <RadioButtonGroup
          name="filter"
          defaultSelected={currentFilter}
          onChange={(e, value) => handleFilter(value)}
          style={styles.radioButtonGroup}
        >
          <RadioButton
            label="All"
            value="all"
            style={styles.radioButton}
          />
          <RadioButton
            label="Active"
            value="active"
            style={styles.radioButton}
          />
          <RadioButton
            label="Completed"
            value="completed"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
        <IconButton onTouchTap={() => actions.removeSelected()}>
          <FontIcon
            className="material-icons"
            color="red"
          >
            clear
          </FontIcon>
        </IconButton>
        <IconButton onTouchTap={() => actions.completeSelected()}>
          <FontIcon
            className="material-icons"
            color="blue"
          >
            done_all
          </FontIcon>
        </IconButton>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  radioButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 20px',
  },
  radioButton: {
    width: 100,
    marginRight: 10,
  },
};

const mapStateToProps = ({ todos }) => ({
  todos,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ completeSelected, removeSelected }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoActions);