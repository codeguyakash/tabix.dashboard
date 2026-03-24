# Tabix Dashboard

## GitHub Login Configuration

To set up GitHub OAuth for this project, you need to configure your GitHub OAuth App with the correct URLs to avoid the `redirect_uri is not associated with this application` error.

### 1. Go to GitHub Settings

Navigate to **Settings** -> **Developer Settings** -> **OAuth Apps** -> Select your app (or create a new one).

### 2. Configure URLs

Depending on where you are running the app (Local, Custom Local Domain, or Production), use the corresponding URLs below:

**Local Environment (localhost):**

- **Homepage URL:** `http://localhost:3000`
- **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`

**Custom Local Domain (e.g., local.codeguyakash.in):**

- **Homepage URL:** `https://tbx.codeguyakash.in`
- **Authorization callback URL:** `https://tbx.codeguyakash.in/api/auth/callback/github`

**Production Environment:**

- **Homepage URL:** `https://tbx.codeguyakash.in`
- **Authorization callback URL:** `https://tbx.codeguyakash.in/api/auth/callback/github`

### 3. Save Changes

Click on **Update application** to save the changes. Make sure the OAuth Client ID and Secret are also successfully added to your `.env.local` file.
