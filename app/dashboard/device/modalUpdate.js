import { useEffect, useState } from 'react';
import { ENDPOINTS } from "@/utils/config";
import Cookies from "js-cookie";
import Select from 'react-select';

const ModalUpdate = ({ closeModal, id }) => {

    const [formData, setFormData] = useState({
        device_code: '',
        device_name: '',
        status: '',
        location: '',
    });

    const [status, setStatus] = useState([
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ]);

    const [errorMessage, setErrorMessage] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'office_id' || name === 'division_id' ? parseInt(value) : value
        });
    };

    useEffect(() => {
        async function fetchData() {
            try{
                const token = Cookies.get('token');
                const response = await fetch(ENDPOINTS.DEVICE+`/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                        'Authorization': 'Bearer ' + token,
                    }
                });
                if (!response.ok) {
                    const result = await response.json();
                    // const errorMessages = result.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
                    console.log(id);
                    
                    throw new Error(result.errors || `HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setFormData(result);
            }catch(error){
                setErrorMessage(error.message);
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleSelectChange = (selectedOption, actionMeta) => {
        setFormData({
            ...formData,
            [actionMeta.name]: selectedOption ? selectedOption.value : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('token');
            const response = await fetch(ENDPOINTS.DEVICE + `/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (!response.ok) {
                // const errorMessages = result.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
                throw new Error(result.errors || `HTTP error! status: ${response.status}`);
            }
            console.log('User created:', result);
            closeModal();
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Error creating user:', error);
        }
    };

    

    const customStyles = {
        container: (provided) => ({
            ...provided,
            height: '44px', // Atur lebar box di sini
        }),
        control: (provided) => ({
            ...provided,
            border: 'none', // Menghilangkan border
            boxShadow: 'none', // Menghilangkan shadow saat fokus
            backgroundColor: 'none', // Warna latar belakang
            '&:hover': {
                border: 'none', // Menghilangkan border saat hover
                backgroundColor: 'none', // Warna latar belakang saat hover
            },
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#3182ce', // Warna indikator dropdown
            // zIndex: 100, // Pastikan indikator berada di atas
        }),
        indicatorSeparator: () => ({
            display: 'none', // Menghilangkan garis pemisah indikator
        }),
        // menu: (provided) => ({
        //     ...provided,
        //     zIndex: 100, // Pastikan menu berada di atas
        // }),
    };

    return (
        <div className="fixed inset-0 bg-gray-800/75 flex items-center justify-center">
            <div id="background" className="p-8 rounded-lg bg-white/30 border-2 border-white w-2/3">
                <form className="bg-white rounded-lg shadow-lg " onSubmit={handleSubmit}>
                    <div className="px-6 py-3 flex justify-between bg-white items-center shadow-md">
                        <h3 className="text-lg font-bold text-blue pt-2">Update Device</h3>
                        <button type="button" className="text-gray-400 hover:text-gray-600" onClick={closeModal}>
                            <svg className="h-6 w-6 mt-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="px-6 py-4">
                        {errorMessage && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{errorMessage}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => setErrorMessage('')}>
                                        <title>Close</title>
                                        <path d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.934 2.935a1 1 0 01-1.414-1.414l2.935-2.934-2.935-2.934a1 1 0 011.414-1.414L10 8.586l2.934-2.935a1 1 0 011.414 1.414L11.414 10l2.935 2.934a1 1 0 010 1.415z" />
                                    </svg>
                                </span>
                            </div>
                        )}
                        <div className="mt-2">
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Device Code</label>
                                    <input type="text" name="device_code" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.device_code} onChange={handleChange} />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Device Name</label>
                                    <input type="text" name="device_name" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.device_name} onChange={handleChange} />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Status</label>
                                    {/* <input type="text" name="status" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.name} onChange={handleChange} /> */}
                                    <Select
                                        name="status"
                                        options={status}
                                        onChange={handleSelectChange}
                                        value={formData.status ? status.find(option => option.value === formData.status) : null}
                                        placeholder="Select Status"
                                        className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-1 w-full"
                                        styles={customStyles}
                                    />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Location</label>
                                    <input type="text" name="location" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.location} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 text-right">
                        <button type="submit" className=" bg-dodgerBlue text-white font-medium px-16 py-2 mr-5 mb-5 rounded-lg hover:bg-blue-600">SEND</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalUpdate;