import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import { AppBar, Box, Button, Link, Toolbar, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

import logo from './logo.svg';

import { SearchResultsMap } from './components/SearchResultsMap';
import { SearchResults } from './components/SearchResults';
import { FilterSummaryBox } from './components/FilterSummaryBox';
import { SearchTextBox } from './components/SearchTextBox';
import { Facets } from './components/Facets';
import { DetailsDialog } from './components/DetailsDialog';
import { LoginIcon } from './components/LoginIcon';

import { AppState } from './states/AppState';

const SidebarWidth = '300px';

// Main app page
@observer
export default class App extends React.Component<{ state: AppState }> {

    render(): JSX.Element {

        const state = this.props.state;

        return (<>

            <AppBar position="static" style={{backgroundColor:"#fff"}}>
                <Toolbar>

                    {state.searchResultsState.isInInitialState ? (<>

                        <img src={logo} width="30px" alt=""/>
                        <Box width={15} />
                        <Typography variant="h5" style={{color:"#1f90be"}} >
                            Cognitive Search Demo
                        </Typography>
                        
                    </>) : (<>

                        <Link href="/" color="inherit">
                            <img src={logo} width="30px" alt=""/>
                        </Link>
                        <Box width={15} />
                        <Link href="/" color="inherit">
                            <TitleTypography variant="h6" style={{color: "#1f90be"}}>
                                    Cognitive Search Demo
                            </TitleTypography>
                        </Link>
                        <Box width={15} />
                        <ToolbarSearchBoxDiv>
                            <SearchTextBox state={state.searchResultsState} inProgress={state.inProgress} />
                        </ToolbarSearchBoxDiv>
                            
                    </>)}
                    
                    <Typography style={{ flex: 1 }} />
                    <Box width={30} />
                    <LoginIcon state={state.loginState}/>

                </Toolbar>

                <FilterDiv>
                    <FilterSummaryBox state={state.searchResultsState.facetsState} inProgress={state.inProgress} />
                </FilterDiv>
            </AppBar>

            {state.searchResultsState.isInInitialState ? (<LandingDiv>

                <SearchTextBox state={state.searchResultsState} inProgress={state.inProgress} />

                <BottomBar position="fixed" color="transparent" ><Toolbar variant="dense">
                    <Typography style={{ flex: 1 }} />
                    <Button startIcon={<GitHubIcon />}
                        href="https://github.com/scale-tone/cognitive-search-static-web-apps-sample-ui#cognitive-search-static-web-apps-sample"
                        target="_blank"
                    >
                        Fork me on GitHub
                    </Button>
                </Toolbar></BottomBar>

            </LandingDiv>) : (<>

                <Sidebar>
                    <Facets state={state.searchResultsState.facetsState} inProgress={state.inProgress} />
                </Sidebar>

                <Main>
                    {!!state.mapResultsState && (
                            <SearchResultsMap
                                state={state.mapResultsState}
                                azureMapSubscriptionKey={state.serverSideConfig.AzureMapSubscriptionKey}
                                geoRegion={state.searchResultsState.facetsState.geoRegion}
                                geoRegionSelected={(points) => state.searchResultsState.facetsState.geoRegion = points}
                            />
                    )}
                    <SearchResults state={state.searchResultsState} inProgress={state.inProgress} />
                </Main>

            </>)}

            {!!state.detailsState && (
                <DetailsDialog state={state.detailsState} hideMe={() => state.hideDetails()} azureMapSubscriptionKey={state.serverSideConfig.AzureMapSubscriptionKey}/>
            )}

        </>);
    }
}

const BottomBar: typeof AppBar = styled(AppBar)({
    top: 'auto',
    bottom: 0,
})

const Sidebar = styled.div({
    width: SidebarWidth,
    float: 'left',
    background: '#fff',
    borderTop: '1px solid #ccc',
})

const Main = styled.div({
    marginLeft: SidebarWidth,
    paddingLeft: '10px',
    paddingRight: '10px',
    borderLeft: '1px solid #ccc',
    background: '#E6F2F9',
    borderTop: '1px solid #ccc',
})

const LandingDiv = styled.div({
    margin: 150,
})

const ToolbarSearchBoxDiv = styled.div({
    width: '100%'
})

const TitleTypography: typeof Typography = styled(Typography)({
    width: 220
})

const FilterDiv = styled.div({
    paddingLeft: SidebarWidth
})


