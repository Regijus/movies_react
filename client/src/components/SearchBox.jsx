import React, { Component } from 'react';
import { Button,
    ButtonGroup,
    Form,
    FormGroup,
    InputGroup,
    Input
} from 'reactstrap';
import '../styles/searchStyles.css';

class SearchBox extends Component {
    render() {
        return(
            <div className="searchBox">
                <h1>SEARCH</h1>
                <Form>
                    <FormGroup>
                        <InputGroup>
                            <Input placeholder="Enter a title..." name="searchTitle"/>
                        </InputGroup>
                    </FormGroup>
                    <div className="searchButton">
                        <ButtonGroup>
                            <Button>
                                SUBMIT
                            </Button>
                        </ButtonGroup>
                    </div>
                </Form>
            </div>
        );
    }
}

export default SearchBox;
