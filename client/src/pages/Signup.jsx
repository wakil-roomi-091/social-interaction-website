/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import AuthInput from '../components/auth/AuthInput';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await authAPI.signup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            // ✅ Store token (optional, but good for auto-login)
            localStorage.setItem('token', response.data.token);

            // ✅ Store user data with _id
            localStorage.setItem('user', JSON.stringify({
                _id: response.data.data.id || response.data.data._id,
                name: response.data.data.name,
                email: response.data.data.email,
                avatar: response.data.data.avatar || '',
                bio: response.data.data.bio || '',
            }));

            toast.success('Account created successfully!');
            navigate('/feed');
        } catch (error) {
            const message = error.response?.data?.message || 'Something went wrong. Please try again.';
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
                title="Create your account"
                subtitle="Join the community. It's free forever."
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <AuthInput
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        error={errors.name}
                    />

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
                        placeholder="Create a password"
                        required
                        error={errors.password}
                    />

                    <AuthInput
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        error={errors.confirmPassword}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        loading={loading}
                        className="w-full mt-2"
                    >
                        Create account
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-[14px] text-ink-soft">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-ink hover:text-rust transition-colors duration-200">
                            Log in
                        </Link>
                    </p>
                </div>
            </AuthCard>
        </div>
    );
};

export default Signup;