import Link from 'next/link';
import Image from 'next/image';
import { MainNav } from '@/components/layout/main-nav';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Award,
  BarChart3,
  QrCode,
  Star,
  Users,
  Check,
  SmartphoneNfc,
  MessageSquare,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 py-16 md:py-24">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Build Customer Loyalty <span className="text-blue-500">Without the Hassle</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              LoyalBoost helps small businesses create digital loyalty cards and collect valuable customer reviews with a simple, all-in-one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
                <Link href="/signup">Start for free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">Learn more</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -left-8 -top-8 w-72 h-72 bg-blue-500/10 rounded-full filter blur-xl"></div>
            <div className="absolute -right-8 -bottom-8 w-72 h-72 bg-green-500/10 rounded-full filter blur-xl"></div>
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Customer using a digital loyalty card"
                width={600}
                height={400}
                className="rounded-xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Build Customer Loyalty
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              LoyalBoost streamlines your customer loyalty program and review collection in one simple platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-transparent hover:border-blue-500/20 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 dark:bg-blue-950 p-3 w-fit rounded-lg mb-4">
                  <QrCode className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>Digital Loyalty Cards</CardTitle>
                <CardDescription>
                  Replace paper punch cards with digital stamps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Create custom loyalty programs with digital stamp cards. Customers scan a QR code to collect stamps and redeem rewards.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-transparent hover:border-blue-500/20 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 dark:bg-blue-950 p-3 w-fit rounded-lg mb-4">
                  <Star className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>Review Management</CardTitle>
                <CardDescription>
                  Boost your online reputation with ease
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Encourage happy customers to leave reviews on Google, Yelp, and more. Track clicks and manage your online presence.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-transparent hover:border-blue-500/20 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 dark:bg-blue-950 p-3 w-fit rounded-lg mb-4">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>
                  Build lasting relationships with your customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Keep track of your loyal customers, their visit history, and reward redemptions all in one place.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-transparent hover:border-blue-500/20 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 dark:bg-blue-950 p-3 w-fit rounded-lg mb-4">
                  <SmartphoneNfc className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>Mobile-Friendly</CardTitle>
                <CardDescription>
                  Works perfectly on all devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Responsive design works seamlessly on phones, tablets, and desktops for both you and your customers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-transparent hover:border-blue-500/20 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 dark:bg-blue-950 p-3 w-fit rounded-lg mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>Actionable Insights</CardTitle>
                <CardDescription>
                  Data-driven decisions for your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Track loyalty program engagement, review conversion rates, and customer retention with easy-to-understand analytics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-transparent hover:border-blue-500/20 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 dark:bg-blue-950 p-3 w-fit rounded-lg mb-4">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>Customer Feedback</CardTitle>
                <CardDescription>
                  Collect valuable insights directly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Gather feedback from customers to improve your business and address issues before they become online reviews.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple to Set Up, Even Easier to Use
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Get your loyalty program up and running in minutes, not days.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-blue-500">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up and set up your business profile with logo and brand colors.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-blue-500">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customize Your Program</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Set up your loyalty program rules, rewards, and review links.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-blue-500">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Rewarding Customers</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your unique QR code and start building customer loyalty.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
              <Link href="/signup">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Local Businesses
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See what other small businesses have to say about LoyalBoost.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-transparent hover:border-blue-500/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Sarah Johnson"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                    <CardDescription>Bloom Coffee Shop</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "LoyalBoost has completely transformed how we handle our loyalty program. Our customers love the digital stamps, and we've seen a 30% increase in repeat visits."
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-transparent hover:border-blue-500/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Michael Chen"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Michael Chen</CardTitle>
                    <CardDescription>Chen's Bistro</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "The review collection feature has helped us get 15 new Google reviews in just the first month. The dashboard makes it easy to track everything in one place."
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-transparent hover:border-blue-500/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Jessica Rodriguez"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Jessica Rodriguez</CardTitle>
                    <CardDescription>Bliss Spa & Salon</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "As a busy salon owner, I needed something simple. LoyalBoost is so easy to use, both for us and our clients. Our customers love getting rewards for their visits."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the plan that works best for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-transparent">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Perfect for new and small businesses.
                </p>
                <ul className="space-y-2">
                  {[
                    'Digital loyalty cards',
                    'Up to 500 customers',
                    'Basic review collection',
                    'Email support',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="px-6 pb-6">
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </Card>
            
            <Card className="border-2 border-blue-500 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              <CardHeader>
                <CardTitle>Business</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Great for established small businesses.
                </p>
                <ul className="space-y-2">
                  {[
                    'Everything in Starter',
                    'Up to 2,000 customers',
                    'Advanced analytics',
                    'Custom branding',
                    'Priority support',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="px-6 pb-6">
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </Card>
            
            <Card className="border-2 border-transparent">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  For growing businesses with multiple locations.
                </p>
                <ul className="space-y-2">
                  {[
                    'Everything in Business',
                    'Unlimited customers',
                    'Multiple locations',
                    'Receipt OCR integration',
                    'API access',
                    '24/7 phone support',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="px-6 pb-6">
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Boost Your Customer Loyalty?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of small businesses using LoyalBoost to build stronger customer relationships and grow their business.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/signup">Get Started for Free</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}