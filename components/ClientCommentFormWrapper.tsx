// components/ClientCommentFormWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const CommentForm = dynamic(() => import('./CommentForm'), { ssr: false });

export default CommentForm;
