import { NavLink } from "react-router-dom";

const LINKS = [
    { to: '/', label: 'Home' },
    { to: '/movies/popular', label: 'Popular' },
    { to: '/movies/upcoming', label: 'Upcoming' },
    { to: '/movies/now_playing', label: 'Now Playing' },
    { to: '/movies/top_rated', label: 'Top Rated' },
];

export const Navbar = () => {
    return <div className="flex gap-5 p-2 text-white">
        {LINKS.map(({to, label}) => (
            <NavLink
                key={to}
                to={to}
                className={({isActive}) => {
                    return isActive
                        ? 'text-blue-500 font-bold'
                        : 'hover:text-blue-500 transition-all duration-200';
                }}
            >
                {label}
            </NavLink>
        ))}
    </div>;
};