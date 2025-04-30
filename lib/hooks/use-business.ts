'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/auth-provider';

// Business type definition
export type Business = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  loyaltyGoal: number;
  rewardText: string;
  reviewLinks: {
    google?: string;
    yelp?: string;
    facebook?: string;
  };
  createdAt: string;
};

// Customer type definition
export type Customer = {
  id: string;
  businessId: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
  stamps: number;
  rewardsClaimed: number;
  lastVisit: string;
  createdAt: string;
};

// Review type definition
export type Review = {
  id: string;
  businessId: string;
  customerId?: string;
  rating: number;
  feedback?: string;
  clickedGoogle: boolean;
  clickedYelp: boolean;
  clickedFacebook: boolean;
  createdAt: string;
};

// Stats type definition
export type DashboardStats = {
  totalCustomers: number;
  activeCustomers: number;
  totalStamps: number;
  totalRewardsClaimed: number;
  averageRating: number;
  totalReviews: number;
  reviewLinkClicks: {
    google: number;
    yelp: number;
    facebook: number;
  };
};

// Mock data for MVP
const MOCK_BUSINESS: Business = {
  id: 'business-1',
  name: 'Coffee Haven',
  slug: 'coffee-haven',
  logoUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  loyaltyGoal: 10,
  rewardText: 'Free coffee of your choice!',
  reviewLinks: {
    google: 'https://google.com',
    yelp: 'https://yelp.com',
    facebook: 'https://facebook.com',
  },
  createdAt: new Date().toISOString(),
};

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'customer-1',
    businessId: 'business-1',
    email: 'john@example.com',
    name: 'John Doe',
    phoneNumber: '+1234567890',
    stamps: 7,
    rewardsClaimed: 2,
    lastVisit: new Date().toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'customer-2',
    businessId: 'business-1',
    email: 'jane@example.com',
    name: 'Jane Smith',
    phoneNumber: '+1987654321',
    stamps: 3,
    rewardsClaimed: 0,
    lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'customer-3',
    businessId: 'business-1',
    email: 'mike@example.com',
    name: 'Mike Johnson',
    phoneNumber: '+1567891234',
    stamps: 9,
    rewardsClaimed: 1,
    lastVisit: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 'review-1',
    businessId: 'business-1',
    customerId: 'customer-1',
    rating: 5,
    feedback: 'Great coffee and service!',
    clickedGoogle: true,
    clickedYelp: false,
    clickedFacebook: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-2',
    businessId: 'business-1',
    customerId: 'customer-2',
    rating: 4,
    feedback: 'Love the loyalty program',
    clickedGoogle: true,
    clickedYelp: true,
    clickedFacebook: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock dashboard stats
const MOCK_STATS: DashboardStats = {
  totalCustomers: 32,
  activeCustomers: 18,
  totalStamps: 156,
  totalRewardsClaimed: 9,
  averageRating: 4.7,
  totalReviews: 24,
  reviewLinkClicks: {
    google: 19,
    yelp: 7,
    facebook: 5,
  },
};

// Custom hook to fetch and manage business data
export function useBusiness() {
  const { user } = useAuth();
  const [business, setBusiness] = useState<Business | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch business data
  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!user?.businessId) return;
      
      try {
        // In a real app, this would be an API call to fetch from DynamoDB
        // For MVP, we're using mock data
        setBusiness(MOCK_BUSINESS);
        setCustomers(MOCK_CUSTOMERS);
        setReviews(MOCK_REVIEWS);
        setStats(MOCK_STATS);
      } catch (error) {
        console.error('Failed to fetch business data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessData();
  }, [user]);

  // Update business
  const updateBusiness = async (updatedBusiness: Partial<Business>) => {
    if (!business) return;
    
    try {
      // In a real app, this would be an API call to update DynamoDB
      // For MVP, we're updating the local state
      const updated = { ...business, ...updatedBusiness };
      setBusiness(updated);
      return updated;
    } catch (error) {
      console.error('Failed to update business', error);
      throw error;
    }
  };

  // Add customer
  const addCustomer = async (customer: Omit<Customer, 'id' | 'businessId' | 'createdAt'>) => {
    if (!business) return;
    
    try {
      // In a real app, this would be an API call to add to DynamoDB
      // For MVP, we're updating the local state
      const newCustomer: Customer = {
        id: `customer-${Date.now()}`,
        businessId: business.id,
        ...customer,
        createdAt: new Date().toISOString(),
      };
      
      setCustomers([...customers, newCustomer]);
      return newCustomer;
    } catch (error) {
      console.error('Failed to add customer', error);
      throw error;
    }
  };

  // Award stamp
  const awardStamp = async (customerId: string) => {
    try {
      // In a real app, this would be an API call to update DynamoDB
      // For MVP, we're updating the local state
      const customerIndex = customers.findIndex(c => c.id === customerId);
      
      if (customerIndex === -1) return null;
      
      const updatedCustomers = [...customers];
      const customer = { ...updatedCustomers[customerIndex] };
      
      // Check if customer has reached the loyalty goal
      if (customer.stamps >= (business?.loyaltyGoal || 10) - 1) {
        customer.stamps = 0;
        customer.rewardsClaimed += 1;
      } else {
        customer.stamps += 1;
      }
      
      customer.lastVisit = new Date().toISOString();
      updatedCustomers[customerIndex] = customer;
      
      setCustomers(updatedCustomers);
      return customer;
    } catch (error) {
      console.error('Failed to award stamp', error);
      throw error;
    }
  };

  // Add review
  const addReview = async (review: Omit<Review, 'id' | 'businessId' | 'createdAt'>) => {
    if (!business) return;
    
    try {
      // In a real app, this would be an API call to add to DynamoDB
      // For MVP, we're updating the local state
      const newReview: Review = {
        id: `review-${Date.now()}`,
        businessId: business.id,
        ...review,
        createdAt: new Date().toISOString(),
      };
      
      setReviews([...reviews, newReview]);
      return newReview;
    } catch (error) {
      console.error('Failed to add review', error);
      throw error;
    }
  };

  // Track review link click
  const trackReviewClick = async (platform: 'google' | 'yelp' | 'facebook') => {
    if (!business) return;
    
    try {
      // In a real app, this would be an API call to update DynamoDB/Lambda
      // For MVP, we're just logging
      console.log(`Review link click tracked: ${platform}`);
      
      // Update local stats
      if (stats) {
        const updatedStats = { ...stats };
        updatedStats.reviewLinkClicks[platform] += 1;
        setStats(updatedStats);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to track review click', error);
      throw error;
    }
  };

  return {
    business,
    customers,
    reviews,
    stats,
    isLoading,
    updateBusiness,
    addCustomer,
    awardStamp,
    addReview,
    trackReviewClick,
  };
}