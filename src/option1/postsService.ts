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



export interface PostsServiceInterface {
    getAllPosts(): Post[];
    getPostById(id: number): Post | undefined;
    createPost(title: string, content: string): Post;
    updatePost(id: number, updatedPost: Partial<Post>): Post | null;
    deletePost(id: number): boolean;
}


export class PostsService implements PostsServiceInterface {
    private posts: Post[] = data;

    getAllPosts(): Post[] {
        return this.posts;
    }

    getPostById(id: number): Post | undefined {
        return this.posts.find((post) => post.id === id);
    }

    createPost(title: string, content: string): Post {
        const id = this.posts.length + 1;
        const newPost = { id, title, content };
        this.posts.push(newPost);
        return newPost;
    }

    updatePost(id: number, updatedPost: Partial<Post>): Post | null {
        const index = this.posts.findIndex((post) => post.id === id);
        if (index === -1) return null;

        this.posts[index] = { ...this.posts[index], ...updatedPost };
        return this.posts[index];
    }

    deletePost(id: number): boolean {
        const index = this.posts.findIndex((post) => post.id === id);
        if (index === -1) return false;

        this.posts.splice(index, 1);
        return true;
    }
}

export const postsService = new PostsService();
