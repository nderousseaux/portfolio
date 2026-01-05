# Architecture

```
src/
├── app/          # Next.js App Router pages, layouts, and page-specific components
├── components/   # Reusable UI components (generic, no business logic)
├── hooks/        # Custom React hooks
├── services/     # Technical services (data loading, API calls)
├── types/        # Shared TypeScript types
├── data/         # YAML data files
├── utils/        # Utility functions and components
└── globals.css   # Global styles and Tailwind configuration
```

## `features/` vs `services/`

**features/** = business logic (auth, user, billing)
- Contains business concepts
- Ex: `auth/login.ts`, `user/user.schema.ts`

**services/** = technical layer (api, db, config)
- No business knowledge, reusable
- Ex: `api.service.ts`, `db.service.ts`

**Example**:
- `services/api.service.ts` → generic HTTP client
- `features/auth/login.ts` → calls `services/api` with auth logic

## Imports

```ts
import { Button } from "@/components/Button"
import { login } from "@/features/auth/auth.service"
import { apiClient } from "@/services/api.service"
```
