import React from "react";

export default function PostGrid({ posts, onPostClick }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square relative cursor-pointer"
          onClick={() => onPostClick(post)}
        >
          <img
            src={post.image}
            alt={`Post ${post.id}`}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
