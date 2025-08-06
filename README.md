# Task Manager

A simple and efficient task management app built with React Native and Expo.

## Features

- ✅ **Task Management**: Create, edit, and delete tasks with full CRUD operations
- 🎯 **Priority Levels**: Set high, medium, or low priority with color-coded indicators
- 📅 **Due Dates**: Add optional due dates with custom date picker interface
- 📊 **Task Filtering**: Filter tasks by status (All, Active, Completed)
- 💾 **Persistent Storage**: Tasks are saved locally using AsyncStorage
- 📈 **Analytics**: View task statistics, completion rates, and priority breakdown
- 🎨 **Modern UI**: Clean, responsive interface with SafeArea support
- 🔄 **Cross-Platform**: Works seamlessly on iOS, Android, and Web
- ⚡ **Real-time Updates**: Instant task updates and status changes
- 🎛️ **Custom Components**: Custom date picker and form controls

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npm start
   ```

2. Run on your preferred platform:
   - **iOS**: Press `i` in the terminal or scan the QR code with Expo Go
   - **Android**: Press `a` in the terminal or scan the QR code with Expo Go
   - **Web**: Press `w` in the terminal

## Usage

### Adding Tasks
- Tap the "+" button in the top right corner
- Enter task title (required)
- Add optional description
- Set priority level (Low, Medium, High)
- Set optional due date
- Tap "Add Task" to save

### Managing Tasks
- **Complete a task**: Tap the circle next to the task title
- **Edit a task**: Tap the edit icon (pencil) on the task
- **Delete a task**: Tap the trash icon on the task
- **Filter tasks**: Use the filter buttons (All, Active, Completed)

### Analytics
- View task statistics on the Analytics tab
- See completion rates and priority breakdown
- Clear completed tasks in bulk

## Project Structure

```
TaskManager/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Main task list screen
│   │   ├── explore.tsx        # Analytics screen
│   │   └── _layout.tsx        # Tab navigation
│   └── _layout.tsx            # Root layout with providers
├── components/
│   ├── TaskItem.tsx           # Individual task component
│   ├── TaskForm.tsx           # Add/edit task form
│   ├── DatePickerModal.tsx    # Cross-platform date picker
│   └── SimpleDatePicker.tsx   # Custom date picker interface
├── context/
│   └── TaskContext.tsx        # Task state management with AsyncStorage
└── ...
```

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **AsyncStorage**: Local data persistence
- **React Context**: State management
- **Expo Vector Icons**: Icon library

## Screenshots

### Main Task List
- Clean task interface with priority indicators
- Filter buttons for different task states
- Quick actions for editing and deleting tasks

### Analytics Dashboard
- Task statistics and completion rates
- Priority breakdown visualization
- Bulk actions for task management

### Add/Edit Task Form
- Intuitive form with validation
- Custom date picker interface
- Priority selection with visual feedback

## Known Issues & Solutions

### Date Picker Display
If you experience issues with the date picker:
- The app includes a custom SimpleDatePicker as a fallback
- Works consistently across all platforms
- Provides clear visual feedback for date selection

### Performance Tips
- Tasks are stored locally for instant access
- App uses React Context for efficient state management
- Optimized rendering for large task lists

## Development

### Development Commands
```bash
# Start development server
npm start

# Run on specific platforms
npm run android    # Android emulator
npm run ios        # iOS simulator (Mac only)  
npm run web        # Web browser

# Linting and code quality
npm run lint       # Check code style
```

### Adding New Features
1. Create components in the `components/` directory
2. Add new screens in the `app/(tabs)/` directory
3. Update the TaskContext for state management
4. Test across all platforms

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
