import { useState, useEffect, useRef } from 'react';

function NameInput({ value, onChange }) {
    const [nameValidation, setNameValidation] = useState("");
    const selectRef = useRef(null);

    useEffect(() => {
        const handleInputChange = (value) => {
            const error = validateInput(value);
            setNameValidation(error);
        };
        handleInputChange(value);
    }, [value]);

    useEffect(() => {
        if (selectRef.current) {
            selectRef.current.focus();
        }
    }, []);
    const inputChange = (e) => {
        const { value } = e.target;
        onChange(value);
    };

    const validateInput = (value) => {
        let error = "";

        const words = value.trim().split(" ");
        if (words.length < 2) {
            error = "Unesite i ime i prezime";
        }

        return error;
    };

    return (
        <div className="form-group">
            <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">👤</span>
                <input 
                    type="text" 
                    className='form-control' 
                    placeholder="Ime i prezime" 
                    value={value} 
                    onChange={inputChange}
                    ref={selectRef}
                />
            </div>
            {nameValidation && <div className="error-message"><p style={{ color: 'red', textAlign:'center' }}>{nameValidation}</p></div>}
        </div>
    );
}


export default NameInput;
