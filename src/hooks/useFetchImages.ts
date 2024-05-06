import { useEffect, useState } from 'react';

export function useFetchImages(page: number) {
	const apiKey = '849699968ed280ffa0b80ce8222b1fec';
	const apiSecret = 'e4860b664f50caac';

	const [currentImages, setCurrentImages] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<unknown | null>(null);
  
	const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchQuery}&format=json&nojsoncallback=1&page=${page}`;

	useEffect(() => {
		const fetchImages = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error('Failed to fetch');
				}
				const data = await response.json();
				setCurrentImages(data);
			} catch (error: unknown) {
          if (error instanceof Error) {
				    setError(error.message);
					}
			} finally {
				setIsLoading(false);
			}
		};
		fetchImages();
	}, [page]);

	return { currentImages, isLoading, error };
}
