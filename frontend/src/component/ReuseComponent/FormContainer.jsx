const FormContainer = ({ title, children }) => {
    return (
        <div className='flex justify-center items-center mt-20 mx-3'>
            <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                <h1 className='text-center text-white text-2xl font-bold mb-4'>{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default FormContainer;
