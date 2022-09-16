import React, { useEffect, useState } from 'react';
import AddPuppyForm from './components/AddPuppyForm';
import PuppyList from './components/PuppyList';
import { FormInput, Puppy } from './puppy.interface';
import { getAllPuppies, deletePuppy, addPuppy, editPuppy } from './api';
import './App.css';

function App() {
  const [puppyList, setPuppyList] = useState<Puppy[]>([]);

  useEffect(() => {
    getAllPuppies().then(setPuppyList).catch(console.log);
  }, []);

  const onAddPuppy = (data: FormInput) => {
    addPuppy(data).then(getAllPuppies).then(setPuppyList).catch(console.log);
  }

  const onEditPuppy = (id: number, puppy: FormInput) => {
    editPuppy(id, puppy).then(getAllPuppies).then(setPuppyList).catch(console.log);
  }

  const onDelete = (id: number) => {
    deletePuppy(id).then(getAllPuppies).then(setPuppyList).catch(console.log);
  }

  return (
    <div className="app">
      <h1>Puppies List</h1>
      <div>
        <AddPuppyForm onSubmit={onAddPuppy} />
        <PuppyList onEdit={onEditPuppy} puppyList={puppyList} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default App;
