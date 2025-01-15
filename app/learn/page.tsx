"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, PiggyBank, Wallet, CreditCard } from "lucide-react";
import Image from "next/image";

const LearnPage = () => {
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const modules = [
    {
      id: "budgeting",
      title: "Budgeting for Students",
      description: "Managing money when every penny counts",
      icon: <Wallet className="w-6 h-6" />,
      content: (
        <>
          <h3 className="font-semibold text-lg">Why Budgeting Matters for Students</h3>
          <p>
            As a student, you might have limited income from part-time jobs, scholarships, or parental support. 
            Budgeting helps you make the most of what you have and avoid running out of money before the end of the semester.
          </p>
          <h3 className="font-semibold text-lg mt-4">Student-Specific Budget Tips</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Track Your Spending:</strong> Use apps or a notebook to monitor where your money goes.
            </li>
            <li>
              <strong>Prioritize Essentials:</strong> Rent, tuition, and groceries come first.
            </li>
            <li>
              <strong>Meal Prep:</strong> Cooking at home saves money compared to eating out.
            </li>
            <li>
              <strong>Take Advantage of Discounts:</strong> Many places offer student discounts—don’t forget your ID!
            </li>
          </ul>
          <h3 className="font-semibold text-lg mt-4">Budgeting Methods for Students</h3>
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              <strong>The Weekly Budget:</strong> Divide your monthly income by four and limit your weekly spending.
            </li>
            <li>
              <strong>50/30/20 Rule:</strong> Allocate 50% to needs, 30% to wants, and 20% to savings or debt repayment.
            </li>
          </ol>
          <Image
            src="/images/student-budgeting.gif"
            alt="Budgeting GIF"
            width={400}
            height={250}
            className="rounded-md my-4"
          />
          <h3 className="font-semibold text-lg">Common Budgeting Mistakes</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>Ignoring small expenses that add up over time (e.g., coffee runs).</li>
            <li>Not setting aside money for emergencies.</li>
            <li>Using credit cards for non-essential purchases.</li>
          </ul>
        </>
      ),
      tip: "Always track your expenses. Knowing where your money goes is the first step to taking control.",
      quiz: {
        question: "What should always be your top priority when budgeting as a student?",
        options: ["Entertainment", "Groceries", "Rent and Tuition"],
        answer: "Rent and Tuition",
      },
    },
    {
      id: "saving",
      title: "Saving Strategies for Students",
      description: "Building a safety net, one dollar at a time",
      icon: <PiggyBank className="w-6 h-6" />,
      content: (
        <>
          <h3 className="font-semibold text-lg">Why Save as a Student?</h3>
          <p>
            Saving early builds good financial habits and provides a safety net for unexpected expenses. 
            Even small savings add up over time and can help with future goals like travel, tech gadgets, or emergencies.
          </p>
          <h3 className="font-semibold text-lg mt-4">How to Save on a Student Budget</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Set Small Goals:</strong> Save for short-term needs, like books or a new laptop.
            </li>
            <li>
              <strong>Automate Savings:</strong> Set up auto-transfers to a savings account after every paycheck.
            </li>
            <li>
              <strong>Find Free Alternatives:</strong> Look for free campus events, open-source software, and free textbooks online.
            </li>
            <li>
              <strong>Use Spare Change Apps:</strong> Apps like Acorns round up your purchases and save the difference.
            </li>
          </ul>
          <Image
            src="/images/student-saving.gif"
            alt="Saving GIF"
            width={400}
            height={250}
            className="rounded-md my-4"
          />
          <h3 className="font-semibold text-lg">The Power of Compound Interest</h3>
          <p>
            If you save $50 a month at an average annual return of 7%, you could have over $24,000 in 20 years. 
            Start small and think long-term!
          </p>
        </>
      ),
      tip: "Save first, spend later. Treat savings like a fixed expense.",
      quiz: {
        question: "Which is a good habit to save as a student?",
        options: ["Automate savings", "Spend first, save what's left", "Avoid saving altogether"],
        answer: "Automate savings",
      },
    },
    {
      id: "debt",
      title: "Managing Student Debt",
      description: "Tackling loans without stress",
      icon: <CreditCard className="w-6 h-6" />,
      content: (
        <>
          <h3 className="font-semibold text-lg">Understanding Student Loans</h3>
          <p>
            Student loans can be an investment in your future, but they need to be managed wisely. 
            Know the difference between federal and private loans, and understand your repayment terms.
          </p>
          <h3 className="font-semibold text-lg mt-4">Tips to Manage Student Debt</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Only Borrow What You Need:</strong> Avoid taking out more loans than necessary.
            </li>
            <li>
              <strong>Pay Interest Early:</strong> Start making small payments on interest while in school.
            </li>
            <li>
              <strong>Explore Forgiveness Options:</strong> Look into federal programs like Public Service Loan Forgiveness.
            </li>
            <li>
              <strong>Part-Time Work:</strong> Use part-time jobs to offset costs and minimize borrowing.
            </li>
          </ul>
          <Image
            src="/images/student-debt.gif"
            alt="Debt Management GIF"
            width={400}
            height={250}
            className="rounded-md my-4"
          />
          <h3 className="font-semibold text-lg">Avoiding the Debt Trap</h3>
          <p>
            Don’t use student loans for unnecessary expenses like vacations or luxury items. 
            Always understand the impact of interest rates and repayment terms.
          </p>
        </>
      ),
      tip: "Make payments on interest while still in school to reduce your overall loan balance.",
      quiz: {
        question: "What’s the smartest way to reduce student loan debt?",
        options: [
          "Borrow more for safety",
          "Start paying interest while in school",
          "Ignore loans until graduation",
        ],
        answer: "Start paying interest while in school",
      },
    },
  ];

  const handleCompleteModule = (id: string) => {
    if (!completedModules.includes(id)) {
      setCompletedModules([...completedModules, id]);
      setProgress(((completedModules.length + 1) / modules.length) * 100);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">LEARN: Student Finance 101</h1>
        <div className="flex items-center justify-center gap-4">
          <Cat className="w-12 h-12 text-purple-600" />
          <p className="text-lg italic text-gray-600">
            "Let's make finance simple and stress-free!"
          </p>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 font-medium">
            Progress: <span className="font-bold">{progress.toFixed(0)}%</span>
          </p>
          <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
            <div
              className="bg-purple-600 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="budgeting" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          {modules.map((module) => (
            <TabsTrigger
              key={module.id}
              value={module.id}
              className="flex items-center gap-2"
            >
              {module.icon}
              {module.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {modules.map((module) => (
          <TabsContent key={module.id} value={module.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {module.icon}
                  {module.title}
                </CardTitle>
                <p className="text-gray-600 italic">{module.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {module.content}
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-semibold text-purple-700">{module.tip}</p>
                  </div>
                  <div className="mt-4">
                    <p className="font-bold">Quiz Time!</p>
                    <p>{module.quiz.question}</p>
                    <div className="mt-2 flex flex-col gap-2">
                      {module.quiz.options.map((option) => (
                        <button
                          key={option}
                          className="p-2 border rounded-lg hover:bg
-purple-100"
                          onClick={() =>
                            alert(
                              option === module.quiz.answer
                                ? "Correct! 🎉"
                                : "Oops! Try again! 😿"
                            )
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCompleteModule(module.id)}
                    className={`mt-4 px-4 py-2 rounded-lg text-white ${
                      completedModules.includes(module.id)
                        ? "bg-green-600"
                        : "bg-purple-600"
                    }`}
                    disabled={completedModules.includes(module.id)}
                  >
                    {completedModules.includes(module.id)
                      ? "Completed"
                      : "Mark as Completed"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LearnPage;
