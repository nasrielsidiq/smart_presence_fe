'use client';
import { useState } from "react";

export default function settingsLayout({ children }) {
    const [backgroundImageUrl, setBackgroundImageUrl] = useState("/img/gedung.jpg"); // Simpan URL gambar dalam variabel

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-1/2 bg-cover bg-center -z-10"
                style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
            ></div>
            <div className="relative z-10">{children}</div>
        </>
    );
}