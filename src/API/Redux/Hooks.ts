import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './Store';
import { Dispatch } from 'redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const mapStateToProps = (state: RootState) => {
  return { ...state };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch: dispatch,
  };
};
