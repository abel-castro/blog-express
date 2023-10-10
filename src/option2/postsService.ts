import { Post } from "../models";

let data = [
    {
        id: 1,
        title: 'Lorem Ipsum 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        id: 2,
        title: 'Lorem Ipsum 2',
        content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
];

export function getAllPosts(): Post[] {
    return data;
}

export function getPostById(id: number): Post | undefined {
    return data.find((post) => post.id === id);
}

export function createPost(title: string, content: string): Post {
    const id = data.length + 1;
    const newPost = { id, title, content };
    data.push(newPost);
    return newPost;
}

export function updatePost(id: number, updatedPost: Partial<Post>): Post | null {
    const index = data.findIndex((post) => post.id === id);
    if (index === -1) return null;

    data[index] = { ...data[index], ...updatedPost };
    return data[index];
}

export function deletePost(id: number): boolean {
    const index = data.findIndex((post) => post.id === id);
    if (index === -1) return false;

    data.splice(index, 1);
    return true;
}