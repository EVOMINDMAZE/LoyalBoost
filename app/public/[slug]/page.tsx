'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/logo';
import { LoyaltyCard } from '@/components/dashboard/loyalty-card';
import { useBusiness, Business } from '@/lib/hooks/use-business';
import { Star, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export default function PublicBusinessPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [isLoading, setIsLoading] = useState(true);
  const [business, setBusiness] = useState<Business | null>(null);
  const { trackReviewClick } = useBusiness();

  // In a real app, this would be an API call to fetch the business by slug
  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      // Using the mock business data from useBusiness.ts
      setBusiness({
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
      });
      setIsLoading(false);
    }, 1000);
  }, [slug]);

  // Handle review link click
  const handleReviewLinkClick = async (platform: 'google' | 'yelp' | 'facebook') => {
    try {
      await trackReviewClick(platform);
      // In a real app, you would redirect to the actual review URL
      window.open(business?.reviewLinks[platform], '_blank');
    } catch (error) {
      console.error('Failed to track review click', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Skeleton className="h-12 w-32 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="loyalty">
                <TabsList className="grid w-full grid-cols-2">
                  <Skeleton className="h-10 rounded-md" />
                  <Skeleton className="h-10 rounded-md" />
                </TabsList>
                <div className="mt-6">
                  <Skeleton className="h-64 w-full rounded-md" />
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Business Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The business you're looking for doesn't exist or has changed its URL.
          </p>
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            {business.logoUrl ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={business.logoUrl}
                  alt={business.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md">
                <Logo showText={false} size={32} />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold">{business.name}</h1>
          <div className="flex items-center justify-center mt-2 text-yellow-500">
            <Star className="fill-current h-5 w-5" />
            <Star className="fill-current h-5 w-5" />
            <Star className="fill-current h-5 w-5" />
            <Star className="fill-current h-5 w-5" />
            <Star className="fill-current h-5 w-5" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>123 Main Street, Anytown</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Open 8am - 8pm daily</span>
            </div>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="loyalty">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="loyalty">Loyalty Card</TabsTrigger>
                <TabsTrigger value="reviews">Leave a Review</TabsTrigger>
              </TabsList>
              
              <TabsContent value="loyalty" className="mt-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Collect stamps and earn rewards!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get a stamp with every visit. After {business.loyaltyGoal} stamps, receive: {business.rewardText}
                  </p>
                </div>
                
                <LoyaltyCard
                  businessName={business.name}
                  logoUrl={business.logoUrl}
                  stamps={2} // Example stamps
                  goal={business.loyaltyGoal}
                />
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Visit us in-store and show this page to collect your stamps!
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Enjoyed your experience?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    We'd love to hear your feedback! Please leave us a review on your preferred platform.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Google', key: 'google', color: 'bg-red-500' },
                    { name: 'Yelp', key: 'yelp', color: 'bg-red-600' },
                    { name: 'Facebook', key: 'facebook', color: 'bg-blue-600' },
                  ].map((platform) => (
                    <Button
                      key={platform.key}
                      className={`${platform.color} hover:opacity-90`}
                      onClick={() => handleReviewLinkClick(platform.key as 'google' | 'yelp' | 'facebook')}
                    >
                      {platform.name}
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your feedback helps us improve and helps others discover our business. Thank you!
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>Powered by LoyalBoost</p>
        </div>
      </div>
    </div>
  );
}