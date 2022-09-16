import React, { useRef, useState } from 'react'
import { FormInput, Puppy } from '../puppy.interface'
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import './PuppyItem.css';
import EditPuppy from './EditPuppy';

function PuppyItem(props: { puppy: Puppy, onDelete: (id: number) => void, onEdit: (id: number, puppy: FormInput) => void }) {
    const op = useRef<OverlayPanel>(null);
    const [eventObj, setEventObj] = useState<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

    const onPuppyEdit = (data: FormInput) => {
        props.onEdit(props.puppy.id, data);
        op.current?.toggle(eventObj);
    }

    return (
        <div className='puppy'>
            <h3>{props.puppy.name}</h3>
            <p>{props.puppy.breed}</p>
            <p>{props.puppy.dob.toLocaleDateString()}</p>
            <Button icon="pi pi-pencil" onClick={e => { op.current?.toggle(e); setEventObj(e) }} className="p-button-rounded p-button-text" aria-label="Cancel" />
            <OverlayPanel ref={op}>
                <EditPuppy puppy={props.puppy} onSubmit={onPuppyEdit} />
            </OverlayPanel>
            <Button icon="pi pi-trash" onClick={() => props.onDelete(props.puppy.id)} className="p-button-rounded p-button-danger p-button-text" aria-label="Cancel" />
        </div>
    )
}

export default PuppyItem