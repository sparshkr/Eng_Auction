"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/auth/service';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/CustomAlert';

interface FormError {
    field: string;
    message: string;
}

const FormInput = ({
    type,
    value,
    onChange,
    label,
    error,
    required = true,
    showPassword,
    onTogglePassword,
}: {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    error?: string;
    required?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
}) => (
    <div className="mb-4">
        <label className="block text-gray-700 mb-2">{label}</label>
        <div className="relative">
            <input
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 
                    ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}
                    ${type === 'password' ? 'pr-12' : ''}`}
                required={required}
            />
            {type === 'password' && (
                <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
        {error && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {error}
            </p>
        )}
    </div>
);


// Login Component
export default function Login() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<FormError[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors: FormError[] = [];

        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.push({ field: 'email', message: 'Please enter a valid email address' });
        }

        if (formData.password.length < 8) {
            newErrors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
            setSuccessMessage('Login successful! Redirecting...');
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
        } catch (err) {
            setErrors([{ field: 'form', message: 'Invalid credentials' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const getFieldError = (field: string) =>
        errors.find(error => error.field === field)?.message;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {successMessage && (
                    <Alert className="mb-4 bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertDescription className="text-green-700">
                            {successMessage}
                        </AlertDescription>
                    </Alert>
                )}

                {getFieldError('form') && (
                    <Alert className="mb-4 bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-red-700">
                            {getFieldError('form')}
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        label="Email"
                        error={getFieldError('email')}
                    />

                    <FormInput
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        label="Password"
                        error={getFieldError('password')}
                        showPassword={showPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 
                            disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader className="animate-spin mr-2" size={20} />
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/auth/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}