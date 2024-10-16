import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function PhotoList() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    //const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const getPhotoList = async () => {
            setLoading(true);
            //await delay(2000);
            try {
                const response = await axios.get(`https://api.unsplash.com/photos`, {
                    params: {
                        client_id: import.meta.env.VITE_CLIENT_ID,
                        page: page,
                        per_page: 12,
                    },
                });
                setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
            } catch (error) {
                console.error("Error fetching photos:", error);
            } finally {
                setLoading(false);
            }
        };

        getPhotoList();
    }, [page]);

    const handleScroll = () => {
        if (!loading) {
            const scrollPosition = window.innerHeight + window.scrollY - 16;
            const documentHeight = document.body.scrollHeight;
            console.log(scrollPosition, documentHeight)
            if (Math.round(scrollPosition) == Math.round(documentHeight)) {
                console.log(scrollPosition, documentHeight)
                setPage((prev) => prev + 1);
            }
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="text-center text-3xl font-bold mt-4">Photo Gallery</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {photos.map(photo => (
                    <Link to={`/photos/${photo.id}`} key={photo.id}>
                        <div className="relative group overflow-hidden">
                            <img
                                src={photo.urls.thumb}
                                alt={photo.alt_description}
                                className="w-full h-96 rounded transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:relative group-hover:z-50"
                            />
                            <div className="absolute bottom-0 left-0 w-full text-white p-2 group-hover:text-center group-hover:z-50">
                                {photo.user.name}
                            </div>
                        </div>
                    </Link>
                ))}
                <p className="col-span-full text-center">Loading more photos...</p>
            </div>
        </>
    );
}