import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const router = Router();

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['student', 'college', 'recruiter'])
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(['student', 'college', 'recruiter']),
  // Role-specific fields
  collegeId: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
});

// Helper functions
const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });
};

// Auth routes
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = loginSchema.parse(req.body);
    
    let user;
    switch (role) {
      case 'student':
        user = await prisma.student.findUnique({ where: { email } });
        break;
      case 'college':
        user = await prisma.college.findUnique({ where: { email } });
        break;
      case 'recruiter':
        user = await prisma.recruiter.findUnique({ where: { email } });
        break;
    }
    
    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = generateToken(user.id, role);
    const { passwordHash: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      data: { user: { ...userWithoutPassword, role }, token }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const data = signupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    let user;
    switch (data.role) {
      case 'student':
        // First, ensure we have a default college to reference
        let studentCollegeId = data.collegeId;
        if (!studentCollegeId) {
          // Check if default college exists
          let defaultCollege = await prisma.college.findUnique({
            where: { code: 'DEFAULT_COLLEGE' }
          });
          
          // Create it if it doesn't exist
          if (!defaultCollege) {
            defaultCollege = await prisma.college.create({
              data: {
                name: 'Default College',
                code: 'DEFAULT_COLLEGE',
                email: 'admin@defaultcollege.edu',
                passwordHash: hashedPassword,
                location: 'Default Location',
                isVerified: true
              }
            });
          }
          studentCollegeId = defaultCollege.id;
        }
        
        user = await prisma.student.create({
          data: {
            email: data.email,
            passwordHash: hashedPassword,
            name: data.name,
            collegeId: studentCollegeId,
            course: "Computer Science",
            branch: "CS",
            year: "3",
            status: "available",
            cgpa: 8.0,
            skills: "JavaScript,React",
            certifications: "",
            aiInterviewScore: 0,
            skillMatchPercentage: 0,
            projectExperience: 0
          }
        });
        break;
      case 'college':
        user = await prisma.college.create({
          data: {
            email: data.email,
            passwordHash: hashedPassword,
            name: data.name,
            code: "COLLEGE_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            location: "Default Location",
            isVerified: false
          }
        });
        break;
      case 'recruiter':
        // First, ensure we have a default college to reference
        let recruiterCollegeId = data.collegeId;
        if (!recruiterCollegeId) {
          // Check if default college exists
          let defaultCollege = await prisma.college.findUnique({
            where: { code: 'DEFAULT_COLLEGE' }
          });
          
          // Create it if it doesn't exist
          if (!defaultCollege) {
            defaultCollege = await prisma.college.create({
              data: {
                name: 'Default College',
                code: 'DEFAULT_COLLEGE',
                email: 'admin@defaultcollege.edu',
                passwordHash: hashedPassword,
                location: 'Default Location',
                isVerified: true
              }
            });
          }
          recruiterCollegeId = defaultCollege.id;
        }
        
        user = await prisma.recruiter.create({
          data: {
            email: data.email,
            passwordHash: hashedPassword,
            name: data.name,
            collegeId: recruiterCollegeId,
            company: data.company || "Default Company",
            status: "active"
          }
        });
        break;
    }
    
    const token = generateToken(user.id, data.role);
    const { passwordHash: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      data: { user: { ...userWithoutPassword, role: data.role }, token }
    });
  } catch (error) {
    console.error('Signup error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Signup failed';
    res.status(500).json({ success: false, message: errorMessage });
  }
});

export default router;
