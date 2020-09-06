import React, {useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getComicsList} from '../actions';
import { getComicsState } from '../selectors/comics';
import { Loader  } from '../components';

export const ComicsList = () => {
  const dispatch = useDispatch();
  const list = useSelector(getComicsState);

  const handleClick = useCallback(() => {
    dispatch(getComicsList());
  }, []);

  console.log(list, 'list');

  return (
    <View>
      <Button bordered light onPress={handleClick}>
        <Text>Light</Text>
        <Loader/>
      </Button>
    </View>
  );
};
