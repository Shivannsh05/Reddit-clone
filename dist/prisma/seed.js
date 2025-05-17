"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            email: 'john@example.com',
            password: await bcryptjs_1.default.hash('password123', 10),
            name: 'John Doe',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: 'jane@example.com',
            password: await bcryptjs_1.default.hash('password123', 10),
            name: 'Jane Smith',
        },
    });
    // Create communities
    const community1 = await prisma.community.create({
        data: {
            name: 'Tech Community',
            description: 'A community for tech enthusiasts',
        },
    });
    const community2 = await prisma.community.create({
        data: {
            name: 'Music Lovers',
            description: 'A community for people who love music',
        },
    });
    // Create posts
    const post1 = await prisma.post.create({
        data: {
            title: 'Welcome to the Tech Community!',
            content: 'We are excited to have you here! Share your tech knowledge.',
            communityId: community1.id,
            userId: user1.id,
        },
    });
    const post2 = await prisma.post.create({
        data: {
            title: 'Top 10 Music Genres to Explore',
            content: 'Here are the top 10 music genres you should explore in 2025.',
            communityId: community2.id,
            userId: user2.id,
        },
    });
    // Create comments
    const comment1 = await prisma.comment.create({
        data: {
            content: 'This is a great post! I love tech!',
            postId: post1.id,
            userId: user2.id,
        },
    });
    const comment2 = await prisma.comment.create({
        data: {
            content: 'I totally agree, music is life!',
            postId: post2.id,
            userId: user1.id,
        },
    });
    // Create votes
    const vote1 = await prisma.vote.create({
        data: {
            voteType: 'UPVOTE',
            postId: post1.id,
            userId: user2.id,
        },
    });
    const vote2 = await prisma.vote.create({
        data: {
            voteType: 'DOWNVOTE',
            postId: post2.id,
            userId: user1.id,
        },
    });
    console.log('Seed data inserted successfully.');
}
main()
    .catch(e => {
    console.error(e);
})
    .finally(async () => {
    await prisma.$disconnect();
});
