'use client';

import { ENDPOINTS } from '@/utils/config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import FormProfile from './formProfile';
import FormAccount from './formAccount';

export default function SettingsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isFormAccountOpen, setIsFormAccountOpen] = useState(false);
  const [isFormProfileOpen, setIsFormProfileOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = Cookies.get('token'); // Pastikan token diambil dari cookies
        const response = await fetch(ENDPOINTS.ME, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': 'Bearer ' + token // Tambahkan Bearer token ke header Authorization
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);

        // Fetch profile image
        const imageResponse = await fetch(ENDPOINTS.USERS + `/${result.user.id}/image`, {
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
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Ambil file dari input
    if (file) {
        try {
            const token = Cookies.get('token'); // Ambil token dari cookies
            const formData = new FormData(); // Gunakan FormData untuk mengirim file
            formData.append('image_profile', file);

            // Kirim file ke API
            const response = await fetch(ENDPOINTS.USERS + `/${data?.user?.id}/image`, {
                method: 'PUT',
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'Authorization': 'Bearer ' + token, // Sertakan token untuk autentikasi
                },
                body: formData, // Kirim FormData sebagai body
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const result = await response.json();
            console.log('Image uploaded:', result);

            // Perbarui URL gambar profil setelah berhasil diunggah
            const imageUrl = URL.createObjectURL(file);
            setProfileImageUrl(imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
};

  const handleOpenFormAccount = () => {
    setIsFormAccountOpen(true);
  }
  const handleCloseFormAccount = () => {
    setIsFormAccountOpen(false);
  }
  const handleFormProfileToggle = () => {
    setIsFormProfileOpen(!isFormProfileOpen);
  }

  return (
    <div className="ml-1">
      <div className="text-white">
        <div className="flex gap-2">
          <i className="bi bi-gear-fill text-lg"></i>
          <span className="pt-[2px]">Settings</span>
          <p>/</p>
        </div>
        <span className="pl-7 font-bold">Settings</span>
      </div>

      <div className=" font-montserrat">
        <div className="flex bg-white p-4 rounded-lg shadow-lg justify-between mt-38">
          <div className="flex items-center">
            <div className="relative w-15 h-15 rounded-lg bg-gray-200 bg-cover bg-center group" style={{ backgroundImage: `url(${profileImageUrl === null ? "/img/person-fill.svg" : profileImageUrl})` }}>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <i className="bi bi-pencil-fill text-white text-lg"></i>
              </div>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
            <div className="ml-6">
              <h4 className="font-bold">{data?.employee?.full_name}</h4>
              <p className="text-gray-500">{data?.employee?.position}</p>
            </div>
          </div>
          <div className="flex justify-end ">
            <h4 className="text-gray-500 my-auto">ID: {data?.user?.serial_id}</h4>
          </div>
        </div>

        <div className="flex gap-3">
          {!isFormAccountOpen ? (
            <div className="bg-white py-4 px-6 rounded-lg shadow-lg basis-2/5 mt-5 font-montserrat h-32">
              <div className="flex justify-between w-full">
                <span className="text-dodgerBlue font-bold">Account</span>
                <a onClick={handleOpenFormAccount}>
                  <i className="bi bi-pencil-fill text-white bg-dodgerBlue px-1.5 py-1 rounded-full"></i>
                </a>
              </div>

              <div className="justify-between flex mt-8 text-xs">
                <span className="text-gray-500">Username</span>
                <span>{data?.user?.username}</span>
              </div>
              <div className="justify-between flex mt-2 text-xs">
                <span className="text-gray-500">Password</span>
                <span></span>
              </div>
            </div>
          ) : (<FormAccount closeForm={handleCloseFormAccount} data={data?.user} />)}

          {!isFormProfileOpen ? (
            <div className="bg-white py-4 px-6 rounded-lg shadow-lg basis-3/5 mt-5 font-montserrat h-50">
              <div className="flex justify-between w-full">
                <span className="text-dodgerBlue font-bold">Profile</span>
                <a onClick={handleFormProfileToggle}>
                  <i className="bi bi-pencil-fill text-white bg-dodgerBlue px-1.5 py-1 rounded-full"></i>
                </a>
              </div>

              <div className="justify-between flex mt-8 text-xs">
                <span className="text-gray-500">Name</span>
                <span>{data?.employee?.full_name}</span>
              </div>
              <div className="justify-between flex mt-2 text-xs">
                <span className="text-gray-500">Email Address</span>
                <span>{data?.employee?.email}</span>
              </div>
              <div className="justify-between flex mt-2 text-xs">
                <span className="text-gray-500">Phone Number</span>
                <span>{data?.employee?.no_hp}</span>
              </div>
              <div className="justify-between flex mt-2 text-xs">
                <span className="text-gray-500">Office</span>
                <span>{data?.office?.name}</span>
              </div>
              <div className="justify-between flex mt-2 text-xs">
                <span className="text-gray-500">Divisi</span>
                <span>{data?.division?.name}</span>
              </div>
            </div>
          ) : (<FormProfile closeForm={handleFormProfileToggle} data={data} />)}

        </div>
      </div>
    </div>
  );
}