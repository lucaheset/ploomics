📂 PLOOMICS

📖 Table of Contents

Introduction

Configuration and Utilities

Development and Design

Features

📘 Introduction 

This document provides an overview and documentation for the application developed to interact with the Marvel API, focusing on presenting comics, characters, and creators. The graphical interface was developed to deliver an intuitive and engaging user experience using React and TypeScript.

⚙️ Configuration and Utilities 

Main Components

App.tsx: The root component of the application, setting up routing and the global structure.

main.tsx: The application's entry point, responsible for rendering the App.

Utilities and Configurations

SetAPI.tsx: Configuration for connecting to the external Marvel API.

types.ts: TypeScript type definitions to standardize handled data.

useAuth.ts and useLoading.ts: Custom hooks for authentication and loading state management.

🎨 Development and Design 

The application uses React and TypeScript with a design approach that prioritizes usability and visual aesthetics. The use of styled-components enables the creation of styled components that contribute to a cohesive and attractive interface.

Styling

Files such as ApiInputButtonStyles.ts, FilterStyle.ts, HeaderStyle.ts, among others, define specific styles for key application components, ensuring a consistent visual experience.

🚀 Features 

The application offers several features designed to enhance the user experience while exploring Marvel content:

Authentication Screen: Allows users to manually add authentication keys (public and private) for API usage. Keys are persisted in browser cookies.

Listing Screens: Includes three listing screens for characters, comics, and creators, all featuring infinite scrolling or pagination.

Navigation and Filtering: Easily navigate the lists of characters, comics, and creators with filters to refine searches.

Item Detail Screen: Click on listed items to view detailed information about them.

Filters by Options and Release Date: Detailed filters in listings, such as filtering by creator, character, and release date.

Linked Entities: Displays related items at the end of each entity, allowing users to view descriptions by clicking on them.

Favorites Screen: Favorite items and view them in a dedicated screen, with the option to organize them into custom categories.

Details and Favorites: View specific details about each item and add comics to favorites for quick access.

Authentication and Security: Robust authentication system for a secure and personalized experience.

✨ Author

Developed by Luca Heset 🚀

