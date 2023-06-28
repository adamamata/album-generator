export function Input(props: React.HTMLProps<HTMLInputElement>) {
    return (
        <input {...props} type='text' className='border border-gray-800 px-4 py-2 rounded'></input>
    );   
}
