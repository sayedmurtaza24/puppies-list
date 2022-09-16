import { FormInput, Puppy } from "./puppy.interface";

interface APIPuppy {
    id: number;
    name: string;
    breed: string;
    dob: string;
}

export const getAllPuppies = async (): Promise<Puppy[]> => {
    const response = await fetch('http://localhost:4000/api/puppies');
    if (response.ok) {
        const json: APIPuppy[] = await response.json();
        return json.map(p => ({ ...p, dob: new Date(p.dob) }));
    } else {
        console.log(response);
        throw Error('Error while fetching puppies from API!');
    }
}

export const addPuppy = async (data: FormInput): Promise<void> => {
    const response = await fetch('http://localhost:4000/api/puppies', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
        throw Error('Error while adding puppies!')
    }
}

export const editPuppy = async (id: number, data: FormInput): Promise<void> => {
    const response = await fetch('http://localhost:4000/api/puppies/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw Error('Error while updating puppy');
    }
}

export const deletePuppy = async (id: number): Promise<void> => {
    const response = await fetch('http://localhost:4000/api/puppies/' + id, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw Error('Error while deleting puppies!')
    }
}