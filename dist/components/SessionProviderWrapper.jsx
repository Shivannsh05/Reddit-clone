"use strict";
// components/SessionProviderWrapper.tsx
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SessionProviderWrapper;
const react_1 = require("next-auth/react");
function SessionProviderWrapper({ children }) {
    return <react_1.SessionProvider>{children}</react_1.SessionProvider>;
}
