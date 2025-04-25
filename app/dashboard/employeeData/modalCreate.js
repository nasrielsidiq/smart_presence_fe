import { useEffect, useState } from 'react';
import { ENDPOINTS } from "@/utils/config";
import Cookies from "js-cookie";
import Select from 'react-select';

const ModalCreate = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        serial_id: '',
        office_id: '',
        division_id: '',
        full_name: '',
        position: '',
        email: '',
        no_hp: '',
    });

    const [offices, setOffices] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [serialId, setSerialId] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const token = Cookies.get('token');
                const response = await fetch(ENDPOINTS.OFFICES, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                        'Authorization': 'Bearer ' + token,
                    }
                });
                const result = await response.json();
                if (!response.ok) {
                    const errorMessages = result.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
                    throw new Error(errorMessages || `HTTP error! status: ${response.status}`);
                }
                setOffices(result.offices.map(office => ({ value: office.id, label: office.name })));

                const responseDivisions = await fetch(ENDPOINTS.DIVISIONS, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'ngrok-skip-browser-warning': 'true',
                    }
                });
                const resultDivisions = await responseDivisions.json();
                console.log(resultDivisions);
                
                if (!responseDivisions.ok) {
                    const errorMessages = resultDivisions.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
                    throw new Error(errorMessages || `HTTP error! status: ${responseDivisions.status}`);
                }
                setDivisions(resultDivisions.divisions.map(division => ({ value: division.id, label: division.name })));
                const responseUnRegId = await fetch(ENDPOINTS.UNREGISTEDID, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'ngrok-skip-browser-warning': 'true'
                    }
                })
                const resultUnRegId = await responseUnRegId.json();
                if(!responseUnRegId.ok){
                    const errorMessages = resultUnRegId.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
                    throw new Error(errorMessages || `HTTP error! status: ${responseDivisions.status}`);
                }
                setSerialId(resultUnRegId.map(serial_id => ({ value: serial_id.serial_id, label: serial_id.serial_id })));
                // setSerialId(resultUnRegId);

            } catch (error) {
                setErrorMessage(error.message);
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    console.log(serialId);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
        }),
        indicatorSeparator: () => ({
            display: 'none', // Menghilangkan garis pemisah indikator
        }),
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        setFormData({
            ...formData,
            [actionMeta.name]: selectedOption ? selectedOption.value : null
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('token');
            const response = await fetch(ENDPOINTS.EMPLOYEES, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (!response.ok) {
                const errorMessages = result.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
                console.log(formData);
                
                throw new Error(errorMessages || `HTTP error! status: ${response.status}`);
            }
            console.log('User created:', result);
            closeModal();
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800/75 flex items-center justify-center">
            <div id="background" className="p-8 rounded-lg bg-white/30 border-2 border-white w-2/3">
                <form className="bg-white rounded-lg shadow-lg overflow-hidden" onSubmit={handleSubmit}>
                    <div className="px-6 py-3 flex justify-between bg-white items-center shadow-md">
                        <h3 className="text-lg font-bold text-blue pt-2">Create Employee</h3>
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
                                    <label className="block text-gray-700 font-medium">Serial ID</label>
                                    {/* <input type="text" name="serial_id" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.serial_id} onChange={handleChange} /> */}
                                    <Select
                                        name="serial_id"
                                        options={serialId}
                                        onChange={handleSelectChange}
                                        placeholder="Select Serial_id"
                                        className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-1 w-full"
                                        styles={customStyles}
                                    />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Office</label>
                                    <Select
                                        name="office_id"
                                        options={offices}
                                        onChange={handleSelectChange}
                                        placeholder="Select Office"
                                        className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-1 w-full"
                                        styles={customStyles}
                                    />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Division</label>
                                    <Select
                                        name="division_id"
                                        options={divisions}
                                        onChange={handleSelectChange}
                                        placeholder="Select Division"
                                        className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-1 w-full"
                                        styles={customStyles}
                                    />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Full Name</label>
                                    <input type="text" name="full_name" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.full_name} onChange={handleChange} />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Position</label>
                                    <input type="text" name="position" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.position} onChange={handleChange} />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Email</label>
                                    <input type="email" name="email" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">No HP</label>
                                    <input type="text" name="no_hp" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.no_hp} onChange={handleChange} />
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
};

export default ModalCreate;