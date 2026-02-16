---
name: auto_commit
description: Automatically stage, commit, and push changes with a generated message based on the work done.
---

# Auto Commit Changes

This skill allows you to automatically commit and push changes to the repository with a descriptive, semantic commit message based on the recent modifications.

## Procedure

1.  **Check Status**:
    - Run `git status` to see which files have been modified.
    - If there are no changes, inform the user and stop.

2.  **Stage Changes**:
    - Run `git add .` to stage all changes (unless specific files are requested).

3.  **Analyze Changes**:
    - Run `git diff --cached` to see the actual content of the changes.
    - Review the recent conversation history and task list to understand the *intent* behind these changes (e.g., "Fixing bug in login", "Refactoring sidebar").

4.  **Generate Commit Message**:
    - Create a commit message following the [Conventional Commits](https://www.conventionalcommits.org/) specification:
        - Format: `<type>(<scope>): <description>`
        - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
        - Scope: The component or feature area (e.g., `navbar`, `profile`, `api`).
        - Description: A concise summary of the change (imperative mood, no capitalization at start, no period at end).
    - *Example*: `feat(dashboard): add cleaner tab styling and mock data`

5.  **Commit and Push**:
    - Run `git commit -m "YOUR_GENERATED_MESSAGE"`.
    - Run `git push`.

6.  **Report**:
    - Inform the user that changes have been committed and pushed with the specific message used.
