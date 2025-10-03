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
        <div className="add-new-page__input max-w-3xl mx-auto p-4 sm:p-6 md:p-8  rounded-lg shadow-md transition-colors">
            <form onSubmit={addHandler} className="flex flex-col gap-4">
                <section>        
                    <input 
                        placeholder='Masukan Judul Catatan...' 
                        className='add-new-page__input__title w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                        type="text" 
                        required 
                        id='titleNotes' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </section>
                <section>
                    <textarea  
                        placeholder="Masukan Isi Catatan..." 
                        className='add-new-page__input__body w-full h-40 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none'
                        id="bodyNotes" 
                        value={body} 
                        onChange={(e) => setBody(e.target.value)} 
                    ></textarea>
                </section>
                <button 
                    className='submit-add_notes bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-2xl shadow-lg transition-transform '
                    type='submit'
                >
                    Konfirmasi
                </button>
            </form>
        </div>
    )
}

export default AddNotePage;
