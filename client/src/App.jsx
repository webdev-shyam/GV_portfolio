import { useEffect, useRef, useState } from 'react'
import './App.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import LoadingScreen from './components/LoadingScreen'
import ParticleBackground from './components/ParticleBackground'
import ScrollProgress from './components/ScrollProgress'
import ContactForm from './components/ContactForm'
gsap.registerPlugin(ScrollTrigger, TextPlugin)

function Section({ id, className = '', children }) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 60 },
      { 
        autoAlpha: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out', 
        scrollTrigger: { 
          trigger: element, 
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        } 
      }
    )
  }, [])
  return (
    <section id={id} ref={ref} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      {children}
    </section>
  )
}

function SkillCard({ skill, icon, description }) {
  const cardRef = useRef(null)
  
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    
    const handleMouseEnter = () => {
      gsap.to(card, { 
        scale: 1.05, 
        duration: 0.3, 
        ease: 'power2.out',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      })
    }
    
    const handleMouseLeave = () => {
      gsap.to(card, { 
        scale: 1, 
        duration: 0.3, 
        ease: 'power2.out',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      })
    }
    
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <div 
      ref={cardRef}
      className="group p-6 rounded-xl bg-gradient-to-br from-neutral-900/60 to-neutral-800/40 border border-white/10 hover:border-brand/50 transition-all duration-300 cursor-pointer"
    >
      <div className="text-3xl mb-3 text-brand">{icon}</div>
      <h3 className="font-semibold text-lg mb-2 group-hover:text-brand transition-colors">{skill}</h3>
      <p className="text-neutral-400 text-sm">{description}</p>
    </div>
  )
}

function ProjectCard({ title, description, image, tags, link }) {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  
  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    if (!card || !image) return
    
    const handleMouseEnter = () => {
      gsap.to(image, { scale: 1.1, duration: 0.6, ease: 'power2.out' })
      gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' })
    }
    
    const handleMouseLeave = () => {
      gsap.to(image, { scale: 1, duration: 0.6, ease: 'power2.out' })
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
    }
    
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <article 
      ref={cardRef}
      className="rounded-xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 hover:ring-brand/30 transition-all duration-300"
    >
      <div className="overflow-hidden">
        <img 
          ref={imageRef}
          src={image} 
          alt={title} 
          className="w-full object-cover aspect-[16/9] transition-transform duration-600" 
        />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-2 hover:text-brand transition-colors">{title}</h3>
        <p className="text-neutral-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 rounded-full bg-brand/20 text-brand text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand hover:text-brand-light transition-colors font-medium"
          >
            View Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </article>
  )
}

function FloatingElement({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    gsap.to(element, {
      y: -20,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      delay: delay
    })
  }, [delay])
  
  return (
    <div ref={ref} className={`absolute opacity-60 ${className}`}>
      {children}
    </div>
  )
}

function App() {
  const heroRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline()
    tl.fromTo(
      heroRef.current?.querySelectorAll('[data-hero]'),
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }
    )
    
    // Floating elements animation
    gsap.to('.floating-element', {
      y: -30,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    })
    
    // Parallax effect for background elements
    gsap.utils.toArray('.parallax').forEach(element => {
      gsap.to(element, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })
  }, [])

  const skills = [
    { skill: 'React', icon: '⚛️', description: 'Building interactive UIs with modern React patterns' },
    { skill: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework for rapid development' },
    { skill: 'GSAP', icon: '✨', description: 'Professional-grade animations and motion design' },
    { skill: 'JavaScript', icon: '🟨', description: 'ES6+ features and modern JavaScript patterns' },
    { skill: 'Accessibility', icon: '♿', description: 'Creating inclusive experiences for all users' },
    { skill: 'Performance', icon: '⚡', description: 'Optimizing for speed and smooth interactions' },
    { skill: 'Animations', icon: '🎭', description: 'Micro-interactions and motion design' },
    { skill: 'Responsive UI', icon: '📱', description: 'Mobile-first responsive design approach' }
  ]

  const projects = [
    {
      title: 'Weather Pro',
      description: 'A modern, animated Real time weather App using Nextjs, React and Tailwind CSS.',
      image: '/assets/weather-pro.jpg',
      tags: ['React', 'Tailwind CSS', 'Next JS',],
      link: 'https://weather-pro-two-mu.vercel.app/'
    },
     {
      title: 'CSS ToolBox Pro',
      description: 'A tool for generating CSS gradient effects generator, popular glass morphism effects, box shadow generator and much more.',
      image: '/assets/CSS-toolbox.png',
      tags: ['React', 'Tailwind CSS', 'Vite'],
      link: 'https://csstoolboxpro2025.netlify.app/'
    },
   
    {
      title: 'Interactive Dashboard',
      description: 'Data visualization dashboard with real-time updates and interactive charts.',
      image: '/assets/admin-ui.png',
      tags: ['React', 'D3.js', 'Real-time'],
      link: 'https://admin-ui-dashboard-five.vercel.app/'
    },
    {
      title: 'E-commerce Platform',
      description: 'Modern e-commerce solution with smooth animations and excellent UX.',
      image: '/assets/ecommerce.webp',
      tags: ['React', 'Stripe', 'Tailwind CSS', 'Next JS'],
      link: 'https://vynora-ecommerce.vercel.app/'
    }
  ]

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-x-hidden">
      <ScrollProgress />
      <ParticleBackground />
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="hidden sm:block absolute top-20 left-10 w-56 sm:w-72 h-56 sm:h-72 bg-brand/5 rounded-full blur-3xl"></div>
        <div className="hidden sm:block absolute top-40 right-20 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="hidden sm:block absolute bottom-20 left-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <img
              src='/assets/logo.png'
              alt="logo"
             className='h-[178px] w-[178px]'
            />
            
          </a>
          
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full md:top-auto left-0 right-0 md:left-auto md:right-auto bg-neutral-950/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b md:border-b-0 border-white/10 md:border-none flex-col md:flex-row gap-6 md:gap-8 py-6 md:py-0 text-sm text-neutral-300`}>
            <a href="#about" className="hover:text-brand transition-colors duration-300 font-medium">About</a>
            <a href="#skills" className="hover:text-brand transition-colors duration-300 font-medium">Skills</a>
            <a href="#projects" className="hover:text-brand transition-colors duration-300 font-medium">Projects</a>
            <a href="#contact" className="hover:text-brand transition-colors duration-300 font-medium">Contact</a>
          </nav>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4">
        <Section id="hero" className="pt-32 pb-28 relative">
          <div ref={heroRef} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <p data-hero className="text-brand text-sm uppercase tracking-widest mb-4 font-semibold">Frontend Developer & UI/UX Enthusiast</p>
              <h1 data-hero className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
                Crafting Digital
                <span className="block text-brand">Experiences</span>
              </h1>
              <p data-hero className="text-lg sm:text-xl text-neutral-300 mb-8 leading-relaxed">
                I transform ideas into captivating digital experiences using modern technologies, 
                smooth animations, and pixel-perfect design.
              </p>
              <div data-hero className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a 
                  href="#projects" 
                  className="group px-8 py-4 rounded-xl bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:shadow-brand/25 transform hover:-translate-y-1"
                >
                  View Projects
                  <svg className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a 
                  href="#contact" 
                  className="px-8 py-4 rounded-xl border-2 border-white/20 hover:border-brand/50 hover:bg-white/5 transition-all duration-300 font-semibold group"
                >
                  Let's Connect
                  <svg className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/assets/Portfolio_img.png" 
                  alt="Ganeshyam Verma" 
                  className="w-full max-w-md mx-auto rounded-2xl ring-2 ring-white/10 shadow-2xl" 
                />
              </div>
              
              {/* Floating decorative elements */}
              <FloatingElement delay={0} className="top-0 -right-8">
                <img src="/assets/heart_square.png" alt="decor" className="w-16 opacity-60" />
              </FloatingElement>
              <FloatingElement delay={1} className="bottom-0 -left-8">
                <img src="/assets/heart.png" alt="decor" className="w-12 opacity-60" />
              </FloatingElement>
              <FloatingElement delay={2} className="top-1/2 -right-16">
                <img src="/assets/repeat.png" alt="decor" className="w-20 opacity-40" />
              </FloatingElement>
            </div>
          </div>
        </Section>

        <Section id="about" className="relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-xl text-neutral-300 mb-6 leading-relaxed">
                I'm a passionate frontend developer with a keen eye for detail and a love for creating 
                smooth, accessible user experiences. My approach combines clean code with purposeful 
                animations to bring designs to life.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                projects, or sharing knowledge with the developer community.
              </p>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-brand/10 to-purple-500/10 border border-brand/20">
                    <h3 className="text-2xl font-bold text-brand">3+</h3>
                    <p className="text-neutral-300">Years Experience</p>
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                    <h3 className="text-2xl font-bold text-green-400">50+</h3>
                    <p className="text-neutral-300">Projects Completed</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <h3 className="text-2xl font-bold text-purple-400">100%</h3>
                    <p className="text-neutral-300">Client Satisfaction</p>
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                    <h3 className="text-2xl font-bold text-blue-400">24/7</h3>
                    <p className="text-neutral-300">Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="skills" className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-3xl border border-white/10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </Section>

        <Section id="projects">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </Section>

        <Section id="contact" className="pb-28">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'm always excited to work on new projects and 
              collaborate with creative minds.
            </p>
          </div>
          
          <ContactForm />
          
          <div className="mt-12 text-center">
            <p className="text-neutral-400 mb-6">Or reach out directly:</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href="mailto:contact@example.com" 
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:shadow-brand/25 transform hover:-translate-y-1"
              >
                <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </a>
              
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-12 bg-neutral-950/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-neutral-400">
                © {new Date().getFullYear()} Ganeshyam Verma. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a target='_blank' href="https://github.com/webdev-shyam" className="text-neutral-400 hover:text-brand transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a target='_blank' href="https://x.com/webdevshyam" className="text-neutral-400 hover:text-brand transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
             
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
