# INVENTORY MANAGEMENT SYSTEM

Codebase for the client-side of the inventory management system...

## Dependencies

To install the project dependencies:

```bash
npm install
```

## Setting up the database

There are several commands that can be used to set up the database, depending on which stage of the setup process you
are on:

### No database file exists

This command is used to set up the database for the first time.
It will perform the following at once:

- Creating the database file
- Pushing the drizzle ORM schema to the database (creating the tables based on the schema)
- Generating migrations for the schema

```bash
npm run db_init
```

### Database file exists but is empty

The following command can be used to push the drizzle ORM schema to the database.

```bash
npm run db_push
```

### Database with tables exists, but no migrations exist.

The following command can be used to generate migrations for the schema.

```bash
npm run db_generate
```

### Databse with tables exists, migrations exist, but the schema has changed.

The following command can be used to update the database to map to the latest schema.

```bash
npm run db_migrate
```

### I want a fresh start...

This will delete the database file.

```bash
npm run db_delete
```

### Maybe the migrations should go as well?

> ⚠️ ## **Proceed with caution!**
>
> [RIDE THE LIGHTNING!](https://en.wikipedia.org/wiki/Ride_the_Lightning)
>
> Deleting database migrations can lead to serious issues including:
> - Broken production environments
> - Loss of schema history
> - Inconsistencies between dev and prod DBs
>
> Only delete migrations if you're fully resetting the database schema in a controlled environment (like local dev).
> 
> Migrations are a form of version control for the database, ensure a backup exists before yeeting anything.

```bash
npm run db_nuke
```

## Running the development environment

To run the development environment:

```bash
npm run dev
```

---
## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or
  `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` &
  `plugin:react/jsx-runtime` to the `extends` list
