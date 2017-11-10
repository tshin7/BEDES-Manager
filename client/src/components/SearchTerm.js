import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Button,
  Form
} from 'semantic-ui-react';

import Term from './SearchTerm/Term';


export default class SearchTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: '',
      termData: undefined,
      termNotFound: false,
    };
  }

  // Handler for uuid search input field
  handleUuidSearchChange = event => this.setState({ uuid: event.target.value });

  // Handler for uuid search submit
  handleUuidSearchSubmit = event => {
    // Save this in variable, self
    const self = this;
    axios.get('/api/term/' + this.state.uuid)
      .then(function(response) {
        // console.log(response.data);
        const data = response.data;
        // Check that response data exists (if term was found with entered uuid)
        if (data) {
          self.setState({
            termData: data,
            termNotFound: false
          });
        } else {
          self.setState({
            termNotFound: true
          });
        }


      })
      .catch(function(error) {
        console.log(error);
      });
    // Prevent form default behavior
    event.preventDefault();
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleUuidSearchSubmit}>
          <Form.Field>
            <label>Search for term</label>
            <input placeholder='Search for term' onChange={this.handleUuidSearchChange} />
          </Form.Field>
          <Button type='submit'>Search</Button>
        </Form>
        { this.state.termData ? <Term termData={this.state.termData} /> : null }


      </Container>
    );
  }
}
