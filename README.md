# Purrse

Purrse is a personal finance management app designed specifically for students. It helps users track their expenses, set budgets, and optimize spending with a playful, cat-themed interface. With features like AI-powered insights, a financial chatbot, and receipt tracking, Purrse makes managing finances fun, intuitive, and tailored to the needs of broke students!

## Table of Contents
1. [Inspiration](#inspiration)
2. [What it Does](#what-it-does)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Challenges](#challenges)
6. [What’s Next](#whats-next)
7. [Demo](#demo)
8. [License](#license)

## Inspiration

Being a broke uni kid, I felt the need for a simple yet effective solution that could help me track my expenses, set budgets, and optimize my spending. Purrse was something I wanted to build for a long time and I decided to complete it this hackathon and hopefully, help some folks. So, ye I decided to build Purrse—a finance app specifically designed for students, with a cat-theme to make it more fun!

## Demo

https://youtu.be/qTS0fK3wp9A

## What It Does
Purrse is a finance management app designed to help students track their income, expenses, and savings easily, providing visual representation and AI Capabilities.
# Features
- Expense Tracking: Track your spending and categorize it in a user-friendly way.
- Budget Planning: Set and monitor budgets to stay within your financial limits.
- AI-Powered Insights: Get personalized, cat-themed AI insights on your spending habits.
- Orange Bot: A feline finance companion (named Orange) to help you make financial decisions with some fun advice ( Nebius AI )
- Receipt Scanning: Using Nebius AI **Qwen/Qwen2-VL-7B-Instruct**, you can scan and categorize receipts to track your expenses more effectively.
- Subscription & Debt Manager: Log and track subscriptions, micro-debts with friends, and get reminders for upcoming renewals.
- Learning Resources: Educational modules and quizzes to improve your financial literacy.
Interactive Gamification: Enjoy visual rewards like confetti and gifs when you hit savings goals or complete tasks.

## Technologies

- **TypeScript** 
- **Nextjs** 
- **Tailwind**
- **Prisma**
- **Clerk**
- **NEBIUS AI** - Vision model **Qwen/Qwen2-VL-7B-Instruct** for 'receipt scanning'
- **CodeBuff** - Used to simplify my code process especially UI aspect
- **TempoLabs** - Fiddled with to generate wireframes
- **MagicLoops** - Inspired the daily cat quote idea from one of it's loop



## How We Built It

We started off with ideation. I created a Google Doc to list all the features I wanted to include in my finance app. There were many ideas, and after alot of thoughts, I shortlisted the features that I thought would provide the most value to users while keeping the app simple and effective.

- **Tool Exploration and Design: **I spent a lot of time exploring various tools that could help me build this app. I experimented with **Tempolabs**, which helped me generate wireframes and a basic design layout for the app. This was my foundation, which I then customized based on my vision for the user interface.

- **Receipt Tracking with Nebius AI:** One of the key features I wanted to include was a **vision model** for receipt tracking. I chose Nebius AI  **Qwen/Qwen2-VL-7B-Instruct** to extract data from receipts and store it in a "Receipt Hub" for easy tracking. The AI model was a fantastic addition and made tracking spending easy and accurate.

- **Chatbot Integration:** For the financial chatbot, I decided to go with a fun approach by naming it "Orange," a feline finance companion that would help users with finance-related queries. I used chatbot frameworks and some custom logic to build Orange, making sure it gave some playful responses while still being informative.

- **UI Development:** The user interface was designed using Tailwind CSS and customized with Prisma for database management. I integrated Clerk for authentication, allowing users to sign up and securely log in. **CodeBuff** helped a lot in UI part.

- **Budgeting and Goals:** The app includes a budgeting feature with a progress bar and slider mechanism to track savings goals. For added engagement, I incorporated gamification elements such as confetti animations and **Oioaa cat gifs** when users complete their savings goals.

- **Subscription & Debt Management:** A subscription manager was added, which helps users track services like Netflix, Spotify, etc., and sends reminders when payments are due. Similarly, the Micro-Debt Manager helps users track debts with friends and send notifications when it's time to pay back.

- **Learning Finance:** I included a Purractical Finance section with modules to teach budgeting, saving, and managing debt. These modules include quizzes, tips, and resources, with a meme cat serving as the guide to make learning fun and interactive.

## Tech Stack: 
TypeScript, Next.js, Prisma, Tailwind CSS, Clerk for authentication, Nebius AI for receipt scanning, Codebuff, and Tempolabs for wireframes.

## Challenges We Ran Into

One of the biggest challenges was working with AI. I ran into an error with the AI receipts feature with the vision model and spent hours debugging it. The issue turned out to be a simple bug, but it was a pretty fun learning experience.

Another challenge was time. I started the project quite late, which meant I had to structure and prioritize features carefully. It was pretty hard so I focused on the most important features for the MVP and the rest was done once MVP was ready.

The AI integration also took time to fine-tune with the chatbot. It was fun coz I eventually got it working just as I envisioned.

## Accomplishments That We're Proud Of
I’m most proud of the fact that Purrse came to life. It combines various powerful tools to create a truly unique experience for students struggling to manage their finances. The use of AI for receipt scanning and chatbot interactions is something I’m particularly proud of, as it provides real value and a fun twist.

Thanks to CodeBuff, I was able to code stuff pretty fast. Too bad, credits got over and I had to manually do stuff. The visual design and user interface turned out great, thanks to Tempolabs and Tailwind CSS, and I like the interactivity and charts. I also LEARNT ALOT about different tools and technologies, which improved my development skills significantly.

## What We Learned
This project taught me a lot about various technologies, from AI and chatbot development to web development with Next.js and Tailwind CSS. I also learned how to work with databases using Prisma and how to integrate third-party tools like Clerk for authentication.

MOST IMPORTANTLY, I learnt ALOT of new tools and technologies that I never knew would boost my productivity so much and I cannot wait to use them in more projects.

I learned the importance of effective time management and prioritizing features when working on personal projects. Debugging and troubleshooting were huge learning moments, especially when dealing with AI and backend systems.

Lastly, I learned a lot about design principles and how to make an app both functional and visually appealing, while also ensuring it was engaging for users.

## What's Next for Purrse

The next steps for Purrse are focused on scaling and adding more features:

- **Scaling to Production:** I plan to deploy Purrse to production and ensure it's ready for wider use. This includes optimizing performance, ensuring security, and making the app stable for real users.

- **More AI Features:** I hope to enhance the AI component by adding more sophisticated financial insights, such as personalized budgeting suggestions, trend analysis, and deeper expense categorization.

- **Financial Integration:** A goal is to integrate Finalcial, a real-world financial API, to allow users to link their bank accounts and track transactions in real-time.

- **Mobile App:** I’d also love to extend Purrse into a mobile app, so students can manage their finances on the go.
