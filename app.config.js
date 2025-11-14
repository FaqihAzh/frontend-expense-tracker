import { API_BASE_URL } from "./constants/api";

export default {
  "expo": {
    "name": "Expense Tracker App",
    "slug": "expense-tracker",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "https://res.cloudinary.com/dxrz0cg5z/image/upload/v1753947266/expense-tracker/sign-up_wumhql.png",
    "scheme": "frontendmobilewallet",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "https://res.cloudinary.com/dxrz0cg5z/image/upload/v1753949152/expense-tracker/sign-up_white_yktehn.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.anonymous.frontendmobilewallet"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "https://res.cloudinary.com/dxrz0cg5z/image/upload/v1753947266/expense-tracker/sign-up_wumhql.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "https://res.cloudinary.com/dxrz0cg5z/image/upload/v1753949152/expense-tracker/sign-up_white_yktehn.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "jsEngine": "hermes",
    "extra": {
      "router": {},
      "eas": {
        "projectId": "a64aa3b4-d315-49c0-8a43-ae2d3cb34cb4"
      },
      "clerkPublishableKey": process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YXNzdXJlZC10aWdlci0zMC5jbGVyay5hY2NvdW50cy5kZXYk",
      "apiBaseUrl": process.env.EXPO_PUBLIC_API_BASE_URL || API_BASE_URL || "https://be-expense-tracker-ten.vercel.app/api/v1"
    },
    "owner": "faqihazh"
  }
};