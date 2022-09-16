import React from 'react'
import { FormInput, Puppy } from '../puppy.interface';
import PuppyItem from './PuppyItem';
import './PuppyList.css';

function PuppyList(props: { puppyList: Puppy[], onEdit: (id: number, puppy: FormInput) => void, onDelete: (id: number) => void }) {
    return (
        <div className='puppy-list'>
            {props.puppyList.map(puppy => <PuppyItem onEdit={props.onEdit} key={puppy.id} puppy={puppy} onDelete={props.onDelete} />)}
        </div>
    )
}

export default PuppyList