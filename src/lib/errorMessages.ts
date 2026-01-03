/**
 * Sanitize error messages to prevent information leakage
 * while providing helpful user guidance
 */
export function getSafeAuthErrorMessage(error: unknown): string {
  const errorObj = error as { message?: string; code?: string; status?: number };
  const message = errorObj?.message?.toLowerCase() || '';
  
  // Map known authentication errors to user-friendly messages
  if (message.includes('already registered') || 
      message.includes('already exists') ||
      message.includes('duplicate')) {
    return 'This email is already registered. Try logging in instead.';
  }
  
  if (message.includes('invalid login') || 
      message.includes('invalid credentials') ||
      message.includes('invalid password') ||
      message.includes('incorrect password')) {
    return 'Invalid email or password. Please try again.';
  }
  
  if (message.includes('email not confirmed') ||
      message.includes('email not verified')) {
    return 'Please check your email and confirm your account before logging in.';
  }
  
  if (message.includes('network') || 
      message.includes('fetch') ||
      message.includes('connection')) {
    return 'Connection error. Please check your internet and try again.';
  }
  
  if (message.includes('rate limit') ||
      message.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }

  if (message.includes('user not found')) {
    return 'Invalid email or password. Please try again.';
  }

  if (message.includes('password')) {
    return 'Password does not meet requirements. Please try a stronger password.';
  }
  
  // Log full error details for debugging (only visible in console)
  console.error('[Auth Error]', {
    message: errorObj?.message,
    code: errorObj?.code,
    status: errorObj?.status,
    timestamp: new Date().toISOString()
  });
  
  // Generic fallback - never expose raw error
  return 'An error occurred during authentication. Please try again.';
}

export function getSafeProfileErrorMessage(error: unknown): string {
  const errorObj = error as { message?: string };
  const message = errorObj?.message?.toLowerCase() || '';
  
  if (message.includes('not found')) {
    return 'Profile not found. Please complete your profile setup.';
  }
  
  if (message.includes('permission denied') ||
      message.includes('policy violation') ||
      message.includes('row-level security')) {
    return "You don't have permission to perform this action.";
  }
  
  if (message.includes('network') || message.includes('fetch')) {
    return 'Connection error. Please try again.';
  }
  
  console.error('[Profile Error]', error);
  return 'Failed to update profile. Please try again.';
}
