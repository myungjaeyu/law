import controlReducer from './controlReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    control: controlReducer
})

export default rootReducer