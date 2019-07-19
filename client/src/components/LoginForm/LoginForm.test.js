import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import toJson from 'enzyme-to-json';
import LoginForm from './LoginForm';


describe('should render <LoginForm/> Component', () => {
  it('should render <LoginForm/> component', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('should snap <LoginForm/> component', () => {
    const wrapper = shallow(<LoginForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render button', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
