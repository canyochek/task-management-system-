import { useState } from 'react';
import './SignIn.scss';

const SignIn = ({ onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!email.trim() || !password.trim()) {
            setError('Будь ласка, заповніть усі поля');
            return;
        }
        const endpoint = isSignUp ? 'register' : 'login';

        try {
            const response = await fetch(`https://task-management-system-backend-wlev.onrender.com/api/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                if (isSignUp) {
                    setSuccessMessage('Акаунт успішно створено! Тепер увійдіть.');
                    setIsSignUp(false);
                    setPassword(''); 
                } else {
                    onLoginSuccess(data.token);
                }
            } else {
                setError(data.message || 'Помилка обробки запиту');
            }
        } catch (err) {
            setError('Не вдалося зв’язатися з сервером');
            console.error('Auth error:', err);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h1 className="auth-form__title">{isSignUp ? 'Зареєструватися' : 'Увійти'}</h1>
                
                {error && <div style={{ color: '#ff4d4d', marginBottom: '15px', fontSize: '14px', fontWeight: '600' }}>{error}</div>}
                {successMessage && <div style={{ color: '#2ecc71', marginBottom: '15px', fontSize: '14px', fontWeight: '600' }}>{successMessage}</div>}

                <div className="auth-form__field">
                    <input 
                        type="email" 
                        placeholder="example@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-form__input"
                        required
                    />
                </div>

                <div className="auth-form__field">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="***************" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-form__input"
                        required
                    />
                    <button 
                        type="button" 
                        className="auth-form__password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                </div>
                <button type="submit" className="auth-form__submit">
                    {isSignUp ? 'Зареєструватися' : 'Увійти'}
                </button>
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                    {isSignUp ? 'Вже маєте акаунт? ' : 'Ще немає акаунту? '}
                    <span 
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError('');
                            setSuccessMessage('');
                        }} 
                        style={{ color: '#72ec36', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
                    >
                        {isSignUp ? 'Увійти' : 'Зареєструватися'}
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SignIn;