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

const checkPasswordStrength = (password: string): {
    score: number;
    feedback: string[];
} => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 1;
    else feedback.push('Password should be at least 8 characters long');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include at least one uppercase letter');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Include at least one lowercase letter');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Include at least one number');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Include at least one special character');

    return { score, feedback };
};

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

const PasswordStrengthIndicator = ({ score }: { score: number }) => {
    const getColor = (index: number) => {
        if (index < score) {
            switch (score) {
                case 1: return 'bg-red-500';
                case 2: return 'bg-orange-500';
                case 3: return 'bg-yellow-500';
                case 4: return 'bg-blue-500';
                case 5: return 'bg-green-500';
                default: return 'bg-gray-200';
            }
        }
        return 'bg-gray-200';
    };

    return (
        <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((index) => (
                <div
                    key={index}
                    className={`h-2 w-full rounded ${getColor(index)} transition-colors`}
                />
            ))}
        </div>
    );
};

export default function Signup() {
    const router = useRouter();
    const { signup } = useAuthStore();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<FormError[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] as string[] });

    useEffect(() => {
        if (formData.password) {
            setPasswordStrength(checkPasswordStrength(formData.password));
        }
    }, [formData.password]);

    const validateForm = () => {
        const newErrors: FormError[] = [];

        if (formData.name.length < 2) {
            newErrors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
        }

        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.push({ field: 'email', message: 'Please enter a valid email address' });
        }

        if (passwordStrength.score < 3) {
            newErrors.push({ field: 'password', message: 'Password is not strong enough' });
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await signup(formData.email, formData.password, formData.name);
            router.push('/dashboard');
        } catch (err: any) {
            setErrors([{
                field: 'form',
                message: err.message || 'An error occurred during signup'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const getFieldError = (field: string) =>
        errors.find(error => error.field === field)?.message;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

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
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        label="Name"
                        error={getFieldError('name')}
                    />

                    <FormInput
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        label="Email"
                        error={getFieldError('email')}
                    />

                    <div className="mb-4">
                        <FormInput
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            label="Password"
                            error={getFieldError('password')}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                        />
                        <PasswordStrengthIndicator score={passwordStrength.score} />
                        {passwordStrength.feedback.length > 0 && (
                            <ul className="mt-2 text-sm text-gray-600">
                                {passwordStrength.feedback.map((feedback, index) => (
                                    <li key={index} className="flex items-center">
                                        <AlertCircle size={12} className="mr-1" />
                                        {feedback}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <FormInput
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        label="Confirm Password"
                        error={getFieldError('confirmPassword')}
                        showPassword={showConfirmPassword}
                        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
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
                                Creating account...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}