import React from 'react'
import { Puppy } from '../puppy.interface'
import { Button } from 'primereact/button';
import './PuppyItem.css';

function PuppyItem(props: { puppy: Puppy, onDelete: (id: number) => void }) {
    return (
        <div className='puppy'>
            <h3>{props.puppy.name}</h3>
            <p>{props.puppy.breed}</p>
            <p>{props.puppy.dob.toLocaleDateString()}</p>
            <Button icon="pi pi-trash" onClick={() => props.onDelete(props.puppy.id)} className="p-button-rounded p-button-danger p-button-text" aria-label="Cancel" />
        </div>
    )
}

export default PuppyItem