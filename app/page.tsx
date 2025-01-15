// import { ModeToggle } from "@/components/Toggle";
import { Github, FileText, Cat } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <Cat className="w-8 h-8 text-purple-600" />
          <span className="text-xl font-bold text-purple-600">PurrFinance</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            href="/docs" 
            className="flex items-center space-x-1 text-gray-600 hover:text-purple-600"
          >
            <FileText className="w-5 h-5" />
            <span>Docs</span>
          </Link>
          <Link 
            href="https://github.com/your-repo" 
            className="flex items-center space-x-1 text-gray-600 hover:text-purple-600"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </Link>
          {/* <ModeToggle /> */}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Manage Your Money with
            <span className="text-purple-600"> Purr</span>fect Precision
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The purr-fect finance app designed specifically for students. Track expenses,
            set budgets, and achieve your financial goals with our feline-friendly interface.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Get Started
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: "Expense Tracking",
              description: "Track your spending habits with our intuitive cat-egories system"
            },
            {
              title: "Budget Planning",
              description: "Set purr-sonal budgets and get notifications when you're close to limits"
            },
            {
              title: "Financial Insights",
              description: "Get tail-ored insights about your spending patterns and habits"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;