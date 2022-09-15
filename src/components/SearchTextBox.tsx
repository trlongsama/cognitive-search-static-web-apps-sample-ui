import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { SearchResultsState } from '../states/SearchResultsState';

// TextBox for entering search query into
@observer
export class SearchTextBox extends React.Component<{ state: SearchResultsState, inProgress: boolean }> {

    render(): JSX.Element {

        const state = this.props.state;

        return (
            <SearchTextWrapper>

                <SearchButton variant="contained" color="primary" disabled={this.props.inProgress} onClick={() => state.search()} style = {{backgroundColor: "#1f90be"}}>
                    Search
                </SearchButton>
                
                <SearchTextBoxDiv>

                    <Autocomplete
                        freeSolo
                        options={state.isExactMatch ? [] : state.suggestions}
                        value={state.searchString}
                        disabled={this.props.inProgress}
                        onChange={(evt, newValue) => {
                            state.searchString = newValue ?? '';
                            if (!!newValue) {
                                state.search();
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                fullWidth={true}
                                placeholder="Type a search phrase or just press 'Enter'"
                                onChange={(evt) => state.searchString = evt.target.value as string}
                                onKeyPress={(evt) => this.handleKeyPress(evt)}
                            />
                        )}
                    />                    

                </SearchTextBoxDiv>

            </SearchTextWrapper>
        );
    }

    private handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter') {
            // Otherwise the event will bubble up and the form will be submitted
            event.preventDefault();

            this.props.state.search();
        }
    }
}

const SearchTextBoxDiv = styled.div({
    overflow: 'hidden',
    paddingLeft: 35,
    paddingRight: 20
})


const SearchButton: typeof Button = styled(Button)({
    float: 'right',
    width: 150,
    height: 40
});

const SearchTextWrapper = styled.div({
    height: '100%',
    paddingTop: 20,
    paddingBottom: 20,
});
