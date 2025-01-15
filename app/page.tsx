import { Github, FileText, Cat } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray text-gray-900">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-3 mt-3 bg-gray">
        <div className="flex items-center space-x-2">
          <Cat className="w-12 h-12 text-purple-200 hover:text-purple-300 transition-all duration-300" />
          <span className="text-2xl font-bold text-purple-200 hover:text-purple-300 transition-all duration-300">
            Purrse
          </span>
        </div>
        <div className="flex items-center mr-8 space-x-6">
          <div className="flex items-center space-x-4">
            <Link 
              href="/docs" 
              className="flex items-center space-x-1 text-gray-600 hover:text-purple-400 transition-all"
            >
              <FileText className="w-8 h-8" />
              <span className="text-lg">Docs</span>
            </Link>
            <Link 
              href="https://github.com/JuanitaCathy/purrse.git" 
              className="flex items-center space-x-1 text-gray-600 hover:text-purple-400 transition-all"
            >
              <Github className="w-8 h-8" />
              <span className="text-lg">GitHub</span>
            </Link>
          </div>
          <Link
            href="#demo"
            className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px]"
          >
            <span className="absolute inset-[-1000%] animate-shimmer bg-[linear-gradient(45deg,transparent_25%,rgba(134, 87, 178, 0.4)_50%,transparent_75%,transparent_100%)]" />
            <span className="inline-flex items-center h-12 animate-shimmer justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Demo
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-16 pb-24">
        <div className="text-center mt-20">
        <h1 className="text-6xl font-bold text-transparent bg-gradient-to-t from-gray-600 via-gray-400 to-white bg-clip-text mb-8 mt-12">
         Too Broke for a <span className="text-transparent bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text">Coffee</span>?<br />
          We Got You!
        </h1>

          <p className="text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Because being a broke student shouldn't be a lifestyle
          </p>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Track every penny, set saving goals, manage your student loans, and still have enough for that coffee you desperately need.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center h-14 animate-shimmer justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000400,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Get Started
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-[20vh] mb-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-gradient-to-r from-purple-100 via-purple-200 to-purple-100 bg-clip-text">
            Features that Make <span className="text-transparent bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text">Money Management</span> Fun
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] transition-all duration-300 transform hover:scale-105 border border-gray-800/50">
            <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-rose-400 to-purple-300 bg-clip-text mb-4">AI-Powered Financial Buddy</h3>
            <p className="text-gray-300 leading-relaxed">
              Meet your personal finance AI companion that speaks your language. Get real-time insights about your spending habits, 
              custom savings recommendations, and gentle reminders when you're about to blow your budget on another late-night pizza order.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] transition-all duration-300 transform hover:scale-105 border border-gray-800/50">
            <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-purple-300 to-rose-400 bg-clip-text mb-4">Smart Receipt Scanner</h3>
            <p className="text-gray-300 leading-relaxed">
              Just snap a photo of your receipt and let our AI do the heavy lifting. It automatically categorizes your expenses, 
              tracks GST, and even identifies potential savings. Perfect for keeping track of those coffee runs and textbook splurges.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] transition-all duration-300 transform hover:scale-105 border border-gray-800/50">
            <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-rose-400 to-purple-300 bg-clip-text mb-4">Bill Split & IOU Tracker</h3>
            <p className="text-gray-300 leading-relaxed">
              Never chase your roommates for bills again. Split expenses instantly, track who owes what, and send friendly 
              reminders automatically. Perfect for shared groceries, utility bills, or that group dinner you fronted last week.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] transition-all duration-300 transform hover:scale-105 border border-gray-800/50">
            <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-purple-300 to-rose-400 bg-clip-text mb-4">Subscription Detective</h3>
            <p className="text-gray-300 leading-relaxed">
              Discover and track all your subscriptions in one place. Get alerts before free trials end and find out if you're 
              actually using that premium Spotify account. We'll help you decide what stays and what goes.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] transition-all duration-300 transform hover:scale-105 border border-gray-800/50">
            <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-rose-400 to-purple-300 bg-clip-text mb-4">Student Loan Navigator</h3>
            <p className="text-gray-300 leading-relaxed">
              Take control of your student loans with our comprehensive tracker. Monitor multiple loans, understand repayment options, 
              and get personalized strategies to tackle your debt efficiently after graduation.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] transition-all duration-300 transform hover:scale-105 border border-gray-800/50">
            <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-purple-300 to-rose-400 bg-clip-text mb-4">Financial Learning Hub</h3>
            <p className="text-gray-300 leading-relaxed">
              Level up your financial literacy with bite-sized lessons and interactive guides. From budgeting basics to 
              investment fundamentals, learn everything you wish they taught in school about money management.
            </p>
          </div>
        </div>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="bg-gray py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 bg-clip-text">
            Frequently Asked <span className="text-transparent bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text">Questions</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="text-xl font-medium text-purple-300 hover:text-purple-200 hover:no-underline">
                  How is Purrse different from other finance apps?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Unlike traditional finance apps, Purrse is specifically designed for students with AI-powered insights, 
                  receipt scanning, and a fun cat-themed interface that makes money management less intimidating and more engaging.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b-0">
                <AccordionTrigger className="text-xl font-medium text-purple-300 hover:text-purple-200 hover:no-underline">
                  Is my financial data secure?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Absolutely! We use bank-level encryption and never store your bank credentials. Your security is our top priority, 
                  and we regularly undergo security audits to ensure your data is protected.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger className="text-xl font-medium text-purple-300 hover:text-purple-200 hover:no-underline">
                  Do I need to connect my bank account?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  While connecting your bank account provides the best experience, it's completely optional. You can manually track 
                  expenses, scan receipts, and use most features without linking any accounts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b-0">
                <AccordionTrigger className="text-xl font-medium text-purple-300 hover:text-purple-200 hover:no-underline">
                  Can I use Purrse after graduation?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Of course! While Purrse is optimized for student life, its features are valuable for anyone managing their finances. 
                  The app grows with you, adapting to your changing financial needs after graduation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b-0">
                <AccordionTrigger className="text-xl font-medium text-purple-300 hover:text-purple-200 hover:no-underline">
                  Do I need to pay or provide credit card information?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Absolutely not! Purrse is completely free for students. No credit card required, no hidden fees, 
                  and no premium tiers. We believe in making financial management accessible to all students.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
