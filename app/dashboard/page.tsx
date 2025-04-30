'use client';

import { useEffect } from 'react';
import { useBusiness } from '@/lib/hooks/use-business';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Award,
  BarChart2,
  Star,
  Users,
  Stamp,
  QrCode,
  Calendar,
} from 'lucide-react';

// Generate mock data for charts
const generateDailyData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day) => ({
    name: day,
    Stamps: Math.floor(Math.random() * 20) + 5,
    Rewards: Math.floor(Math.random() * 5),
  }));
};

const generateMonthlyData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ].slice(0, new Date().getMonth() + 1);
  
  return months.map((month) => ({
    name: month,
    Customers: Math.floor(Math.random() * 10) + 5,
    Reviews: Math.floor(Math.random() * 8) + 2,
  }));
};

const reviewSourceData = [
  { name: 'Google', value: 19 },
  { name: 'Yelp', value: 7 },
  { name: 'Facebook', value: 5 },
];

export default function DashboardPage() {
  const { business, stats, isLoading } = useBusiness();
  
  // Data for charts
  const dailyData = generateDailyData();
  const monthlyData = generateMonthlyData();
  
  if (isLoading || !business || !stats) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-4 w-40" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[200px] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          description="Unique customers in database"
          change={{ value: 12, positive: true }}
        />
        <StatsCard
          title="Loyalty Stamps"
          value={stats.totalStamps}
          icon={Stamp}
          description="Total stamps awarded"
          change={{ value: 18, positive: true }}
        />
        <StatsCard
          title="Rewards Claimed"
          value={stats.totalRewardsClaimed}
          icon={Award}
          description="Rewards redeemed by customers"
          change={{ value: 5, positive: true }}
        />
        <StatsCard
          title="Average Rating"
          value={stats.averageRating.toFixed(1)}
          icon={Star}
          iconColor="text-yellow-500"
          description={`Based on ${stats.totalReviews} reviews`}
          change={{ value: 3, positive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Program Activity</CardTitle>
            <CardDescription>
              Stamps collected and rewards claimed in the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="Stamps" 
                  fill="hsl(var(--chart-1))" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="Rewards" 
                  fill="hsl(var(--chart-2))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>
              New customers and reviews over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Customers" 
                  stroke="hsl(var(--chart-3))" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Reviews" 
                  stroke="hsl(var(--chart-4))" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Review Sources */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest customer interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Stamp Collected',
                  customer: 'Mike Johnson',
                  time: '10 minutes ago',
                  icon: <Stamp className="w-4 h-4 text-blue-500" />,
                },
                {
                  action: 'Reward Claimed',
                  customer: 'Jane Smith',
                  time: '2 hours ago',
                  icon: <Award className="w-4 h-4 text-green-500" />,
                },
                {
                  action: 'New Review',
                  customer: 'John Doe',
                  time: 'Yesterday',
                  icon: <Star className="w-4 h-4 text-yellow-500" />,
                },
                {
                  action: 'QR Code Scanned',
                  customer: 'Sarah Wilson',
                  time: 'Yesterday',
                  icon: <QrCode className="w-4 h-4 text-purple-500" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border">
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.customer} · {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Sources</CardTitle>
            <CardDescription>
              Where your customers are leaving reviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={reviewSourceData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Reviews" 
                  fill="hsl(var(--chart-5))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}