import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import AuthCard from '../components/auth/AuthCard';
import AuthInput from '../components/auth/AuthInput';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await authAPI.login({
                email: formData.email,
                password: formData.password,
            });

            const userData = response.data.data;
            const token = response.data.token;

            // ✅ Store token
            localStorage.setItem('token', token);

            // ✅ Store user data with _id
            localStorage.setItem('user', JSON.stringify({
                _id: userData.id || userData._id,
                name: userData.name,
                email: userData.email,
                avatar: userData.avatar || '',
                bio: userData.bio || '',
            }));

            toast.success('Welcome back!');
            navigate('/feed');
        } catch (error) {
            const message = error.response?.data?.message || 'Invalid email or password.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-[5%] py-12 relative">
            <Link
                to="/"
                className="absolute top-8 left-[5%] flex items-center gap-2 text-[14px] font-medium text-ink-soft/70 hover:text-ink transition-colors duration-200 no-underline group"
            >
                <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
            </Link>

            <AuthCard
                title="Welcome back"
                subtitle="Log in to your account"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <AuthInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        error={errors.email}
                    />

                    <AuthInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        error={errors.password}
                    />

                    <div className="text-right -mt-2">
                        <a href="#" className="text-[13px] text-ink-soft hover:text-ink transition-colors duration-200">
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        loading={loading}
                        className="w-full mt-1"
                    >
                        Log in
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-[14px] text-ink-soft">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-ink hover:text-rust transition-colors duration-200">
                            Sign up
                        </Link>
                    </p>
                </div>
            </AuthCard>
        </div>
    );
};

export default Login;