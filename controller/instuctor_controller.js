import bcrypt  from'bcrypt';
import jwt  from'jsonwebtoken';
import {Instructor}  from '../model/instructor_model.js';

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    // Check if the email is already registered
    const existingUser = await Instructor.findOne({ email:email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new Instructor({
         name:name,
         email:email,
         password: hashedPassword,
         phoneNumber:phoneNumber });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error: 'Failed to register a new user' });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await Instructor.findOne({email:email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'secretkey',{expiresIn:'1d'});
    res.json({ userId:user.id, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};


// Get all users
export const getAllUsers = async (req, res) => {
    try {
      const users = await Instructor.find().select("id name email phoneNumber");
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  };

  // Get  user
export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const userexist = await Instructor.findById(id).select("name email phoneNumber");
    if (!userexist) {
      return res.status(404).json({ error: 'User Not Found' });
    }
    res.json(userexist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

  
  
  // Update a user
export const updateUser = async (req, res) => {
    try {
      const { name, email, password, phoneNumber, courses } = req.body;
      const user = await Instructor.findByIdAndUpdate(
        req.params.id,
        { name, email, password, phoneNumber, courses },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the user' });
    }
  };
  
  // Delete a user
export const deleteUser = async (req, res) => {
    try {
      const user = await Instructor.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the user' });
    }
  };

