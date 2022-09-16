import React from 'react'
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { FormInput, Puppy } from '../puppy.interface';
import './EditPuppy.css'

function EditPuppy(props: { puppy: Puppy, onSubmit: (data: FormInput) => void }) {
    const defaultValues = props.puppy;

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormInput>({ defaultValues });

    const onSubmit: SubmitHandler<FormInput> = data => {
        props.onSubmit(data);
        reset();
    };

    const footer = (<Button type="submit" className='p-button-sm' label='Edit Puppy' style={{ width: '100%' }} />)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card footer={footer}>
                <div className='edit-puppy-form'>
                    <span className="p-float-label">
                        <Controller name="name" control={control} rules={{ required: 'required' }} render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                        )} />
                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name* {errors.name && '(required)'}</label>
                    </span>
                    <span className="p-float-label">
                        <Controller name="breed" control={control} rules={{ required: 'required' }} render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                        )} />
                        <label htmlFor="breed" className={classNames({ 'p-error': errors.breed })}>Breed* {errors.breed && '(required)'}</label>
                    </span>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="dob" control={control} rules={{ required: 'required' }} render={({ field, fieldState }) => (
                                <Calendar id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.value)} />
                            )} />
                            <label htmlFor="dob" className={classNames({ 'p-error': errors.dob })}>Birthday* {errors.dob && '(required)'}</label>
                        </span>
                    </div>
                </div>
            </Card>
        </form>
    )
}

export default EditPuppy