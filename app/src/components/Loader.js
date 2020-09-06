import React, { useEffect } from 'react';
import { Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { startLoading } from '../actions';


export const Loader = () => {
    const dispatch = useDispatch();
    const isFetch = useSelector( state => state.ui.isFetch);


    return isFetch ? <Spinner/> : null;
};