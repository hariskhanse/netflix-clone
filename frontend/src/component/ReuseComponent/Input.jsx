const Input = ({ label, type, id, value, onChange, placeholder }) => {
    return (
        <div>
            <label htmlFor={id} className='text-sm font-medium text-gray-300 block'>
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
            />
        </div>
    );
};

export default Input;
