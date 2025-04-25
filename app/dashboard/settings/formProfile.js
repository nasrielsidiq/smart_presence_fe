import { ENDPOINTS } from "@/utils/config";
import Cookies from "js-cookie";
import { useState } from "react";

const FormProfile = ({ closeForm, data}) => {
    const [formData, setFormData] = useState({
        full_name: data?.employee?.full_name || '',
        position: data?.employee?.position || '',
        email: data?.employee?.email || '',
        no_hp: data?.employee?.no_hp || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('token');
            const response = await fetch(ENDPOINTS.EMPLOYEES + `/${data?.employee?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (!response.ok) {
                // const errorMessages = result.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
                throw new Error(result.errors || `HTTP error! status: ${response.status}`);
            }
            console.log('User updated:', result);
            closeForm();
        }catch (error) {
            console.error('Error updating user:', error);
        };
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white mt-5 py-4 px-6 rounded-lg shadow-lg basis-3/5 font-montserrat">
            <h2 className="text-dodgerBlue font-semibold mb-6">Edit Profile</h2>

            <div className="grid grid-cols-2 gap-2">
                

                <div>
                    <label htmlFor="fullName" className="block text-gray-500 text-xs mb-1">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-1 border border-dodgerBlue text-xs rounded-lg text-blue-600 shadow-md"
                    />
                </div>


                <div>
                    <label htmlFor="email" className="block text-gray-500 text-xs mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-1 border border-dodgerBlue text-xs rounded-lg text-blue-600 shadow-md"
                    />
                </div>

                <div>
                    <label htmlFor="noHp" className="block text-gray-500 text-xs mb-1">No HP</label>
                    <input
                        type="text"
                        name="no_hp"
                        value={formData.no_hp}
                        onChange={handleChange}
                        className="w-full px-4 py-1 border border-dodgerBlue text-xs rounded-lg text-blue-600 shadow-md"
                    />
                </div>

                <div>
                    <label htmlFor="officeId" className="block text-gray-500 text-xs mb-1">Office</label>
                    <input
                        type="text"
                        name="officeId"
                        disabled
                        value={data?.office?.name}
                        className="disabled:bg-gray-300 disabled:text-gray-500 w-full px-4 py-1 border border-dodgerBlue text-xs rounded-lg text-blue-600 shadow-md"
                    />
                </div>

                <div>
                    <label htmlFor="divisionId" className="block text-gray-500 text-xs mb-1">Division</label>
                    <input
                        type="text"
                        name="divisionId"
                        disabled
                        value={data?.division?.name}
                        className="disabled:bg-gray-300 disabled:text-gray-500 w-full px-4 py-1 border border-dodgerBlue text-xs rounded-lg text-blue-600 shadow-md"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={closeForm} className="bg-red-600 hover:bg-red-700 text-white text-xs px-6 py-1 rounded-lg font-medium shadow-lg">
                    Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-1 rounded-lg text-xs font-medium shadow-lg">
                    Save
                </button>
            </div>
        </form>
    );
};

export default FormProfile;
