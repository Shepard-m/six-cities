import { store } from '../store';
import rootReducer from '../store/rootReduser';

export type State = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
