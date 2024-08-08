Hijrah
Hijrah is a powerful and flexible tool designed to manage your FiveM database with ease, focusing on database migrations. Inspired by tools like SQLAlchemy, Ecto, and Active Record, Hijrah is framework-agnostic, allowing you to integrate it into any environment or application effortlessly.

Problem Statement
Managing databases, particularly in a dynamic environment like FiveM, can be a challenging task. Whether you’re scaling up your server, updating schemas, or handling multiple migrations, traditional methods often fall short. The lack of a streamlined process for migrating databases in a consistent and reliable way can lead to issues such as:

Inconsistent database states across different environments.
Manual errors during schema updates.
Difficulty in tracking and reverting changes.
Lack of integration with various frameworks, making it hard to adopt existing solutions.
Introducing Hijrah
Hijrah addresses these challenges by providing a robust and framework-agnostic solution for managing FiveM databases. With a focus on ease of use, consistency, and flexibility, Hijrah simplifies the process of database migration, allowing developers to:

Manage Migrations: Track, apply, and revert migrations with a simple command-line interface.
Framework Agnostic: Integrate seamlessly with any FiveM setup, regardless of the framework or structure.
History Tracking: Maintain a clear history of all migrations, making it easy to review changes and ensure consistency across different environments.
Flexibility: Designed to fit into your workflow without imposing any rigid structure, giving you the freedom to manage your database the way you want.
Features
Easy Migration Management: Create, apply, and rollback migrations with straightforward commands.
Comprehensive History Tracking: Keep a detailed log of all changes, ensuring you always know the state of your database.
Framework Agnostic: No dependencies on specific frameworks or environments.
Optimized for FiveM: Specifically tailored to address the unique needs of FiveM servers.
Getting Started
Installation
To install Hijrah, run the following command:

bash
Copy code
npm install hijrah
Basic Usage
After installation, you can start using Hijrah to manage your database migrations. Below are some basic commands to get you started:

bash
Copy code
# Create a new migration
> hijrah create migration_name

# Apply pending migrations
> hijrah migrate

# Rollback the last migration
> hijrah rollback


Contributing
We welcome contributions from the community. If you have an idea or a bug to report, please open an issue or submit a pull request.

License
Hijrah is released under the MIT License. See [LICENSE](./LICENSE.md) for more details.