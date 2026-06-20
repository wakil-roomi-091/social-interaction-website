import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2, User, MessageSquare } from 'lucide-react'; // ✅ Removed Users icon
import { searchAPI } from '../../services/api';
import toast from 'react-hot-toast';

const SearchBar = ({ autoFocus = false, onClose = null }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [autoFocus]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim().length >= 2) {
                performSearch(query.trim());
            } else {
                setResults(null);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const performSearch = async (searchQuery) => {
        setIsLoading(true);
        setIsOpen(true);
        try {
            const response = await searchAPI.search(searchQuery);
            setResults(response.data.data);
        } catch (error) {
            console.error('Search error:', error);
            toast.error('Failed to search');
            setResults(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setQuery('');
        setResults(null);
        setIsOpen(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleResultClick = (type, id) => {
        setIsOpen(false);
        setQuery('');
        setResults(null);
        if (onClose) onClose();

        if (type === 'user') {
            navigate(`/profile/${id}`);
        } else if (type === 'post') {
            navigate(`/feed`); // Navigate to feed instead of post page
        }
    };

    const totalResults = results
        ? (results.users?.length || 0) + (results.posts?.length || 0)
        : 0;

    return (
        <div className="relative w-full" ref={containerRef}>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft/60" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (query.trim().length >= 2 && results) {
                            setIsOpen(true);
                        }
                    }}
                    placeholder="Search people or posts..."
                    className="w-full px-11 py-2.5 rounded-pill bg-cream-deep border border-[#1C1B19]/[0.08] focus:border-moss/50 focus:ring-2 focus:ring-moss/20 outline-none text-sm text-ink placeholder:text-ink-soft/60 transition-all duration-200"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-cream-deep/70 transition-colors"
                    >
                        <X className="w-4 h-4 text-ink-soft/60" />
                    </button>
                )}
                {isLoading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-4 h-4 text-moss animate-spin" />
                    </div>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && results && totalResults > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-paper border border-[#1C1B19]/[0.08] rounded-xl shadow-[0_16px_40px_-10px_rgba(28,27,25,0.2)] max-h-[420px] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Users */}
                    {results.users?.length > 0 && (
                        <div className="py-2">
                            <div className="px-4 py-1.5 text-xs font-semibold text-ink-soft uppercase tracking-wider">
                                People
                            </div>
                            {results.users.map((user) => (
                                <button
                                    key={user._id}
                                    onClick={() => handleResultClick('user', user._id)}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream-deep transition-colors text-left"
                                >
                                    <img
                                        src={user.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces'}
                                        alt={user.name}
                                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-ink truncate">{user.name}</div>
                                        <div className="text-xs text-ink-soft truncate">{user.email}</div>
                                    </div>
                                    <User className="w-4 h-4 text-ink-soft/40 flex-shrink-0" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Posts */}
                    {results.posts?.length > 0 && (
                        <div className="py-2 border-t border-[#1C1B19]/[0.06]">
                            <div className="px-4 py-1.5 text-xs font-semibold text-ink-soft uppercase tracking-wider">
                                Posts
                            </div>
                            {results.posts.map((post) => (
                                <button
                                    key={post._id}
                                    onClick={() => handleResultClick('post', post._id)}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream-deep transition-colors text-left"
                                >
                                    <div className="w-9 h-9 rounded-full bg-moss/10 flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="w-4 h-4 text-moss" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm text-ink-soft truncate">{post.content || 'Post with image'}</div>
                                        <div className="text-xs text-ink-soft/60">by {post.user?.name || 'User'}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* No Results */}
            {isOpen && query.trim().length >= 2 && results && totalResults === 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-paper border border-[#1C1B19]/[0.08] rounded-xl shadow-[0_16px_40px_-10px_rgba(28,27,25,0.2)] p-6 text-center z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <p className="text-ink-soft text-sm">No results found for "{query}"</p>
                    <p className="text-xs text-ink-soft/60 mt-1">Try searching for people or posts</p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;