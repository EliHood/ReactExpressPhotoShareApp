import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Comment from './Comment';
import toJson from 'enzyme-to-json';
describe('Should render <Comment/> component', () => {
    let wrapper;
    beforeEach( () => {
        wrapper = shallow(<Comment/>)
    })
    it('Should render form', () => {  
        expect(wrapper.find("form")).toHaveLength(1); // checks if there is a form.  
    })
    it('Should render button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    })

    it('should render Comment Component Snap', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    })
 
    it("should check for onChange method (1)", () => {
        const onChangeMock = jest.fn();
        const component = shallow(
          <Comment commentChange={onChangeMock} commentBody={"test"} />
        );
        component.find(TextField).at(0).simulate("change", "test");
        expect(onChangeMock).toBeCalledWith("test");
      });
      it("should check for onChange method (2)", () => {
        const onChangeMock = jest.fn();
        const component = shallow(
          <Comment commentChange={onChangeMock} commentBody={"test"} />
        );
        component.find(TextField).at(0).props().onChange();
        expect(onChangeMock).toBeCalled();
      });
      it('should test onSubmit', () => {
        const mockSubmit = jest.fn();
        const component = shallow(
            <Comment commentBody={'owl'} onSubmit={mockSubmit}/>
        );
        const props = {
            id:2,
            comment_body:'test'
        }
        component.find('form').simulate('submit', props);
        expect(mockSubmit).toBeCalledWith({ 'comment_body': "test", "id": 2});
    })
})