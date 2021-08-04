import { createStore, applyMiddleware } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import combinedReducer from './reducers/rootReducer'

const bindMiddleware = (middleware: any) => {

    return applyMiddleware(...middleware)
}

const reducer = (state: any, action: any) => {

    if (action.type === HYDRATE) {

        const nextState = { ...state, ...action.payload }

        return nextState

    } else {

        return combinedReducer(state, action)
    }

}

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

const wrapper = createWrapper(initStore)

export default wrapper