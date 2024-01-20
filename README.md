# **ACMS Frontend**

### Tools that needs to be installed:

- Node (https://nodejs.org/en/download)
- VS Code (https://code.visualstudio.com/)

### Tech Stack

- [React/Next.js](https://nextjs.org/) - front-end framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - programming language
- [Radix UI Primitives](https://www.radix-ui.com/primitives) - component system
- [Storybook](https://storybook.js.org/) - UI toolkit

### Setting up your application

1. Clone the Repository:

```bash
git clone https://github.com/SAMAHAN-Systems-Development/ACMS-backend-2023
```

1. Fetch the updates:

```bash
git fetch
```

1. Switch to the branch of your ticket, for example:

```bash
git checkout 1-create-student-registration-form-for-each-event
```

1. Install the libraries with this command:

```bash
npm i
```

1. Create an .env file in the root directory and add the following:

```bash
NEXT_APP_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

### Running your application

1. Pull from the main

```bash
git pull origin main
```

1. Install the libraries

```bash
npm i
```

1. Run the NextJS frontend

```bash
npm run dev
```
