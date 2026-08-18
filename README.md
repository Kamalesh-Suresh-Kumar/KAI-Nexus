# KAI-Nexus

### Digital Identity Network

> **One identity. Every digital presence.**

KAI-Nexus is a personal digital identity and professional presence platform that brings multiple online profiles into a single interactive interface.

Instead of maintaining separate links for different platforms, KAI-Nexus provides a centralized network where visitors can discover and access the owner's professional, coding, competitive programming, data science, and development profiles.

The platform also includes a serverless global view counter powered by Supabase, allowing the website to maintain a persistent visitor count across different devices and browsers.

---

## 🌐 Live Website

**KAI-Nexus:**  
<https://kamalesh-suresh-kumar.github.io/KAI-Nexux/>

**GitHub Repository:**  
<https://github.com/Kamalesh-Suresh-Kumar/KAI-Nexus>

---

# 📌 Overview

KAI-Nexus was designed as a digital identity hub that connects multiple professional and technical platforms through one unified interface.

The project focuses on:

- Personal branding
- Professional profile discovery
- Centralized digital presence
- Interactive platform navigation
- Serverless backend integration
- Persistent global visitor statistics
- Responsive web design
- GitHub Pages deployment

The interface uses a futuristic digital-network concept where the user's online platforms are represented as interconnected nodes around a central KAI core.

---

# 🎯 Objectives

The main objectives of KAI-Nexus are:

1. Create a single digital identity for multiple online platforms.
2. Provide quick access to professional and technical profiles.
3. Build a visually distinctive personal portfolio interface.
4. Replace scattered profile links with one centralized network.
5. Implement a persistent global website view counter.
6. Use a serverless backend instead of maintaining a traditional server.
7. Deploy the complete frontend using GitHub Pages.
8. Keep the architecture lightweight and easy to maintain.

---

# ✨ Key Features

## 1. Digital Identity Network

KAI-Nexus presents the user's online presence as a connected digital network.

The central KAI node represents the core identity, while individual platforms are represented as connected nodes.

---

## 2. Multi-Platform Profile Hub

The website provides direct access to multiple online platforms, including:

| Platform | Purpose |
| --- | --- |
| GitHub | Software Development |
| LinkedIn | Professional Networking |
| Kaggle | AI / Data Science |
| HackerRank | Coding |
| Unstop | Competitions & Career Opportunities |
| LeetCode | Algorithms & Problem Solving |

Each platform is presented as an individual node within the digital network.

---

## 3. Interactive Platform Sections

Selecting a platform displays information about that platform and provides an option to open the corresponding profile.

Each platform section contains:

- Platform identity
- Platform category
- Short description
- Relevant skills or activities
- External profile link

---

## 4. Global View Counter

KAI-Nexus includes a persistent global website view counter.

Unlike a browser-based counter using the `localStorage`, the final implementation uses a serverless backend.

The architecture is:

```
Visitor
   │
   ▼
KAI-Nexus Frontend
   │
   ▼
Supabase Edge Function
   │
   ▼
PostgreSQL Function
   │
   ▼
site_stats Table
   │
   ▼
Updated View Count
```

This allows the counter to be shared globally instead of being stored separately in each visitor's browser.

---

# ⚙️ View Counter Architecture

The view counter is implemented using Supabase.

Database Table

The project uses a table called `site_stats` with the following structure:

| Column  | Type     | Description                    | Primary Key |
| ------- | -------- | ------------------------------ | ----------- |
| `id`    | `text`   | Unique site identifier         | ☑️          |
| `views` | `bigint` | Total number of recorded views | 🔳          |

The primary site identifier is `kai-nexus`.

---

# 🗄️Database Function

A PostgreSQL function is used to increment the view count.

Conceptually:

`increment_site_view(site_id)`

The function:

1. Receives the site ID.
2. Finds the corresponding record.
3. Increments the view count.
4. Returns the updated count.

This keeps the counter operation on the backend rather than exposing database update logic directly to the browser.

---

# Supabase Edge Function

The frontend communicates with a Supabase Edge Function named:

`increment-view`

The Edge Function acts as the serverless API layer between the website and the database.

```
Browser
   │
   │ POST request
   ▼
increment-view
   │
   │ RPC call
   ▼
increment_site_view()
   │
   ▼
site_stats
```

The function returns a response containing the updated view count.

Example response:

```JSON
{
  "success": true,
  "views": 1
}
```

---

# 🏗️ Technology Stack

`Frontend:`
- HTML5
- CSS3
- JavaScript
- Responsive Web Design

`Backend:`
- Supabase
- Supabase Edge Functions
- PostgreSQL
- PostgreSQL RPC functions

`Deployment:`
- GitHub
- GitHub Pages

`Development Tools:`
- Visual Studio Code
- Git
- GitHub
- Supabase Dashboard
- Browser Developer Tools

---

# 📁 Project Structure

The project follows a lightweight static-web architecture.

```
KAI-Nexus/
│
├── index.html       ➡ Structure
├── style.css        ➡ Design
├── app.js           ➡ Application Logic
├── README.md        ➡ Project documentation
│
├── data/
│   └── platforms.js ➡ Platform Data
│
└── assets/
    └── *.svg        ➡ Images amd Icons
```

## `index.html`

Contains the main structure of the KAI-Nexus website.

It defines:

- Header
- Hero section
- Digital network
- Platform sections
- Footer
- View counter element

## `style.css`

Contains the visual design and layout of the application.

It controls:

- Typography
- Colors
- Spacing
- Animations
- Digital-network appearance
- Cards
- Platform nodes
- Responsive behavior
- Buttons
- Visual effects

## `app.js`

Contains the client-side application logic.

Responsibilities include:

- Initializing the application
- Handling platform interactions
- Updating dynamic UI elements
- Calling the Supabase Edge Function
- Fetching the global view count
- Displaying the returned count
- Handling frontend events

## `assets/`

Contains static resources used by the website, such as:

- Logos
- Icons

## `platforms.js`

Contains the configuration and information for the digital platforms connected to KAI-Nexus.

Instead of hard-coding every platform's information directly inside `app.js`, `platforms.js` keeps the platform-specific data organized separately.

The file can contain information such as:

- Platform name
- Platform category
- Platform description
- Platform URL
- Platform icon
- Platform-related labels or tags

---

# 🔐 Security Considerations

KAI-Nexus uses a serverless architecture so that the website does not require a traditional dedicated server.

The frontend communicates with the Supabase Edge Function rather than directly performing privileged database operations.

The database update operation is handled through the server-side function.

**Important**

Only public client-side configuration should ever be included in frontend code.

Never expose:

```
service_role key
database password
private API credentials
server secrets
```

in:

```
index.html
app.js
GitHub repository
```

The Supabase project should be configured so that sensitive server-side credentials remain inside the Supabase environment.

---

# ☁️ Serverless Architecture

KAI-Nexus does not require a continuously running backend server.

Instead, the backend functionality is handled through Supabase Edge Functions.

**Traditional Architecture**

```
Browser
   │
   ▼
Dedicated Backend Server
   │
   ▼
Database
```

**KAI-Nexus Architecture**

```
Browser
   │
   ▼
GitHub Pages
   │
   ▼
Supabase Edge Function
   │
   ▼
PostgreSQL
```

This makes the project lightweight and suitable for a static hosting environment such as GitHub Pages.

---

# 🔄 Application Flow

When a visitor opens KAI-Nexus:

```
1. Website loads
        ↓
2. Frontend initializes
        ↓
3. View counter request is sent
        ↓
4. Supabase Edge Function receives request
        ↓
5. PostgreSQL function increments counter
        ↓
6. Updated count is returned
        ↓
7. Frontend displays the count
        ↓
8. Visitor can interact with platform nodes
```

---

# 📊 View Counter Flow

```
                ┌──────────────────────┐
                │      Visitor         │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │    KAI-Nexus UI      │
                └──────────┬───────────┘
                           │
                    HTTP POST Request
                           │
                           ▼
                ┌──────────────────────┐
                │ Supabase Edge        │
                │ Function             │
                │ increment-view       │
                └──────────┬───────────┘
                           │
                       RPC Call
                           │
                           ▼
                ┌──────────────────────┐
                │ PostgreSQL Function  │
                │ increment_site_view  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │    site_stats        │
                │                      │
                │ kai-nexus | views    │
                └──────────┬───────────┘
                           │
                      Updated Count
                           │
                           ▼
                ┌──────────────────────┐
                │     KAI-Nexus UI     │
                │       👁 8           │
                └──────────────────────┘
```

---

🧪 Testing

The application should be tested for:

**UI**
- ☑️Website loads correctly
- ☑️Hero section renders correctly
- ☑️Digital network renders correctly
- ☑️Platform cards are visible
- ☑️Footer renders correctly

**Navigation**
- ☑️GitHub link works
- ☑️LinkedIn link works
- ☑️Kaggle link works
- ☑️HackerRank link works
- ☑️Unstop link works
- ☑️LeetCode link works

**Backend**
- ☑️Supabase project created
- ☑️`site_stats` table created
- ☑️Initial site record created
- ☑️PostgreSQL increment function created
- ☑️Supabase Edge Function deployed
- ☑️Edge Function tested
- ☑️View count returned successfully

**Deployment**
- ☑️GitHub repository created
- ☑️Source code pushed
- ☑️GitHub Pages enabled
- ☑️Public website accessible
- ☑️Global view counter working after deployment

---

# 📈 Project Architecture

The overall architecture can be summarized as:

```
                    KAI-Nexus
                        │
              ┌─────────┴─────────┐
              │                   │
          Frontend             Backend
              │                   │
        GitHub Pages        Supabase
              │                   │
          HTML/CSS/JS       Edge Function
                                  │
                                  ▼
                            PostgreSQL
                                  │
                                  ▼
                             site_stats
```

---

# 🌍 Deployment Model

KAI-Nexus uses two separate infrastructure layers.

## **Frontend Hosting**

```
GitHub Pages
```

Responsible for:

- HTML
- CSS
- JavaScript
- Static assets

## **Backend Services**

```
Supabase
```

Responsible for:

- Edge Function
- Database
- View counter logic

This separation allows the frontend to remain completely static while still supporting dynamic server-side functionality.

---

# 👨‍💻 Author
Kamalesh Suresh Kumar

Computer Science & Engineering

> KAI-Nexus is designed as a centralized representation of the author's digital and professional presence.

---