"use strict";
// components/AuthButtons.tsx
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthButtons;
const react_1 = require("next-auth/react");
function AuthButtons() {
    const { data: session, status } = (0, react_1.useSession)();
    // Handle loading state
    if (status === 'loading') {
        return <p>Loading...</p>;
    }
    if (session) {
        return (<div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => (0, react_1.signOut)()}>Sign out</button>
      </div>);
    }
    return <button onClick={() => (0, react_1.signIn)()}>Sign in</button>;
}
