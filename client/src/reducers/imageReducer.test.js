import reducer from './imageReducer'
import * as types from '../types'

describe('Image reducer', () => {
    it('should return the initial state', () => {
        expect( reducer(undefined, {})).toEqual(
            {
                images: [],
                likeCount: [],
                liked: false
            }
        )
    })
})
