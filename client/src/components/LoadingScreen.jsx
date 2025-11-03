import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    if (isComplete) {
      gsap.to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set('.loading-screen', { display: 'none' })
        }
      })
    }
  }, [isComplete])

  return (
    <div className="loading-screen fixed inset-0 z-[100] bg-neutral-950 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            GV
          </h1>
          <p className="text-neutral-400 text-lg">Loading amazing experiences</p>
        </div>
        
        <div className="w-full max-w-xs sm:max-w-sm h-2 bg-neutral-800 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-brand to-purple-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-sm text-neutral-500">
          {Math.round(progress)}% Complete
        </div>
        
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-brand rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}
