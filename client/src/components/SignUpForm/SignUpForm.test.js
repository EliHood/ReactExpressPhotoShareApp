import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import toJson from 'enzyme-to-json';
import SignUpForm from './SignUpForm';

describe('should render <SignUpForm/>', () => {
  it('should render SignUpForm', () => {
    const wrapper = shallow(<SignUpForm />);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('should match SignUpForm snap', () => {
    const wrapper = shallow(<SignUpForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Button', () => {
    const wrapper = shallow(<SignUpForm />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
