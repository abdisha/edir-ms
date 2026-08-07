import {useEffect, useState} from "react";
import {Mail, Rocket} from "lucide-react";
import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {Github, Linkedin, Twitter,} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Placeholder for a future launch date
  const launchDate = new Date("2024-12-31T00:00:00Z");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // Optionally, redirect or show "Launched!" message
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = () => {
    // In a real application, you would send the email to a backend service
    console.log(`Subscribed with email: ${email}`);
    setSubscribed(true);
    // Simulate API call delay
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 animate-fade-in">
      <Card className="w-full max-w-md text-center  shadow-lg animate-scale-up">
        <CardHeader className="flex flex-col items-center space-y-4 pt-8">
          <Rocket className="h-16 w-16 text-primary animate-bounce-slow" />
          <CardTitle className="text-4xl font-extrabold tracking-tight text-primary">
            Coming Soon!
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            We're working hard to bring you something amazing. Stay tuned!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <div className="flex justify-center space-x-4 text-3xl font-bold text-primary">
            <div className="flex flex-col items-center">
              <span>{countdown.days}</span>
              <span className="text-xs font-medium text-gray-400">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span>{countdown.hours}</span>
              <span className="text-xs font-medium text-gray-400">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span>{countdown.minutes}</span>
              <span className="text-xs font-medium text-gray-400">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span>{countdown.seconds}</span>
              <span className="text-xs font-medium text-gray-400">Seconds</span>
            </div>
          </div>

          <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
            <div className="relative w-full">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email to get notified"
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-primary focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleSubscribe} disabled={subscribed} className="bg-primary hover:bg-primary/90 text-white animate-pulse-once">
              {subscribed ? "Subscribed!" : "Notify Me"}
            </Button>
          </div>
          {subscribed && (
            <p className="text-sm text-green-400 animate-fade-in-up">
              Thanks for subscribing! We'll keep you updated.
            </p>
          )}

          <div className="flex justify-center space-x-6 pt-4">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
              <HugeiconsIcon  icon={Twitter} className="h-6 w-6"/>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
              <HugeiconsIcon  icon={Linkedin} className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
              <HugeiconsIcon
                  icon={Github} className="h-6 w-6" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoonPage;

