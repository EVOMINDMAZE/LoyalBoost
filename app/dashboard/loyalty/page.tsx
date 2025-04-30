'use client';

import { useState, useEffect } from 'react';
import { useBusiness } from '@/lib/hooks/use-business';
import { LoyaltyCard } from '@/components/dashboard/loyalty-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import QRCode from 'qrcode.react';
import { toast } from 'sonner';

const loyaltySchema = z.object({
  loyaltyGoal: z.number().min(1).max(20),
  rewardText: z.string().min(3, {
    message: "Reward description must be at least 3 characters.",
  }),
});

type LoyaltyFormValues = z.infer<typeof loyaltySchema>;

export default function LoyaltyPage() {
  const { business, updateBusiness, isLoading } = useBusiness();
  const [qrSize, setQrSize] = useState(200);
  
  const form = useForm<LoyaltyFormValues>({
    resolver: zodResolver(loyaltySchema),
    defaultValues: {
      loyaltyGoal: 10,
      rewardText: '',
    },
  });
  
  // Update form values when business data loads using useEffect
  useEffect(() => {
    if (business && !form.formState.isDirty) {
      const currentValues = form.getValues();
      if (
        currentValues.loyaltyGoal !== business.loyaltyGoal ||
        currentValues.rewardText !== business.rewardText
      ) {
        form.reset({
          loyaltyGoal: business.loyaltyGoal,
          rewardText: business.rewardText,
        });
      }
    }
  }, [business, form]);
  
  // Handle form submission
  async function onSubmit(values: LoyaltyFormValues) {
    try {
      await updateBusiness({
        loyaltyGoal: values.loyaltyGoal,
        rewardText: values.rewardText,
      });
      toast.success('Loyalty program updated successfully');
    } catch (error) {
      console.error('Failed to update loyalty program', error);
      toast.error('Failed to update loyalty program');
    }
  }
  
  if (isLoading || !business) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Loyalty Program</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="flex justify-center">
                <Skeleton className="h-48 w-48" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-36 mb-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  // QR code value - in a real app, this would be a URL to your stamping endpoint
  const qrValue = `https://loyalboost.com/stamp/${business.id}`;
  
  // URL to public page
  const publicPageUrl = `/public/${business.slug}`;
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Loyalty Program</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Program Settings</CardTitle>
            <CardDescription>
              Configure how your loyalty program works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="loyaltyGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stamps needed for reward</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={20}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescription>
                        How many stamps a customer needs to collect to earn a reward
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rewardText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reward description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Free coffee of your choice"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe what customers will receive when they complete a card
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit">Save Settings</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Card QR Code</CardTitle>
              <CardDescription>
                Display this QR code for customers to scan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <QRCode
                  value={qrValue}
                  size={qrSize}
                  includeMargin
                  className="rounded-lg bg-white p-2"
                />
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setQrSize(Math.max(100, qrSize - 50))}
                  >
                    Smaller
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setQrSize(Math.min(400, qrSize + 50))}
                  >
                    Larger
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const canvas = document.querySelector('canvas');
                      if (canvas) {
                        const url = canvas.toDataURL('image/png');
                        const link = document.createElement('a');
                        link.download = 'loyalboost-qrcode.png';
                        link.href = url;
                        link.click();
                      }
                    }}
                  >
                    Download
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground text-center mt-2">
                  When a customer scans this QR code, they will receive a stamp on their loyalty card
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Card Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <LoyaltyCard
                businessName={business.name}
                logoUrl={business.logoUrl}
                stamps={5}
                goal={business.loyaltyGoal}
              />
              
              <div className="mt-4 text-center">
                <Button asChild variant="outline">
                  <a href={publicPageUrl} target="_blank" rel="noopener noreferrer">
                    View Public Page
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}