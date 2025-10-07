# Smart Lunch Frontend

A Vue.js application for managing lunch contributions and voting in office environments.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_URL=your-backend-api-url
```

3. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test:unit` - Run unit tests
- `npm run test:e2e` - Run e2e tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code

## Lunch Flow

1. **Contribution Phase** (11:00 AM - 12:00 PM): Join lunch and make payments
2. **Voting Phase** (12:00 PM - 12:30 PM): Vote for dishes
3. **Results Phase** (After 12:30 PM): View voting results

## User Roles

- **Admin**: Full system access
- **Employee**: Can contribute and vote
- **Collector**: Lunch collection management
