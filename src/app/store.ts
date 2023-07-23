import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { WeatherActionsType, weatherReducer } from './weather-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
    weather: weatherReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, WeatherActionsType>

// @ts-ignore
window.store = store;
