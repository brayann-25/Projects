import {useState} from 'react';
import './Contador.css';

export function Contador() {
    const [count, setCount] = useState(0);
    return (
        <div className='c-container'>
            <h1 className='c-header'>Contador: {count}</h1>
            <div className='c-buttons-container'>
            <button className='c-button increment' onClick={() => setCount(count + 1)}>Aumentar</button>
            <button className='c-button decrement' onClick={() => setCount(count - 1)}>Disminuir</button>
            </div>
        </div>
    );
}

