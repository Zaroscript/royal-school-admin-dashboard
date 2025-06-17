import React from 'react';
import { Crown, BookOpen, GraduationCap, Users } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'default' | 'royal' | 'academic';
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  text = 'جاري التحميل...',
  variant = 'royal'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'royal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-green-50 dark:from-red-950/20 dark:via-blue-950/20 dark:to-green-950/20 flex items-center justify-center">
        <div className="text-center space-y-6">
          {/* Royal Crown Animation */}
          <div className="relative">
            <div className={`${sizeClasses[size]} mx-auto relative`}>
              {/* Crown Base */}
              <Crown className={`${sizeClasses[size]} text-royal-orange animate-pulse-slow`} />
              
              {/* Rotating Gems */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-royal-red rounded-full animate-bounce-gentle" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-royal-blue rounded-full animate-bounce-gentle absolute -top-1 -right-1" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-royal-green rounded-full animate-bounce-gentle absolute -top-1 -left-1" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            
            {/* Orbiting Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-royal-red/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="w-8 h-8 border-2 border-royal-blue/30 rounded-full animate-spin absolute" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
              <div className="w-10 h-10 border-2 border-royal-green/30 rounded-full animate-spin absolute" style={{ animationDuration: '5s' }}></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className={`${textSizes[size]} font-bold text-royal-dark dark:text-royal-white animate-fade-in-up`}>
              Royal School
            </h2>
            <p className={`${textSizes[size]} text-muted-foreground animate-fade-in-up stagger-1`}>
              نظام إدارة مدرسة رويال
            </p>
            <p className={`${textSizes[size]} text-muted-foreground animate-fade-in-up stagger-2`}>
              {text}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-royal-red via-royal-blue to-royal-green rounded-full animate-progress" 
                 style={{ '--progress-width': '100%' } as React.CSSProperties}></div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'academic') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 dark:from-blue-950/20 dark:via-green-950/20 dark:to-orange-950/20 flex items-center justify-center">
        <div className="text-center space-y-6">
          {/* Academic Icons Animation */}
          <div className="relative">
            <div className={`${sizeClasses[size]} mx-auto relative`}>
              {/* Central Book */}
              <BookOpen className={`${sizeClasses[size]} text-royal-blue animate-pulse-slow`} />
              
              {/* Floating Icons */}
              <div className="absolute inset-0 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-royal-green animate-float absolute -top-2 -right-2" style={{ animationDelay: '0s' }} />
                <Users className="w-6 h-6 text-royal-orange animate-float absolute -top-2 -left-2" style={{ animationDelay: '0.5s' }} />
                <Crown className="w-6 h-6 text-royal-red animate-float absolute -bottom-2" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            {/* Rotating Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-royal-blue/20 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="w-12 h-12 border-2 border-royal-green/20 rounded-full animate-spin absolute" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
              <div className="w-16 h-16 border-2 border-royal-orange/20 rounded-full animate-spin absolute" style={{ animationDuration: '5s' }}></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className={`${textSizes[size]} font-bold text-royal-dark dark:text-royal-white animate-fade-in-up`}>
              Academic System
            </h2>
            <p className={`${textSizes[size]} text-muted-foreground animate-fade-in-up stagger-1`}>
              نظام أكاديمي متكامل
            </p>
            <p className={`${textSizes[size]} text-muted-foreground animate-fade-in-up stagger-2`}>
              {text}
            </p>
          </div>

          {/* Dots Animation */}
          <div className="flex justify-center space-x-2 space-x-reverse">
            <div className="w-2 h-2 bg-royal-red rounded-full animate-bounce-gentle" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-royal-blue rounded-full animate-bounce-gentle" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-royal-green rounded-full animate-bounce-gentle" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-2 h-2 bg-royal-orange rounded-full animate-bounce-gentle" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Modern Spinner */}
        <div className="relative">
          <div className={`${sizeClasses[size]} mx-auto relative`}>
            {/* Main Spinner */}
            <div className={`${sizeClasses[size]} border-4 border-muted rounded-full`}></div>
            <div className={`${sizeClasses[size]} border-4 border-royal-blue border-t-transparent rounded-full animate-spin absolute inset-0`}></div>
            
            {/* Inner Spinner */}
            <div className={`${sizeClasses[size]} border-2 border-muted rounded-full absolute inset-2`}></div>
            <div className={`${sizeClasses[size]} border-2 border-royal-red border-t-transparent rounded-full animate-spin absolute inset-2`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          
          {/* Floating Dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-royal-green rounded-full animate-pulse-slow" style={{ animationDelay: '0s' }}></div>
            <div className="w-1 h-1 bg-royal-orange rounded-full animate-pulse-slow absolute -top-1" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <p className={`${textSizes[size]} text-muted-foreground animate-fade-in-up`}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader; 