import { useEffect, useState } from "react";
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    // 1. 로딩 상태
    const [isPending, setIsPending] = useState(false);
    //2. 에러 상태
    const [isError, setIsError] = useState(false);
    //3. 페이지
    const [page, setPage] = useState(1);

    const {category} = useParams<{
        category: string;
    }>();

    useEffect(() : void => {
        const fetchMovies = async () => {
            setIsPending(true);
        try {
            const {data} = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    }
                }
            );
                setMovies(data.results);
                setIsPending(false);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchMovies();
 }, [page, category]);

if (isError) {
    return (
        <div>
            <span className='text-red-500 text-2xl'>영화 정보를 불러오는데 실패했습니다.</span>
        </div>
    );
}
    
 return(
    <>
    <div className='flex items-center justify-center gap-4 mt-5'>
        <button className='bg-blue-500 text-white rounded-md px-4 py-2 rounded-md shadow-md 
        hover:bg-blue-600 transition-all duration-200 cursor-pointer'
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)} > {`<`} </button>
        <span className="text-white">{page} 페이지</span>
        <button className='bg-blue-500 text-white rounded-md px-4 py-2 rounded-md shadow-md 
        hover:bg-blue-600 transition-all duration-200 cursor-pointer'
        onClick={() => setPage((prev) => prev + 1)}> {`>`} </button>
    </div>
    {isPending && (
        <div className='flex items-center justify-center h-dvh'>
            <LoadingSpinner />
        </div>
    )}
    {!isPending && (
        <div className='grid gap-4 grid-cols-2 mt-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
    )}
        
    </>
 );
}