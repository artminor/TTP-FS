    import {
        createStore,
        applyMiddleware
    } from 'redux';
    import {
        composeWithDevTools
    } from 'redux-devtools-extension';
    import thunk from 'redux-thunk';
    //for combining reducers
    import rootReducer from './reducers';


    //redux store setup
    const initialState = {};
    const middleware = [thunk];
    const store = createStore(rootReducer, initialState,
        composeWithDevTools(applyMiddleware(...middleware)));

    export default store;