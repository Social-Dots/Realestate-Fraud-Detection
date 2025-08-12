// Mock entities to replace base44 entities
// In production, these would be actual API entities

export const PropertyAnalysis = {
  create: async (data) => {
    console.log('Creating property analysis:', data);
    return Promise.resolve({
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    });
  },
  
  find: async (query) => {
    console.log('Finding property analyses:', query);
    return Promise.resolve([]);
  },
  
  findOne: async (id) => {
    console.log('Finding property analysis:', id);
    return Promise.resolve(null);
  }
};

export const ContactMessage = {
  create: async (data) => {
    console.log('Creating contact message:', data);
    return Promise.resolve({
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    });
  }
};

export const Appointment = {
  create: async (data) => {
    console.log('Creating appointment:', data);
    return Promise.resolve({
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    });
  }
};

// Mock auth entity
export const User = {
  login: async (email, password) => {
    console.log('User login:', email);
    return Promise.resolve({
      id: Date.now().toString(),
      email,
      name: email.split('@')[0]
    });
  },
  
  register: async (userData) => {
    console.log('User registration:', userData);
    return Promise.resolve({
      id: Date.now().toString(),
      ...userData
    });
  }
};