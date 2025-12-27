# Architecture

```
src/
  app/         → routing uniquement
  components/  → UI générique (zéro métier)
  features/    → logique métier par domaine
  services/    → services techniques réutilisables
  styles/      → styles globaux
  types/       → types partagés
```

## `features/` vs `services/`

**features/** = métier (auth, user, billing)
- Connaît les concepts business
- Ex : `auth/login.ts`, `user/user.schema.ts`

**services/** = technique (api, db, config)
- Aucune notion métier, réutilisable
- Ex : `api.service.ts`, `db.service.ts`

**Exemple** :
- `services/api.service.ts` → client HTTP générique
- `features/auth/login.ts` → appelle `services/api` avec logique auth

## Imports

```ts
import { Button } from "@/components/Button"
import { login } from "@/features/auth/auth.service"
import { apiClient } from "@/services/api.service"
```
