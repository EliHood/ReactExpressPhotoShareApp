import React from 'react';
import { shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {getImages} from './imageActions';
import { GET_IMAGES } from './types';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('should getImages from action function ', () => {
    it('should getImages from action function', () => {
        // const expected = {
        //     type: GET_IMAGES,
        //     data: {}
        // }
        // const actual = getImages()
        // expect(actual).toEqual(expected)
    })

})