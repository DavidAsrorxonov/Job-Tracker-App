# Job Tracker

**The Next Generation Job Application Tracker for Active Job Hunters**

Job Tracker is a modern SaaS web application designed to help job seekers **organize, manage, and take full control of their job applications**.  
It provides a clean, structured, and reliable way to track applications, monitor progress, and stay focused throughout the job search process.

Built with scalability, performance, and user experience in mind, Job Tracker is evolving into a full-featured public SaaS platform.

---

## 🚀 Why Job Tracker Exists

Job searching is stressful and disorganized for many people — spreadsheets get messy, emails are scattered, and follow-ups are forgotten.

Job Tracker was created to:

- Eliminate manual tracking chaos
- Centralize all job applications in one place
- Provide clarity and structure for serious job hunters
- Offer a professional-grade tool built with modern web technologies

---

## ✨ Key Features

- 📌 **Job Application Tracking**
  - Track companies, roles, and application dates
- 🔄 **Application Status Management**
  - Applied, Interview, Offer, Rejected (with extensibility)
- 🧠 **Centralized Dashboard**
  - All applications in one clean, accessible view
- 🔐 **Secure Authentication**
  - Email-based authentication with verification
- 🌙 **Modern UI / UX**
  - Clean, professional design with dark mode support
- ⚡ **Fast & Optimized**
  - Built with the Next.js App Router for performance and scalability

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Authentication:** Better Auth
- **Database:** MongoDB
- **Architecture:** Full-stack (Frontend + Backend)
- **Deployment:** Cloud-ready (Vercel / Railway compatible)

---

## 📂 Project Structure

- `app/` – Next.js App Router pages
- `components/` – Reusable UI components
- `lib/` – Helpers, hooks, and utilities
- `api/` – Backend and authentication routes

---

## 🔐 Authentication Flow

1. User signs up with an email address
2. Verification code is sent to the email
3. User verifies the code
4. Secure access to the dashboard is granted

---

## 🚀 Getting Started (Development)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/job-tracker.git
cd job-tracker
```

npm install

# or

yarn

# or

pnpm install

# or

bun install

MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

npm run dev
