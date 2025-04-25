import { ENDPOINTS } from "@/utils/config";
import Cookies from "js-cookie";
import { useState } from "react";

const FormAccount = ({ closeForm, data }) => {
    const [formData, setFormData] = useState({
        username: data?.username || '',
        password: data?.password || '',
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
            const response = await fetch(ENDPOINTS.ME + `/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (!response.ok) {
                const errorMessages = result.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
                throw new Error(errorMessages || `HTTP error! status: ${response.status}`);
            }
            console.log('User updated:', result);
            closeForm();
        }catch (error) {
            console.error('Error updating user:', error);
        };
    }

        return (
            // <div className="mt-5 basis-1/2">
            //     <div className="flex flex-wrap w-max">
            <div className="bg-white mt-5 py-4 px-6 rounded-lg shadow-lg basis-2/5 font-montserrat">
                <h2 className="text-dodgerBlue font-semibold mb-6">Edit Account</h2>
                <form className="grid grid-cols-1 gap-1" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="block text-gray-500  text-xs mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            // placeholder="muca"
                            className="w-full px-4 py-1 border text-xs border-dodgerBlue hover:bg-blue-100 rounded-lg text-blue-600 shadow-md"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-500 text-xs mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            // placeholder="••••••••"
                            className="w-full px-4 py-1 border text-xs rounded-lg border-dodgerBlue hover:bg-blue-100 text-blue-600 shadow-md"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button onClick={closeForm} className="bg-red-600 hover:bg-red-700 text-white text-xs px-6 py-1 rounded-lg font-medium shadow-lg">
                            Cancel
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-1 text-xs rounded-lg font-medium shadow-lg">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            //     </div>
            // </div>
        );
    }

    export default FormAccount;
