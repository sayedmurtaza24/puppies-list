import React from 'react'
import { Puppy } from '../puppy.interface';
import PuppyItem from './PuppyItem';
import './PuppyList.css';

function PuppyList(props: { puppyList: Puppy[], onDelete: (id: number) => void }) {
    return (
        <div className='puppy-list'>
            {props.puppyList.map(puppy => <PuppyItem key={puppy.id} puppy={puppy} onDelete={props.onDelete} />)}
        </div>
    )
}

export default PuppyList