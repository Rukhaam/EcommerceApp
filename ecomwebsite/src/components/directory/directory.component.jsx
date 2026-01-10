import React from 'react';
 import MenuItem  from '../menu-items/menuitems.component';
 import './directory.component.scss'
import { selectDirectorySections } from '../../Redux/Directory/directory.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
const Directory  = ({sections})=>(
      <div className='directory-menu'>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
    );
const mapStateToProps = createStructuredSelector(
  {
    sections : selectDirectorySections
  }
)
export  default connect (mapStateToProps)(Directory);