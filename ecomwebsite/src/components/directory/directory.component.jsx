import React, { useContext } from 'react';
import MenuItem from '../menu-items/menuitems.component';
import './directory.component.scss'
import { DirectoryContext } from '../../context/directory.context';
const Directory = () => {
  const { sections } = useContext(DirectoryContext); 

  return (
    <div className='directory-menu'>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};
export default Directory;