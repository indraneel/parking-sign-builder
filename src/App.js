import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from "react-jsonschema-form";


const schema = {
  title: "Properties",
  type: "object",
  required: ["street_name", "street_suffix", "streets_between",
            "sign_text", "permit_zone", "signs"],
  properties: {
    "street_name": {type: "string", title: "Street Name", default: "Mercer"},
    "street_suffix": {type: "string", title: "Street Suffix", default: "Street"},
    "sign_summary_text": {type: "string", title: "Sign Summary Text", default: ""},
    "permit_zone": {type: "number", title: "Permit Zone", default: 0},
    "streets_between": {
      type: "array",
      title: "Streets Between",
      items: {
        type: "object",
        required: ["street_name", "street_suffix"],
        properties: {
          "street_name": {type: "string", title: "Street Name", default: "Mercer"},
          "street_suffix": {type: "string", title: "Street Suffix", default: "Street"},
        }
      }
    },
    "signs": {
      type: "array",
      title: "Signs",
      items: {
        type: "object",
        required: ["sign_title", "sign_color",
                  "sign_applies_to_permit_holder", "sign_days"],
        properties: {
          "sign_title": {type: "string", title: "Sign Title", default: ""},
          "sign_text": {type: "string", title: "Sign Text", default: ""},
          "sign_color": {type: "string", title: "Sign Color", default: ""},
          "sign_applies_to_permit_holder": {type: "boolean", title: "Sign Applies to Permit Holder", default: false},
          "sign_time_range": {
            type: "array",
            title: "Sign Time Range",
            items: {
              type: "object",
              required: ["start_time", "end_time"],
              properties: {
                start_time: {type: "string", format: "date-time", title: "start time"},
                end_time: {type: "string", format: "date-time", title: "end time"}
              }
            }
          },
          "sign_days": {
            type: "array",
            title: "Sign Days",
            items: {
              type: "string",
              enum: ["M", "Tu", "W", "Th", "F", "Sa", "Su"]
            },
            default: ["M", "Tu", "W", "Th", "F", "Sa", "Su"]
          },
          "sign_duration": {type: "number", title: "Sign Duration (in number of hours)", default: 2},
        }
      }
    },
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: null,
      schema: schema,
      uiSchema: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {

    this.setState({
      formData: e.formData,
      schema: e.schema,
      uiSchema: e.uiSchema
    });
  }

  render() {

    const log = (type) => console.log.bind(console, type);
    const properties = { properties: this.state.formData }
    const formDataAsText = JSON.stringify(properties, undefined, 4);
    return (
      <div>
      <Form schema={this.state.schema}
        formData={this.state.formData}
        onChange={this.handleChange}
        onSubmit={log("submitted")}
        onError={log("errors")} />
        <textarea cols={50} rows={50} value={formDataAsText}></textarea>
      </div>
    );
  }
}

export default App;
