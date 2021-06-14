import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './Store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const mapStateToProps = (state: RootState) => {
  return {
    storeState: state,
  };
};

export const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
  return {
    dispatch: dispatch,
  };
};
