import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, GraduationCap, Briefcase, ArrowRight, Sparkles, TrendingUp, Users, Target, Zap, Shield, Award, FileText, CheckCircle, Globe, Rocket, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Welcome = () => {
  const roleCards = [
    {
      id: 'college',
      title: 'College',
      icon: Building2,
      features: ['Student Management', 'Drive Organization', 'Application Tracking', 'Analytics Dashboard'],
      gradient: 'from-purple-600 via-purple-500 to-pink-500',
      hoverGradient: 'from-purple-500 via-pink-500 to-rose-500',
      stats: { label: 'Management', value: 'Complete' },
      path: '/auth/college'
    },
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      features: ['AI Interview Practice', 'Job Applications', 'Profile Management', 'Skill Assessment'],
      gradient: 'from-blue-600 via-cyan-500 to-teal-400',
      hoverGradient: 'from-cyan-500 via-teal-400 to-emerald-500',
      stats: { label: 'Opportunities', value: 'Multiple' },
      path: '/auth/student'
    },
    {
      id: 'recruiter',
      title: 'Recruiter',
      icon: Briefcase,
      features: ['Drive Management', 'Applicant Screening', 'Interview Scheduling', 'Bulk Actions'],
      gradient: 'from-emerald-600 via-green-500 to-lime-400',
      hoverGradient: 'from-green-500 via-lime-400 to-yellow-500',
      stats: { label: 'Hiring', value: 'Smart' },
      path: '/auth/recruiter'
    }
  ];

  const features = [
    { icon: Zap, text: 'Lightning Fast Matching', delay: 0.1 },
    { icon: Shield, text: 'Secure & Private', delay: 0.2 },
    { icon: FileText, text: 'Smart Resume Analysis', delay: 0.3 },
    { icon: Award, text: 'Industry Recognition', delay: 0.4 },
    { icon: Target, text: 'AI-Powered Insights', delay: 0.5 },
    { icon: Globe, text: 'Global Reach', delay: 0.6 },
    { icon: Rocket, text: 'Career Acceleration', delay: 0.7 }
  ];

  const stats = [
    { value: '3', label: 'User Roles', icon: Users },
    { value: 'AI-Powered', label: 'Interview System', icon: Zap },
    { value: '100%', label: 'Secure Platform', icon: Shield },
    { value: 'Modern', label: 'Tech Stack', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0], 
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 60, 0], 
            scale: [1, 0.8, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl"
          animate={{ 
            x: [0, 40, 0], 
            y: [0, 30, 0], 
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
      </div>

      {/* Navigation Header */}
      <motion.header 
        className="relative z-20 px-8 py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto flex flex-col items-center">
          <span className="text-4xl md:text-5xl font-bold mt-8">
            <span style={{ color: '#5A6BFF' }}>Talent</span>
            <span style={{ color: '#7C4DFF' }}>Bridge</span>
          </span>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-start justify-center px-8 pt-8 pb-16">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm text-white/80">AI-Powered Recruitment Platform</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Beyond Grades.
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-white bg-clip-text text-transparent">
                Powered by Skills.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 font-light max-w-3xl mx-auto mb-16">
              Transform your career journey with AI-powered interviews, smart matching, and seamless collaboration between students, colleges, and recruiters.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link to="/auth/student" className="block">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 px-8 py-3 rounded-full text-lg font-medium"
                onClick={() => {
                  const element = document.getElementById('stats-section');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats & Features Section */}
      <section id="stats-section" className="relative z-10 min-h-screen flex items-center justify-center px-8 py-16">
        <div className="container mx-auto">
          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Features Bar */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: feature.delay, duration: 0.5 }}
                >
                  <Icon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Section Navigation */}
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 px-8 py-3 rounded-full text-lg font-medium"
              onClick={() => {
                const element = document.getElementById('role-cards');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Explore Roles <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Role Cards & CTA Section */}
      <section id="role-cards" className="relative z-10 min-h-screen flex items-center justify-center px-8 py-16">
        <div className="container mx-auto">
          {/* Role Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {roleCards.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
                >
                  <Link to={role.path} className="block group h-full">
                    <motion.div
                      className="relative h-[500px] rounded-3xl p-8 border border-white/10 overflow-hidden"
                      whileHover={{ scale: 1.03, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-90`} />
                      <div className={`absolute inset-0 bg-gradient-to-br ${role.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Icon */}
                        <motion.div
                          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        {/* Title */}
                        <h3 className="text-3xl font-bold text-white mb-6 flex-shrink-0">{role.title}</h3>
                        
                        {/* Features */}
                        <div className="space-y-2 mb-6 flex-1">
                          {role.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/20 flex-shrink-0">
                          <div>
                            <p className="text-2xl font-bold text-white">{role.stats.value}</p>
                            <p className="text-xs text-white/60">{role.stats.label}</p>
                          </div>
                          <motion.div
                            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                            whileHover={{ scale: 1.2, rotate: 45 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ArrowRight className="w-5 h-5 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Join thousands of students, colleges, and recruiters who are already using TalentBridge to achieve their goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/student" className="block">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started Now <Rocket className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 px-8 py-4 rounded-full text-lg font-medium"
                  onClick={() => {
                    const element = document.getElementById('footer');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="footer" className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                <span style={{ color: '#5A6BFF' }}>Talent</span>
                <span style={{ color: '#7C4DFF' }}>Bridge</span>
              </h3>
              <p className="text-white/60 text-sm">
                AI-powered recruitment platform connecting talent with opportunity.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Features</li>
                <li>Pricing</li>
                <li>Success Stories</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <motion.div
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © 2024 TalentBridge. All rights reserved. Made with <Heart className="w-4 h-4 inline text-red-500" /> for talent worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
