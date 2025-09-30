import React, { Component } from 'react';
import './inputField.css';

class InputField extends Component {
  render() {
    const { type, placeholder, value, onChange } = this.props;
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form"
      />
    );
  }
}

export default InputField;