import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoMdPerson } from "react-icons/io";
import axios from 'axios';

export function PhotoDetail() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPhotoDetail = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
                    params: {
                        client_id: import.meta.env.VITE_CLIENT_ID,
                    },
                });
                setPhoto(response.data);
            } catch (error) {
                console.error("Error fetching photo detail:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPhotoDetail();
    }, [id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!photo) {
        return <div className="text-center">Photo not found!</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <button
                onClick={() => navigate('/')}
                className="mb-4 p-2 bg-green-500 text-white rounded ml-2"
            >
                Photo Gallery
            </button>
            <h3 className="text-xl text-center font-bold">{photo.alt_description || "No title available."}</h3>
            <img
                src={photo.urls.full}
                alt={photo.alt_description}
                className="w-full rounded-lg mb-4"
            />
            <div className="flex items-center mb-2">
                <IoMdPerson className="text-2xl mr-2" />
                <h2 className="text-2xl font-semibold">{photo.user.name}</h2>
            </div>
            <h3 className="text-xl">{photo.description || "No description available."}</h3>
        </div>
    );
}
