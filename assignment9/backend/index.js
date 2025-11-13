import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// ========== MIDDLEWARE ==========
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ========== DATA STORE ==========
// Pre-populated users for testing
const users = new Map([
  ['john@example.com', { fullName: 'John Doe', email: 'john@example.com', passwordHash: 'password123' }],
  ['jane@example.com', { fullName: 'Jane Smith', email: 'jane@example.com', passwordHash: 'password456' }],
  ['admin@example.com', { fullName: 'Admin User', email: 'admin@example.com', passwordHash: 'admin123' }],
  ['test@example.com', { fullName: 'Test User', email: 'test@example.com', passwordHash: 'test123' }],
]);

// ========== ROUTES ==========

// Health check endpoint
app.get('/', (_req, res) => {
  res.send('API is up and running!');
});

// Create new user
app.post('/user/create', (req, res) => {
  const { fullName, email, password } = req.body || {};
  
  // Validation
  if (!fullName || !email || !password) {
    return res.status(400).json({ 
      error: 'fullName, email, and password are required' 
    });
  }
  
  // Check if user already exists
  if (users.has(email)) {
    return res.status(409).json({ 
      error: 'User already exists with this email' 
    });
  }
  
  // Create new user
  users.set(email, { fullName, email, passwordHash: password });
  
  return res.status(201).json({ 
    message: 'User created successfully', 
    user: { fullName, email } 
  });
});

// User login
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  
  // Find user
  const record = users.get(email);
  
  // Validate credentials
  if (!record || record.passwordHash !== password) {
    return res.status(401).json({ 
      error: 'Invalid email or password' 
    });
  }
  
  // Successful login
  return res.json({ 
    message: 'Login successful', 
    user: { 
      fullName: record.fullName, 
      email: record.email 
    } 
  });
});

// Get all companies with real images
app.get('/api/companies', (_req, res) => {
  const companies = [
    {
      id: 1,
      name: "Tech Innovations Inc.",
      description: "Leading provider of innovative technology solutions",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Digital Marketing Pro",
      description: "Expert digital marketing and SEO services",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Creative Designs Studio",
      description: "Award-winning UX/UI design agency",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Data Analytics Corp",
      description: "Advanced data science and analytics solutions",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Customer Care Solutions",
      description: "Excellence in customer support services",
      imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Project Management Experts",
      description: "Professional project management consultancy",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop"
    }
  ];
  
  console.log('Sending companies data to frontend');
  res.json(companies);
});

// Get all products 
app.get("/api/products", (req, res) => {
  const products = [
    { id: 1, name: "Adidas", price: 10.0, description: "sports shoes" },
    { id: 2, name: "Puma", price: 12.0, description: "running shoes" },
    { id: 3, name: "Reebok", price: 15.0, description: "casual shoes" },
    { id: 4, name: "Nike", price: 20.0, description: "basketball shoes" },
    { id: 5, name: "Woodland", price: 25.0, description: "formal shoes" },
  ];

  // Search functionality
  if (req.query.search) {
    const filteredProducts = products.filter((p) => {
      return p.name.toLowerCase().includes(req.query.search.toLowerCase());
    });
    res.send(filteredProducts);
    return;
  }

  res.send(products);
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  / ');
  console.log('  POST /user/create');
  console.log('  POST /auth/login');
  console.log('  GET  /api/companies');
  console.log('  GET  /api/products');
  console.log('');
  console.log('Test users:');
  console.log('  john@example.com / password123');
  console.log('  jane@example.com / password456');
  console.log('  admin@example.com / admin123');
  console.log('  test@example.com / test123');
});