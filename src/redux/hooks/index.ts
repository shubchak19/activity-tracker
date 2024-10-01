import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatchType, RootStateType } from "../../types";

export const useAppDispatch = useDispatch.withTypes<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
