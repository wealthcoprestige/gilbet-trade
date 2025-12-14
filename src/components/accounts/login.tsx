'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Eye,
  EyeOff,
  Lock,
  Phone,
  User,
  Shield,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Zap,
  Coins,
  BarChart3,
  Wallet,
  Users,
  Cpu,
  Activity,
} from 'lucide-react';
import Link from 'next/link';
import { authApi } from '../axios/axiosInsatance';

// Ethereum Icon Component
const EthereumIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#627EEA"/>
    <path d="M12.3735 3V9.6525L17.9963 12.165L12.3735 3Z" fill="white" fillOpacity="0.602"/>
    <path d="M12.3735 3L6.75 12.165L12.3735 9.6525V3Z" fill="white"/>
    <path d="M12.3735 16.476V20.9963L18 13.212L12.3735 16.476Z" fill="white" fillOpacity="0.602"/>
    <path d="M12.3735 20.9963V16.4753L6.75 13.212L12.3735 20.9963Z" fill="white"/>
    <path d="M12.3735 15.4298L17.9963 12.1651L12.3735 9.65405V15.4298Z" fill="white" fillOpacity="0.2"/>
    <path d="M6.75 12.1651L12.3735 15.4298V9.65405L6.75 12.1651Z" fill="white" fillOpacity="0.602"/>
  </svg>
);

const BitcoinIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F7931A"/>
    <path d="M17.3077 10.2692C17.4615 8.11538 15.9231 7.03846 14.0769 6.92308L14.4231 4.84615L13.2692 4.61538L12.9231 6.46154H12L11.6538 4.61538L10.5 4.38462L10.8462 6.92308H9.57692L9.23077 4.84615L8.07692 4.61538L7.73077 6.46154H6.92308L6.57692 5.30769L5.42308 5.07692L5.76923 7.03846C5.76923 7.03846 6.92308 7.26923 6.92308 7.38462C6.92308 7.5 6.92308 8.07692 6.92308 8.07692L5.42308 8.30769L5.76923 9.46154L7.26923 9.23077L7.61538 11.0769H6.34615L6 12.2308L7.15385 12.4615L7.5 14.3077H6.23077L5.88462 15.4615L7.38462 15.6923L7.03846 17.7692L8.19231 18L8.53846 16.1538H9.46154L9.80769 18L10.9615 18.2308L10.6154 16.1538H11.8846L12.2308 18.2308L13.3846 18L13.7308 16.1538H14.5385L14.1923 18.2308L15.3462 18.4615L15.6923 16.3846C17.3077 16.1538 18.5769 15.1154 18.8077 13.2692C19.0385 11.5385 18.1154 10.6154 17.3077 10.2692ZM14.5385 13.3846C14.5385 14.7692 12.5769 15.2308 11.6538 15.4615L12.2308 12.9231C13.1538 12.6923 14.5385 12.4615 14.5385 13.3846ZM15.3462 10.8462C15.3462 11.8846 13.7308 12.2308 12.9231 12.4615L12.3462 9.92308C13.1538 9.69231 15.3462 9.57692 15.3462 10.8462Z" fill="white"/>
  </svg>
);

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Format phone number to only allow numbers and limit to 10 digits
  const handlePhoneChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(numericValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    console.log('Form submitted. isLogin:', isLogin, 'phone:', phoneNumber);

    // Validation
    if (!phoneNumber || !password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (phoneNumber.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      setIsLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // LOGIN: POST to /api/v1/accounts/login-user-phone/?phone=phone
        const loginData = {
          phone: phoneNumber,
          password: password
        };

        console.log('Attempting login with data:', loginData);

        const response = await authApi.post(
          `api/v1/accounts/login-user-phone/?phone=phone`,
          loginData
        );

        console.log('Login API response:', response);

        // Extract token from the response - based on your API structure
        if (response.tokens && response.tokens.length > 0) {
          // Assuming the token is the first item in the tokens array
          const token = response.tokens[0].token || response.tokens[0].access_token;
          
          if (token) {
            // Save token to localStorage
            localStorage.setItem('access_token', token);
            console.log('Access token saved to localStorage:', token.substring(0, 20) + '...');
            
            // Save user info
            if (response.user) {
              localStorage.setItem('user', JSON.stringify(response.user));
              console.log('User info saved:', response.user);
            }
            
            // Save the entire tokens array if needed
            localStorage.setItem('tokens', JSON.stringify(response.tokens));
            
            setSuccess('Login successful! Redirecting to dashboard...');
            
            // Immediately redirect to dashboard
            setTimeout(() => {
              router.push('/dashboard');
            }, 1000);
          } else {
            // If token is in a different format in the array
            const tokenObject = response.tokens[0];
            console.log('Token object structure:', tokenObject);
            
            // Try to find the token in the object
            const foundToken = tokenObject.access || tokenObject.access_token || 
                              tokenObject.token || tokenObject.jwt;
            
            if (foundToken) {
              localStorage.setItem('access_token', foundToken);
              console.log('Access token saved (alternative format):', foundToken.substring(0, 20) + '...');
              
              if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
              }
              
              setSuccess('Login successful! Redirecting to dashboard...');
              setTimeout(() => {
                router.push('/dashboard');
              }, 1000);
            } else {
              throw new Error('Could not find token in tokens array');
            }
          }
        } else if (response.token) {
          // If token is directly in response (alternative format)
          localStorage.setItem('access_token', response.token);
          console.log('Access token saved (direct):', response.token.substring(0, 20) + '...');
          
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          
          setSuccess('Login successful! Redirecting to dashboard...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        } else if (response.access_token) {
          // If using access_token directly
          localStorage.setItem('access_token', response.access_token);
          console.log('Access token saved (access_token):', response.access_token.substring(0, 20) + '...');
          
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          
          setSuccess('Login successful! Redirecting to dashboard...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        } else {
          // Log the full response for debugging
          console.log('Full response structure for debugging:', response);
          console.log('Checking tokens array:', response.tokens);
          
          // Try to extract token from any possible location
          const possibleTokenPaths = [
            'tokens[0].token',
            'tokens[0].access_token',
            'tokens[0].access',
            'tokens[0].jwt',
            'token',
            'access_token',
            'accessToken',
            'jwt'
          ];
          
          let foundToken = null;
          for (const path of possibleTokenPaths) {
            if (path.includes('[')) {
              // Handle array path like tokens[0].token
              const parts = path.split(/[\[\].]/).filter(Boolean);
              let value = response;
              for (const part of parts) {
                if (value && typeof value === 'object' && part in value) {
                  value = value[part];
                } else {
                  value = null;
                  break;
                }
              }
              if (value && typeof value === 'string') {
                foundToken = value;
                console.log(`Found token at path ${path}:`, value.substring(0, 20) + '...');
                break;
              }
            } else if (response[path]) {
              foundToken = response[path];
              console.log(`Found token at path ${path}:`, response[path].substring(0, 20) + '...');
              break;
            }
          }
          
          if (foundToken) {
            localStorage.setItem('access_token', foundToken);
            if (response.user) {
              localStorage.setItem('user', JSON.stringify(response.user));
            }
            setSuccess('Login successful! Redirecting to dashboard...');
            setTimeout(() => {
              router.push('/dashboard');
            }, 1000);
          } else {
            throw new Error('No access token found in response. Check console for response structure.');
          }
        }
      } else {
        // REGISTER: POST to /api/v1/accounts/create-user/
        const registerData = {
          phone_number: phoneNumber,
          password: password
        };

        console.log('Attempting registration with data:', registerData);

        const response = await authApi.post('api/v1/accounts/create-user/', registerData);
        
        console.log('Registration API response:', response);

        if (response.id || response.success || response.message) {
          setSuccess('Account created successfully! Please login with your new credentials.');
          
          // Clear form and switch to login
          setTimeout(() => {
            setIsLogin(true);
            setPhoneNumber('');
            setPassword('');
            setConfirmPassword('');
          }, 2000);
        } else {
          throw new Error('Registration completed but no confirmation received');
        }
      }
    } catch (err: any) {
      console.error('Full auth error:', err);
      
      // Extract error message
      let errorMessage = 'An error occurred. Please try again.';
      
      if (err.response) {
        console.log('Error response details:', {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
          config: err.response.config
        });
        
        if (err.response.status === 404) {
          errorMessage = 'Endpoint not found. Please check the server URL.';
        } else if (err.response.status === 400) {
          errorMessage = 'Invalid request. Please check your credentials.';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        if (err.response.data) {
          const errorData = err.response.data;
          
          if (typeof errorData === 'string') {
            errorMessage = errorData;
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          }
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Stats and benefits data
  const cryptoStats = [
    { icon: <Users className="w-5 h-5" />, value: '500K+', label: 'Active Traders' },
    { icon: <Wallet className="w-5 h-5" />, value: '$4.2B+', label: 'Total Volume' },
    { icon: <BarChart3 className="w-5 h-5" />, value: '98.5%', label: 'Success Rate' },
    { icon: <Shield className="w-5 h-5" />, value: '256-bit', label: 'Security' },
  ];

  const benefits = [
    { icon: <Zap className="w-5 h-5" />, text: 'Daily mining returns up to 4.8%' },
    { icon: <TrendingUp className="w-5 h-5" />, text: 'Advanced trading analytics' },
    { icon: <Coins className="w-5 h-5" />, text: '100+ cryptocurrencies' },
    { icon: <Shield className="w-5 h-5" />, text: 'Bank-level security' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-400 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                TradeFlow
              </h1>
              <p className="text-xs text-gray-500">Professional Trading</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="px-4 py-2 border-2 border-blue-200 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-200px)] gap-12">
          {/* Left Column - Auth Form */}
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 bg-gradient-to-br from-blue-500 to-sky-400 rounded-xl mb-4">
                  {isLogin ? (
                    <Lock className="w-8 h-8 text-white" />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Sign in to your trading account'
                    : 'Start your trading journey today'
                  }
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-red-700 text-sm block mb-1">{error}</span>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-green-700 text-sm block mb-1">{success}</span>
                      <span className="text-green-600 text-xs">Token saved to localStorage</span>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="0507659441"
                      className="w-full pl-12 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Enter your 10-digit phone number
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="w-full pl-12 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    <>
                      {isLogin ? 'Sign In to Dashboard' : 'Create Account'}
                      <ArrowRight className="inline ml-2 w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
                  </button>
                </div>
              </form>
              
              {/* Debug info for token */}
              {isLogin && typeof window !== 'undefined' && localStorage.getItem('access_token') && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    Token present: {localStorage.getItem('access_token')?.substring(0, 20)}...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="w-full max-w-lg">
            <div className="space-y-8">
              {/* Stats */}
              <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cryptoStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="inline-flex p-2 bg-blue-50 rounded-lg text-blue-600 mb-2">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="w-5 h-5 text-white" />
                  <h3 className="text-xl font-bold text-white">Why Choose TradeFlow?</h3>
                </div>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <span className="text-blue-50">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Secure & Trusted</h4>
                    <p className="text-emerald-100 text-sm">
                      Your security is our top priority
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2024 TradeFlow. Secure cryptocurrency trading platform.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}