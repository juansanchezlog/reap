# Forms App - Dynamic Form Builder

A Next.js application for creating and managing dynamic forms with sections and fields.

## Features

- **Authentication System** - Secure login/logout functionality
- **Dynamic Form Builder** - Create forms with multiple sections and fields
- **Form Management** - View and manage all created forms
- **Public Form Access** - Share forms via public URLs
- **Responsive Design** - Works on desktop and mobile devices
- **Comprehensive Testing** - End-to-end tests with Playwright

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

Use the following credentials to log in:

- **Username:** `admin`
- **Password:** `admiin`

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing
- `npm run test:e2e` - Run all Playwright tests
- `npm run test:e2e:ui` - Run tests with Playwright UI
- `npm run test:e2e:debug` - Run tests in debug mode

## Test Coverage

The application includes comprehensive end-to-end tests covering:

### Authentication Tests (`tests/auth.spec.ts`)
- ✅ Login with valid credentials (`admin/admiin`)
- ✅ Logout functionality
- ✅ Invalid credentials handling
- ✅ Authenticated user redirects
- ✅ Protected route access control

### Form Creation Tests (`tests/form-creation.spec.ts`)
- ✅ Complete form creation workflow
- ✅ Adding sections and fields
- ✅ Field validation and types
- ✅ Success message verification
- ✅ Navigation flow

### Forms List Tests (`tests/forms-list.spec.ts`)
- ✅ Forms list display
- ✅ Form information rendering
- ✅ Navigation to form creation
- ✅ Empty state handling

## API Routes

- `POST /api/auth/login` - User authentication
- `GET /api/forms` - Retrieve all forms
- `POST /api/forms` - Create new form
- `GET /api/forms/public/[token]` - Get public form
- `POST /api/forms/public/[token]/submit` - Submit form response

## Technologies Used

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS + Styled Components
- **Authentication:** Context-based auth with localStorage
- **Testing:** Playwright for E2E testing
- **TypeScript:** Full type safety
- **State Management:** React Context

## Running Tests

1. Start the development server:
```bash
npm run dev
```

2. In another terminal, run tests:
```bash
npm run test:e2e
```
