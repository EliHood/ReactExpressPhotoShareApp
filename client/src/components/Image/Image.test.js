import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount} from 'enzyme';
import Image from './Image';

describe('render <Image/> Component', () => {

    it('should render image component', () => {

        const wrapper = shallow(<Image/>)
        
        expect(wrapper.find('img')).toHaveLength(1);

    })

    it('should test for image_url prop', () => {
        const url = 'https://res.cloudinary.com/dq281hpqd/image/upload/v1559697741/s3wxjfweznq8kqum2p0x.png';
        const wrapper = mount(<Image image_url={url}/>)
        
        expect(wrapper.props().image_url).toEqual(url);
        expect(wrapper).toMatchSnapshot(); 
       
    })
})