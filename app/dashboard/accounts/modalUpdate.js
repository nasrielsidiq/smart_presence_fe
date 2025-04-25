import { ENDPOINTS } from "@/utils/config";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const ModalUpdate = ({ id, closeModal }) => {
    const [formData, setFormData] = useState({
        serial_id: '',
        username: '',
        password: '',
        privilage: 'admin', // Pastikan nilai default sesuai dengan nilai yang diharapkan oleh server
    });
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [imageProfile, setImageProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token');
                const response = await fetch(`${ENDPOINTS.USERS}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'ngrok-skip-browser-warning': 'true',
                        'content-type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setFormData({
                    serial_id: result.serial_id,
                    username: result.username,
                    password: '',
                    privilage: result.privilage,
                });

                const imageResponse = await fetch(ENDPOINTS.USERS + `/${result.id}/image`, {
                    headers: {
                      'ngrok-skip-browser-warning': 'true',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
                    }
                  });
                  if (!imageResponse.ok) {
                    throw new Error('Failed to fetch profile image');
                  }
                  const imageBlob = await imageResponse.blob();
                  const imageUrl = URL.createObjectURL(imageBlob);
                  setProfileImageUrl(imageUrl);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image_profile') {
            setImageProfile(files[0]);
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('token');
            const formDataToSend = new FormData();
            formDataToSend.append('serial_id', formData.serial_id);
            formDataToSend.append('username', formData.username);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('privilage', formData.privilage);
            if (imageProfile) {
                formDataToSend.append('image_profile', imageProfile);
            }

            console.log('FormData to send:', formDataToSend);

            const response = await fetch(ENDPOINTS.USERS+"/"+id, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    // 'content-type': 'application/json',
                    // 'ngrok-skip-browser-warning': 'true'
                },
                body: formDataToSend
            });
            const result = await response.json();
            if (!response.ok) {
                const errorMessages = result.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
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
                        <h3 className="text-lg font-bold text-blue pt-2">Create Account</h3>
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
                            <div className="flex items-center space-x-4">
                                <img src={profileImageUrl} alt="Profile Picture"
                                    className="rounded-full w-24 h-24 shadow-md" />
                                <div>
                                    <input name='image_profile' type="file" className="border focus:border-dodgerBlue rounded-lg px-4 py-2" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Serial ID</label>
                                    <input type="text" name="serial_id" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.serial_id} onChange={handleChange} />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Username</label>
                                    <input type="text" name="username" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.username} onChange={handleChange} />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Password</label>
                                    <input type="password" name="password" className="border-2 rounded-lg border-dodgerBlue hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.password} onChange={handleChange} />
                                </div>
                                <div className="mx-5">
                                    <label className="block text-gray-700 font-medium">Privilege</label>
                                    <select name="privilage" className="border-2 border-dodgerBlue rounded-lg hover:bg-blue-100 text-dodgerBlue mt-2 px-4 py-2 w-full" value={formData.privilage} onChange={handleChange}>
                                        <option value="admin">Admin</option>
                                        <option value="supervisor">Supervisor</option>
                                        <option value="top manager">Top Manager</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 text-right">
                        <button type="submit" className=" bg-dodgerBlue text-white font-medium px-16 py-2 rounded-lg hover:bg-blue-600">SEND</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalUpdate;