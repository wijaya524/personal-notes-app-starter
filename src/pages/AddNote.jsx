import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';

const AddNotePage = () => {


    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();


    const addHandler = (e) => {
        e.preventDefault()
        addNote({ title, body});

        setTitle('');
        setBody("");
        navigate("/")
    };

    return (
        <div className='add-new-page__input'>
            <form onSubmit={addHandler} >
                <section>        
                    <input placeholder='Masukan Judul Catatan...' className='add-new-page__input__title' type="text" required id='titleNotes' value={title} onChange={(e) => setTitle(e.target.value)} />
                </section>
                <section>
                    <textarea  placeholder="Masukan Isi Catatan..." className='add-new-page__input__body' id="bodyNotes" value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
                </section>
                <button className='submit-add_notes' type='submit'>Konfirmasi</button>
            </form>
        </div>
    )
}

export default AddNotePage;