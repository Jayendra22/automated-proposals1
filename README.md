# Automata Proposal Generation System

A full-stack web application to streamline the creation, management, and storage of academic and research proposals centered on automata theory.

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Lucide Icons
- **Backend:** Spring Boot (Java 17), Spring Data JPA, Hibernate
- **Database:** MySQL
- **Communication:** RESTful API with Axios

## Prerequisites

- **Java 17+**
- **Maven 3.x**
- **Node.js 18+** & npm
- **MySQL Server** running on localhost:3306

## Getting Started

### 1. Database Setup
Create a MySQL database named `proposal_db`:
```sql
CREATE DATABASE proposal_db;
```
*Note: The application is configured to use `root` user with no password. You can update this in `backend/src/main/resources/application.properties`.*

### 2. Run Backend
```bash
cd backend
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`.

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`.

## Features
- **Full CRUD:** Create, Read, Update, and Delete research proposals.
- **Workflow Management:** Track proposals through states: Draft, Submitted, Approved, Rejected.
- **Automata Focused:** Tag proposals with relevant concepts (DFA, NFA, PDA, Turing Machines, CFG, RegEx).
- **Responsive UI:** Modern design with Tailwind CSS and interactive components.
- **Real-time Validation:** Client-side form handling and feedback.
